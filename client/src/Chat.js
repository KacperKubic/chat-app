import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, roomId }) => {
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = async () =>{
        if(newMessage !== ""){
            const messageData = {
                author: username,
                roomId: roomId,
                messageText: newMessage
            }

            await socket.emit("send_message", messageData)
            setNewMessage("");
        }
    }

    useEffect(() => {
        socket.on("message", (data) => {
            console.log(data)
        })
    }, [socket])

    
    return (
        <div className="chat">
            <div className="chatName">

            </div>
            <div className="chatMessages">

            </div>
            <div className="chatInput">
                <input type="text" value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} onKeyDown={(e)=>{e.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
     );
}
 
export default Chat;