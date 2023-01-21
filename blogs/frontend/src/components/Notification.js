
import React from 'react';
const Notification = ({ message, notificationType }) => {
  return (
    <>
      {message !== "" && (
        <div
          className={`notification ${
            notificationType === "error" ? "error" : "done"
          }`}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Notification;
