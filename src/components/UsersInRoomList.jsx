import React, { Component } from "react";

export class UsersInRoomList extends Component {
  render() {
    return (
      <div>
        <h3>Users In The Room</h3>
        {this.props.users.map(user => {
          return (
            <li
              style={{ paddingRight: "20px" }}
              key={user.id}
              className="ui list item"
            >
              # {user.name}
            </li>
          );
        })}
      </div>
    );
  }
}

export default UsersInRoomList;
