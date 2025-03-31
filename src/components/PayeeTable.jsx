import { FiEdit, FiTrash2, FiDollarSign } from 'react-icons/fi';

function PayeeTable({ payees, onEdit, onDelete, onSendPayment }) {
  if (payees.length === 0) {
    return <div className="no-data">No payees found</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Payment Methods</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payees.map((payee) => (
            <tr key={payee.id}>
              <td>{payee.name}</td>
              <td>{payee.contact_details?.email}</td>
              <td>
                <div className="payment-methods">
                  {payee.payment_methods?.map((method, index) => (
                    <span key={index} className={`method-badge ${method.type}`}>
                      {method.type === 'US_ACH' ? 'ACH' : 'USDC'}
                      {method.is_default && <small> (Default)</small>}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="icon-button payment" onClick={() => onSendPayment(payee)}>
                    <FiDollarSign size={18} />
                  </button>
                  <button className="icon-button edit" onClick={() => onEdit(payee)}>
                    <FiEdit size={18} />
                  </button>
                  <button className="icon-button delete" onClick={() => onDelete(payee)}>
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayeeTable;