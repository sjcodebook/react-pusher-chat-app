import React, { Component } from "react";

export class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="send-message-form">
          <input
            // disabled={this.props.disabled}
            onChange={this.handleChange}
            value={this.state.message}
            type="text"
            placeholder="type your message"
          />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
