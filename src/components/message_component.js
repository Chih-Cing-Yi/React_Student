import React from "react";

export const message_component = ({ message, messageType, setMessage }) => {
  return (
    <div className={messageType} role="alert">
      {message}
      <button
        onClick={() => setMessage("")}
        type="button"
        className="btn-close"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default message_component;
