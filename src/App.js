import React, { Component } from "react";
import "./App.css";
// import { ChatkitProvider } from "@pusher/chatkit-client-react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

// import Welcome from "./components/Welcome";
import MessageList from "./components/MessageList";
import NewRoomForm from "./components/NewRoomForm";
import RoomList from "./components/RoomList";
import SendMessageForm from "./components/SendMessageForm";
import UsersInRoomList from "./components/UsersInRoomList";

import { tokenURL, instanceLocator } from "./config";

const tokenProvider = new TokenProvider({
  url: tokenURL
});

const userId = "viking";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      usersInRoom: []
    };
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId,
      tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log(err));
  }

  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log(err));
  };

  subscribeToRoom = roomId => {
    this.setState({
      messages: []
    });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        messageLimit: 20,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id,
          usersInRoom: this.currentUser.users
        });
        this.getRooms();
      })
      .catch(err => console.log(err));
  };

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  createRoom = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <div className="ui red segment">
          <h1>React Chat App</h1>
        </div>

        {/* <ChatkitProvider
          instanceLocator={instanceLocator}
          tokenProvider={tokenProvider}
          userId={userId}
        >
          <Welcome />
        </ChatkitProvider> */}
        <div className="ui grid" style={{ marginTop: "20px" }}>
          <div className="column four wide">
            <RoomList
              roomId={this.state.roomId}
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            />
            <NewRoomForm createRoom={this.createRoom} />
          </div>
          <div className="column eight wide">
            <MessageList
              roomId={this.props.roomId}
              messages={this.state.messages}
            />

            <SendMessageForm
              disabled={!this.state.room}
              sendMessage={this.sendMessage}
            />
          </div>
          <div className="column four wide">
            <UsersInRoomList users={this.state.usersInRoom} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
