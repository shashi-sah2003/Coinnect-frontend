import { useState } from 'react';
import { toast } from 'react-toastify';
import logo from '../assets/logo.svg';
import '../styles/Login.css';

function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate authentication
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication
      if (formData.email && formData.password) {
        // Store token in localStorage
        localStorage.setItem('token', 'demo-token-12345');
        setIsAuthenticated(true);
        toast.success('Login successful!');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Coinnect Logo" className="login-logo" />
          <h1>Coinnect</h1>
          <p>The smart way to manage cross-border payments</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Demo credentials:</p>
          <p>Email: demo@coinnect.io</p>
          <p>Password: any password will work</p>
        </div>
      </div>
    </div>
  );
}

export default Login;