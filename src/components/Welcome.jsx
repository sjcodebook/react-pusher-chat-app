import { withChatkit } from "@pusher/chatkit-client-react";

import React from "react";

export default withChatkit(props => {
  return (
    <div>
      {props.chatkit.isLoading
        ? "Connecting to Chatkit..."
        : `Hello ${props.chatkit.currentUser.name}!`}
    </div>
  );
});
