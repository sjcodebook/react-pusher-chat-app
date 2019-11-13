import React, { Component } from "react";
import "./App.css";
// import { ChatkitProvider } from "@pusher/chatkit-client-react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

// import Welcome from "./components/Welcome";
import MessageList from "./components/MessageList";
import NewRoomForm from "./components/NewRoomForm";
import RoomList from "./components/RoomList";
import SendMessageForm from "./components/SendMessageForm";

import { tokenURL, instanceLocator } from "./config";

const tokenProvider = new TokenProvider({
  url: tokenURL
});

const userId = "dragon";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
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
          roomId: room.id
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
        {/* <ChatkitProvider
          instanceLocator={instanceLocator}
          tokenProvider={tokenProvider}
          userId={userId}
        >
          <Welcome />
        </ChatkitProvider> */}
        <MessageList
          roomId={this.props.roomId}
          messages={this.state.messages}
        />
        <NewRoomForm createRoom={this.createRoom} />
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <SendMessageForm
          disabled={!this.state.room}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

export default App;
