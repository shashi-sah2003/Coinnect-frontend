import { useState, useEffect } from 'react';
import { FiDollarSign, FiUsers, FiTrendingUp, FiClock } from 'react-icons/fi';
import DashboardCard from '../components/DashboardCard';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, Legend } from 'recharts';

function Dashboard() {
  const [balances, setBalances] = useState({
    USD: 0,
    USDC: 0
  });
  
  const [paymentStats, setPaymentStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    savings: 0
  });
  
  const [payeeCount, setPayeeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // Fetch USD balance
        const serverIp = import.meta.env.VITE_SERVER_IP
        const usdResponse = await axios.get(`${serverIp}/payman/get-balance/USD`);
        // Fetch USDC balance
        const usdcResponse = await axios.get(`${serverIp}/payman/get-balance/USDC`);
        // Fetch payees
        const payeesResponse = await axios.get(`${serverIp}/payman/search-payees`);
        
        setBalances({
          USD: usdResponse.data.data?.amount || 0,
          USDC: usdcResponse.data.data?.amount || 0
        });
        
        setPayeeCount(payeesResponse.data.data?.length || 0);
        
        // For demo purposes, we'll use mock data for payment stats
        setPaymentStats({
          total: 14250.75,
          pending: 2350.00,
          completed: 11900.75,
          savings: 427.52
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Mock chart data - in a real app, this would come from an API
  const paymentActivityData = [
    { name: 'Jan', ACH: 4000, USDC: 2400 },
    { name: 'Feb', ACH: 3000, USDC: 2600 },
    { name: 'Mar', ACH: 2000, USDC: 3800 },
    { name: 'Apr', ACH: 2780, USDC: 4908 },
    { name: 'May', ACH: 1890, USDC: 6800 },
    { name: 'Jun', ACH: 2390, USDC: 7800 },
    { name: 'Jul', ACH: 1490, USDC: 9300 },
  ];
  
  const savingsData = [
    { name: 'ACH Fees', value: 1150.25, color: '#FF6B6B' },
    { name: 'USDC Fees', value: 231.80, color: '#58B19F' },
    { name: 'Savings', value: 427.52, color: '#3498DB' },
  ];
  
  if (isLoading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="dashboard-cards">
        <DashboardCard 
          title="Total Balance" 
          value={`$${(balances.USD + balances.USDC).toFixed(2)}`} 
          icon={<FiDollarSign size={24} color="#3498DB" />} 
          color="#3498DB"
          percentage={8.2}
        />
        <DashboardCard 
          title="Total Payees" 
          value={payeeCount} 
          icon={<FiUsers size={24} color="#58B19F" />} 
          color="#58B19F"
          percentage={12.5}
        />
        <DashboardCard 
          title="Total Payments" 
          value={`$${paymentStats.total.toFixed(2)}`} 
          icon={<FiTrendingUp size={24} color="#FF6B6B" />} 
          color="#FF6B6B"
          percentage={5.7}
        />
        <DashboardCard 
          title="Fee Savings" 
          value={`$${paymentStats.savings.toFixed(2)}`} 
          icon={<FiClock size={24} color="#5758BB" />} 
          color="#5758BB"
          percentage={32.1}
        />
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container">
          <h2>Payment Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={paymentActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorACH" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUSDC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#58B19F" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#58B19F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="ACH" stroke="#FF6B6B" fillOpacity={1} fill="url(#colorACH)" />
              <Area type="monotone" dataKey="USDC" stroke="#58B19F" fillOpacity={1} fill="url(#colorUSDC)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h2>Fee Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Amount ($)">
                {savingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Payment Optimization Summary</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total Transactions: </span>
              <span className="stat-value">54</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">USDC Transactions: </span>
              <span className="stat-value">38 (70%)</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">ACH Transactions: </span>
              <span className="stat-value">16 (30%)</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Fee (ACH): </span>
              <span className="stat-value">3.2%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Fee (USDC): </span>
              <span className="stat-value">0.1%</span>
            </div>
            <div className="stat-item highlight">
              <span className="stat-label">Total Fee Savings: </span>
              <span className="stat-value">$427.52</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;