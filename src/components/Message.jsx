import React from "react";

function Message(props) {
  return (
    <div>
      <div class="ui success message">
        <div class="header">{props.username}</div>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Message;
