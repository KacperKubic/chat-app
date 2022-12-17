import React, { useState } from 'react';
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

const App = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [inChat, setInChat] = useState(false);

  const joinChatRoom = (e) => {
    e.preventDefault();
    if(username !== "" && roomId !== ""){
      socket.emit("join_chat", roomId)
      setInChat(true)
    }
  }

  return ( 
    <div className="app">
      {!inChat ? (
        <div className='joinForm'>
        <h3>Join a chat room</h3>
        <form onSubmit={joinChatRoom}>
          <input type="text" placeholder="Username..." onChange={(e) => {setUsername(e.target.value)}}/>
          <input type="text" placeholder="Room id..." onChange={(e) => {setRoomId(e.target.value)}}/>
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