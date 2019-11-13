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
      <div style={{ marginTop: "20px" }}>
        <form
          onSubmit={this.handleSubmit}
          className="send-message-form ui form"
        >
          <input
            // disabled={this.props.disabled}
            className="field"
            onChange={this.handleChange}
            value={this.state.message}
            type="text"
            placeholder="Type your message and press enter"
          />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
