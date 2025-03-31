import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function PayeeForm({ onPayeeAdded, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    contact_details: {
      email: '',
      phone: '',
      address: ''
    },
    payment_methods: [
      {
        type: 'US_ACH',
        is_default: true,
        ach_details: {
          account_holder_name: '',
          account_holder_type: 'individual',
          routing_number: '',
          account_number: '',
          account_type: 'checking'
        },
        crypto_details: null
      }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAchDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      payment_methods: [
        {
          ...formData.payment_methods[0],
          ach_details: {
            ...formData.payment_methods[0].ach_details,
            [name]: value
          }
        }
      ]
    });
  };

  const addCryptoMethod = () => {
    // Check if we already have a crypto method
    const hasCrypto = formData.payment_methods.some(m => m.type === 'CRYPTO_ADDRESS');
    if (hasCrypto) return;

    setFormData({
      ...formData,
      payment_methods: [
        ...formData.payment_methods,
        {
          type: 'CRYPTO_ADDRESS',
          is_default: false,
          ach_details: null,
          crypto_details: {
            address: '',
            chain: 'Ethereum'
          }
        }
      ]
    });
  };

  const handleCryptoDetailsChange = (e) => {
    const { name, value } = e.target;
    const cryptoIndex = formData.payment_methods.findIndex(m => m.type === 'CRYPTO_ADDRESS');
    if (cryptoIndex === -1) return;

    const updatedMethods = [...formData.payment_methods];
    updatedMethods[cryptoIndex] = {
      ...updatedMethods[cryptoIndex],
      crypto_details: {
        ...updatedMethods[cryptoIndex].crypto_details,
        [name]: value
      }
    };

    setFormData({
      ...formData,
      payment_methods: updatedMethods
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const serverIp = import.meta.env.VITE_SERVER_IP
      const response = await axios.post(`${serverIp}/payman/create-payee`, formData);
      toast.success('Payee added successfully!');
      onPayeeAdded(response.data);
    } catch (error) {
      console.error('Error adding payee:', error);
      toast.error(error.response?.data?.detail || 'Failed to add payee');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="payee-form-container">
      <h2>Add New Payee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="contact_details.email"
              value={formData.contact_details.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="contact_details.phone"
              value={formData.contact_details.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="contact_details.address"
              value={formData.contact_details.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>ACH Payment Details</h3>
          <div className="form-group">
            <label htmlFor="account_holder_name">Account Holder Name</label>
            <input
              type="text"
              id="account_holder_name"
              name="account_holder_name"
              value={formData.payment_methods[0].ach_details.account_holder_name}
              onChange={handleAchDetailsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="account_holder_type">Account Holder Type</label>
            <select
              id="account_holder_type"
              name="account_holder_type"
              value={formData.payment_methods[0].ach_details.account_holder_type}
              onChange={handleAchDetailsChange}
              required
            >
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="routing_number">Routing Number</label>
            <input
              type="text"
              id="routing_number"
              name="routing_number"
              value={formData.payment_methods[0].ach_details.routing_number}
              onChange={handleAchDetailsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="account_number">Account Number</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              value={formData.payment_methods[0].ach_details.account_number}
              onChange={handleAchDetailsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="account_type">Account Type</label>
            <select
              id="account_type"
              name="account_type"
              value={formData.payment_methods[0].ach_details.account_type}
              onChange={handleAchDetailsChange}
              required
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>
        </div>

        {formData.payment_methods.some(m => m.type === 'CRYPTO_ADDRESS') ? (
          <div className="form-section">
            <h3>Crypto Payment Details</h3>
            <div className="form-group">
              <label htmlFor="address">Wallet Address</label>
              <input
                type="text"
                id="crypto_address"
                name="address"
                value={formData.payment_methods.find(m => m.type === 'CRYPTO_ADDRESS')?.crypto_details?.address || ''}
                onChange={handleCryptoDetailsChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="chain">Blockchain</label>
              <select
                id="chain"
                name="chain"
                value={formData.payment_methods.find(m => m.type === 'CRYPTO_ADDRESS')?.crypto_details?.chain || 'Ethereum'}
                onChange={handleCryptoDetailsChange}
                required
              >
                <option value="Ethereum">Ethereum</option>
                <option value="Polygon">Polygon</option>
                <option value="Base">Base</option>
                <option value="Arbitrum">Arbitrum</option>
                <option value="Avalanche">Avalanche</option>
                <option value="Optimism">Optimism</option>
                <option value="Solana">Solana</option>
              </select>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="add-crypto-button"
            onClick={addCryptoMethod}
          >
            + Add USDC Payment Method
          </button>
        )}

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Payee'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PayeeForm;