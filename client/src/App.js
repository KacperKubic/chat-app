import React, { useState } from 'react';
import io from 'socket.io-client'
import './App.css'

const socket = io.connect("http://localhost:3001")

const App = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinChatRoom = () => {
    if(username !== "" && roomId !== ""){
      socket.emit("join_chat", roomId)
    }
  }

  return ( 
    <div className="App">
      <h4>Join a chat room</h4>
      <form onSubmit={joinChatRoom}>
        <input type="text" placeholder="Username..." onChange={(e) => {setUsername(e.target.value)}}/>
        <input type="text" placeholder="Room id..." onChange={(e) => {setRoomId(e.target.value)}}/>
        <button type="submit">Join</button>
      </form>
    </div>
   );
}
 
export default App;