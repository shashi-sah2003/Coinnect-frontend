function DashboardCard({ title, value, icon, color, percentage }) {
    return (
      <div className="dashboard-card">
        <div className="card-icon" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p className="card-value">{value}</p>
          {percentage && (
            <p className={`percentage ${percentage > 0 ? 'positive' : 'negative'}`}>
              {percentage > 0 ? '+' : ''}{percentage}%
            </p>
          )}
        </div>
      </div>
    );
  }
  
  export default DashboardCard;