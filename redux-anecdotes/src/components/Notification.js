import React from "react";
import { useSelector } from "react-redux";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <>
      {notifications.visible && (
        <div style={style}>{notifications.message}</div>
      )}
    </>
  );
};

export default Notification;
