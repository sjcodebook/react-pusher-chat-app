import React from "react";

function Message(props) {
  return (
    <div>
      <div className="ui success message">
        <div className="header">{props.username}</div>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Message;
