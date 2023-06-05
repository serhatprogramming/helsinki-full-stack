const Notification = ({ notification }) => {
  const notificationStyles = {
    info: {
      background: "#eaf2ff",
      color: "#004085",
      padding: "10px",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "2px solid #004085",
    },
    warning: {
      background: "#fff3cd",
      color: "#856404",
      padding: "10px",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "2px solid #856404",
    },
    error: {
      background: "#f8d7da",
      color: "#721c24",
      padding: "10px",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "2px solid #721c24",
    },
  };

  return notification ? (
    <div style={notificationStyles[notification.type]}>
      {notification.message}
    </div>
  ) : null;
};

export default Notification;
