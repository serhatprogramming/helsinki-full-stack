const Notification = ({ notification }) => {
  const notificationBoxStyle = {
    backgroundColor: notification.type === "error" ? "#f8d7da" : "#d1ecf1",
    border:
      notification.type === "error" ? "1px solid #f5c6cb" : "1px solid #bee5eb",
    color: notification.type === "error" ? "#721c24" : "#0c5460",
    padding: "10px",
    borderRadius: "4px",
    marginTop: "10px",
  };

  return (
    <div style={notificationBoxStyle} id="notification-div">
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
