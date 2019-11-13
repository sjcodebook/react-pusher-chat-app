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
      <div style={{ marginTop: "20px" }}>
        <form onSubmit={this.handleSubmit} className="new-room-form ui form">
          <input
            className="field"
            onChange={this.handleChange}
            value={this.state.roomName}
            type="text"
            placeholder="Create new room"
            required
          />
          <button
            style={{ marginTop: "10px", textAlign: "center" }}
            id="create-new-room-btn"
            className="ui primary button fluid"
            type="submit"
          >
            +
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
