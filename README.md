# Coinnect-frontend - Smart Cross-Border Payment Platform

Coinnect is a modern web application that simplifies cross-border payments using AI-agent by allowing businesses to send payments via traditional ACH or USDC cryptocurrency, offering significant fee savings and faster settlement times.

## Features

- **Dashboard**: View payment analytics, fee savings, and transaction history at a glance
- **Payee Management**: Easily add and manage payment recipients with multiple payment methods
- **Payment Processing**: Send payments using either traditional ACH or USDC cryptocurrency
- **Fee Optimization**: Track and visualize fee savings when using USDC compared to ACH

## Tech Stack

- **Frontend**: React 19, React Router, Recharts for data visualization
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks
- **API Communication**: Axios
- **Notifications**: React-Toastify
- **Icons**: React-Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/shashi-sah2003/coinnect-frontend.git
cd coinnect-frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   
Create a `.env` file in the root directory with the following content:
```
VITE_SERVER_IP = 'http://127.0.0.1:3000'
```
Backend-repo Link: `https://github.com/shashi-sah2003/Coinnect-backend`

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`


## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages
- `/src/assets` - Static assets like images
- `/src/styles` - CSS stylesheets

## Authentication

The application uses token-based authentication. For the demo, any email and password combination will work.

## Running Locally

This project is set up to run locally and connect to a backend API. Make sure to:

1. Set up the backend server `https://github.com/shashi-sah2003/Coinnect-backend`
2. Configure the correct server URL in the `.env` file
3. Start the frontend development server

## Backend API

The frontend expects a backend API with the following endpoints:
- `/payman/get-balance/:currency` - Get balance for a specific currency
- `/payman/search-payees` - Get list of payees
- `/payman/create-payee` - Create a new payee
- `/payman/send-payment` - Process a payment
