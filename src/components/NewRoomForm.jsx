import React, { Component } from "react";

export class NewRoomForm extends Component {
  constructor() {
    super();
    this.state = {
      roomName: ""
    };
  }

  handleChange = e => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({
      roomName: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="new-room-form">
          <input
            onChange={this.handleChange}
            value={this.state.roomName}
            type="text"
            placeholder="Create new room"
            required
          />
          <button id="create-new-room-btn" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
