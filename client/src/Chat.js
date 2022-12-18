import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, roomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = async () =>{
        if(newMessage !== ""){
            const messageData = {
                author: username,
                roomId: roomId,
                messageText: newMessage
            }

            await socket.emit("send_message", messageData)
            setMessages((messagesList) => [...messagesList, messageData])
            setNewMessage("");
        }
    }

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((messagesList) => [...messagesList, data])
        })
    }, [socket])

    
    return (
        <div className="chat">
            <div className="chatName">
                <p>Room: {roomId}</p>
            </div>
            <div className="chatMessages">
                {messages.map((message)=>{
                    return(
                        <div className="chatMessage" id={username===message.author ? "userOne" : "userTwo"}>
                            <div>
                                <div className='messageInfo'>
                                    <p id="author">{message.author}</p>
                                </div>
                                <div className='messageContent'>
                                    <p id="author">{message.messageText}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="chatInput">
                <input type="text" value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} onKeyDown={(e)=>{e.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
     );
}
 
export default Chat;