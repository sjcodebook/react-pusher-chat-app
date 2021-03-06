import React, { Component } from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

export class MessageList extends Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    // if (!this.props.roomId) {
    //   return (
    //     <div className="message-list">
    //       <div className="join-room">please join a room first</div>
    //     </div>
    //   );
    // }

    return (
      <div className="message-list">
        <h3>Messages</h3>
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              username={message.senderId}
              message={message.text}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
