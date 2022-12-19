import React, { useState } from 'react';
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

const App = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [inChat, setInChat] = useState(false);

  //On form submit join to the chat with a specific room Id
  const joinChatRoom = (e) => {
    e.preventDefault();
    if(username !== "" && roomId !== ""){
      socket.emit("join_chat", roomId)
      //If this state is equal to true display chat
      setInChat(true)
    }
  }

  return ( 
    <div className="app">
      {!inChat ? (
        <div className='joinForm'>
        <h3>Join a chat room</h3>
        <form onSubmit={joinChatRoom}>
          <input type="text" placeholder="Username..." maxLength={12} onChange={(e) => {setUsername(e.target.value)}}/>
          <input type="text" placeholder="Room id..." maxLength={12} onChange={(e) => {setRoomId(e.target.value)}}/>
          <button type="submit">Join</button>
        </form>
      </div>
      ) : (
        <Chat socket={socket} username={username} roomId={roomId}/>
      )}
    </div>
   );
}
 
export default App;