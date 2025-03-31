import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PayeeTable from '../components/PayeeTable';
import PayeeForm from '../components/PayeeForm';
import PaymentForm from '../components/PaymentForm';

function PayeeManagement() {
  const [payees, setPayees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPayeeForm, setShowPayeeForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchPayees();
  }, []);
  
  const fetchPayees = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockPayees = [
        {
          id: '1',
          name: 'TechCorp LLC',
          contact_details: {
            email: 'accounts@techcorp.com',
            phone: '+1 (123) 456-7890',
            address: '123 Tech St, San Francisco, CA'
          },
          payment_methods: [
            {
              type: 'US_ACH',
              is_default: true,
              details: {
                account_number: '****4567',
                routing_number: '****8901',
                account_type: 'checking'
              }
            }
          ]
        },
        {
          id: '2',
          name: 'Global Services Inc',
          contact_details: {
            email: 'payments@globalservices.com',
            phone: '+44 20 1234 5678',
            address: '45 Global Ave, London, UK'
          },
          payment_methods: [
            {
              type: 'US_ACH',
              is_default: false,
              details: {
                account_number: '****2345',
                routing_number: '****6789',
                account_type: 'savings'
              }
            },
            {
              type: 'USDC',
              is_default: true,
              details: {
                address: '0x1a2...3b4c',
                chain: 'Ethereum'
              }
            }
          ]
        },
        {
          id: '3',
          name: 'Dev Contractors',
          contact_details: {
            email: 'billing@devcontractors.io',
            phone: '+1 (987) 654-3210',
            address: '789 Dev Lane, Austin, TX'
          },
          payment_methods: [
            {
              type: 'USDC',
              is_default: true,
              details: {
                address: '0x5d6...7e8f',
                chain: 'Polygon'
              }
            }
          ]
        }
      ];
      
      setPayees(mockPayees);
    } catch (error) {
      console.error('Error fetching payees:', error);
      toast.error('Failed to load payees');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddPayee = () => {
    setShowPayeeForm(true);
  };
  
  const handleEditPayee = (payee) => {
    toast.info(`Edit functionality for ${payee.name} would open a form with their details`);
    // In a real app, we would populate the form with the payee's data
    // For this demo, we'll just show a toast
  };
  
  const handleDeletePayee = (payee) => {
    // In a real app, this would be an API call
    if (confirm(`Are you sure you want to delete ${payee.name}?`)) {
      toast.success(`${payee.name} has been deleted`);
      setPayees(payees.filter(p => p.id !== payee.id));
    }
  };
  
  const handleSendPayment = (payee) => {
    setSelectedPayee(payee);
    setShowPaymentForm(true);
  };
  
  const handlePayeeAdded = (newPayee) => {
    setShowPayeeForm(false);
    toast.success('Payee added successfully!');
    // In a real app, we would add the new payee to our list or refetch
    fetchPayees();
  };
  
  const handlePaymentSent = (payment) => {
    setShowPaymentForm(false);
    toast.success(`Payment sent to ${selectedPayee.name}!`);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter payees based on search query
  const filteredPayees = payees.filter(payee => 
    payee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payee.contact_details.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="payee-management-container">
      <div className="page-header">
        <h1>Payees</h1>
        <div className="header-actions">
          <div className="search-container">
            <FiSearch size={18} />
            <input
              type="text"
              placeholder="Search payees..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button className="action-button primary" onClick={handleAddPayee}>
            <FiPlus size={18} />
            <span>Add Payee</span>
          </button>
        </div>
      </div>
      
      {showPayeeForm ? (
        <PayeeForm
          onPayeeAdded={handlePayeeAdded}
          onCancel={() => setShowPayeeForm(false)}
        />
      ) : showPaymentForm ? (
        <PaymentForm
          onPaymentSent={handlePaymentSent}
          onCancel={() => setShowPaymentForm(false)}
          payee={selectedPayee}
        />
      ) : (
        <>
          {isLoading ? (
            <div className="loading">Loading payees...</div>
          ) : (
            <>
              <div className="payee-stats">
                <div className="stat-item">
                  <h3>Total Payees</h3>
                  <p>{payees.length}</p>
                </div>
                <div className="stat-item">
                  <h3>USDC Enabled</h3>
                  <p>{payees.filter(p => p.payment_methods.some(m => m.type === 'USDC')).length}</p>
                </div>
                <div className="stat-item">
                  <h3>ACH Only</h3>
                  <p>{payees.filter(p => !p.payment_methods.some(m => m.type === 'USDC')).length}</p>
                </div>
                <div className="stat-item">
                  <h3>Optimization Rate</h3>
                  <p>{Math.round((payees.filter(p => p.payment_methods.some(m => m.type === 'USDC')).length / payees.length) * 100)}%</p>
                </div>
              </div>
              
              <PayeeTable
                payees={filteredPayees}
                onEdit={handleEditPayee}
                onDelete={handleDeletePayee}
                onSendPayment={handleSendPayment}
              />
              
              <div className="optimization-tip">
                <h3>Optimization Tip</h3>
                <p>Encourage your payees to accept USDC payments to reduce transaction fees by up to 97% and enable instant settlements.</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PayeeManagement;