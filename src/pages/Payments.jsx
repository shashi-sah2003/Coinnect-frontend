import { useState, useEffect } from 'react';
import { FiPlus, FiFilter, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PaymentTable from '../components/PaymentTable';
import PaymentForm from '../components/PaymentForm';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  useEffect(() => {
    fetchPayments();
  }, []);
  
  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockPayments = [
        {
          id: '1',
          created_at: new Date().toISOString(),
          recipient_name: 'TechCorp LLC',
          amount: 5000.00,
          method_used: 'US_ACH',
          status: 'COMPLETED',
          fee: 150.00
        },
        {
          id: '2',
          created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          recipient_name: 'Global Services Inc',
          amount: 2500.00,
          method_used: 'USDC',
          status: 'COMPLETED',
          fee: 2.50
        },
        {
          id: '3',
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          recipient_name: 'Acme Corp',
          amount: 10000.00,
          method_used: 'USDC',
          status: 'COMPLETED',
          fee: 10.00
        },
        {
          id: '4',
          created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          recipient_name: 'Supplier Solutions Ltd',
          amount: 7500.00,
          method_used: 'US_ACH',
          status: 'PENDING',
          fee: 225.00
        },
        {
          id: '5',
          created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          recipient_name: 'Dev Contractors',
          amount: 3200.00,
          method_used: 'USDC',
          status: 'COMPLETED',
          fee: 3.20
        }
      ];
      
      setPayments(mockPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddPayment = () => {
    setShowForm(true);
  };
  
  const handlePaymentSent = (newPayment) => {
    setShowForm(false);
    // In a real app, we would add the new payment to our list
    // For demo, just refresh the payments
    fetchPayments();
  };
  
  const handleCancelPayment = () => {
    setShowForm(false);
  };
  
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  
  const exportCSV = () => {
    // In a real app, generate and download CSV
    toast.info('Exporting payments as CSV...');
    setTimeout(() => toast.success('Payments exported successfully!'), 1000);
  };
  
  // Filter payments based on status
  const filteredPayments = filterStatus === 'all'
    ? payments
    : payments.filter(payment => payment.status.toLowerCase() === filterStatus.toLowerCase());
  
  return (
    <div className="payments-container">
      <div className="page-header">
        <h1>Payments</h1>
        <div className="header-actions">
          <div className="filter-container">
            <FiFilter size={18} />
            <select onChange={handleFilterChange} value={filterStatus}>
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <button className="action-button export" onClick={exportCSV}>
            <FiDownload size={18} />
            <span>Export</span>
          </button>
          <button className="action-button primary" onClick={handleAddPayment}>
            <FiPlus size={18} />
            <span>New Payment</span>
          </button>
        </div>
      </div>
      
      {showForm ? (
        <PaymentForm
          onPaymentSent={handlePaymentSent}
          onCancel={handleCancelPayment}
        />
      ) : (
        <>
          {isLoading ? (
            <div className="loading">Loading payments...</div>
          ) : (
            <>
              <div className="payments-summary">
                <div className="summary-card">
                  <h3>Total Volume</h3>
                  <p className="amount">$28,200.00</p>
                </div>
                <div className="summary-card">
                  <h3>USDC Payments</h3>
                  <p className="amount">$15,700.00</p>
                </div>
                <div className="summary-card">
                  <h3>ACH Payments</h3>
                  <p className="amount">$12,500.00</p>
                </div>
                <div className="summary-card highlight">
                  <h3>Fee Savings</h3>
                  <p className="amount">$455.30</p>
                </div>
              </div>
            
              <PaymentTable payments={filteredPayments} />
              
              <div className="fee-comparison">
                <h3>Fee Comparison</h3>
                <p>Traditional ACH fees: <strong>$375.00</strong> (3% average)</p>
                <p>USDC payment fees: <strong>$15.70</strong> (0.1%)</p>
                <p className="savings">Total savings: <strong>$359.30</strong></p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Payments;