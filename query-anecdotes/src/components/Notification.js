import { useContext } from "react";
import { NotificationContext } from "../context/Notification";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [notification, dispatch] = useContext(NotificationContext);
  console.log(notification);
  if (notification.message === "") return null;

  return (
    <div style={style}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
