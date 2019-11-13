import React from "react";

function Message(props) {
  return (
    <div>
      <div className="message-username">{props.username}</div>
      <div className="message-text">{props.message}</div>
    </div>
  );
}

export default Message;
