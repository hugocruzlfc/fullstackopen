const Notification = ({ message, typeNotification }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="notification"
      style={{ color: `${typeNotification}` === "success" ? "green" : "red" }}
    >
      {message}
    </div>
  );
};

export default Notification;
