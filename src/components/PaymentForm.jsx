import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function PaymentForm({ onPaymentSent, onCancel }) {
  const [formData, setFormData] = useState({
    payee_id: '',
    amount: '',
    currency: 'USD',
    recipient_email: ''
  });

  const [payees, setPayees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch payees on component mount
    const fetchPayees = async () => {
      try {
        const serverIp = import.meta.env.VITE_SERVER_IP
        const response = await axios.get(`${serverIp}/payman/search-payees`);
        setPayees(response.data.data || []);
      } catch (error) {
        console.error('Error fetching payees:', error);
        toast.error('Failed to load payees');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Set recipient email based on selected payee
    if (name === 'payee_id') {
      const selectedPayee = payees.find(p => p.id === value);
      if (selectedPayee && selectedPayee.contact_details) {
        setFormData(prev => ({
          ...prev,
          payee_id: value,
          recipient_email: selectedPayee.contact_details.email || ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate amount
    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid amount');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/payman/send-payment', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      
      toast.success('Payment sent successfully!');
      onPaymentSent(response.data);
    } catch (error) {
      console.error('Error sending payment:', error);
      toast.error(error.response?.data?.detail || 'Failed to send payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading payees...</div>;
  }

  return (
    <div className="payment-form-container">
      <h2>Send Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="payee_id">Recipient</label>
          <select
            id="payee_id"
            name="payee_id"
            value={formData.payee_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a payee</option>
            {payees.map((payee) => (
              <option key={payee.id} value={payee.id}>
                {payee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0.01"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
          >
            <option value="USD">USD</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;