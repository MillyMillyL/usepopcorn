import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <p className="error">
      <span>⛔</span> {error}
    </p>
  );
};

export default ErrorMessage;
