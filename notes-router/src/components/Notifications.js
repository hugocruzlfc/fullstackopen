import React from "react";
import { Alert } from "react-bootstrap";

export default function Notifications({ message }) {
  return (
    <div className="container">
      {message && <Alert variant="success">{message}</Alert>}
    </div>
  );
}
