import { format } from 'date-fns';

function PaymentTable({ payments }) {
  if (payments.length === 0) {
    return <div className="no-data">No payments found</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{format(new Date(payment.created_at), 'MMM d, yyyy')}</td>
              <td>{payment.recipient_name}</td>
              <td className="amount">${payment.amount.toFixed(2)}</td>
              <td>
                <span className={`method-badge ${payment.method_used}`}>
                  {payment.method_used === 'US_ACH' ? 'ACH' : 'USDC'}
                </span>
              </td>
              <td>
                <span className={`status-badge ${payment.status.toLowerCase()}`}>
                  {payment.status}
                </span>
              </td>
              <td className="amount">${payment.fee.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;
