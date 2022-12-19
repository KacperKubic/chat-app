import React, { useEffect, useState } from "react";
import { MdSend } from 'react-icons/md'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, roomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    //create message and send it to the backend
    const sendMessage = async () =>{
        if(newMessage !== ""){
            let hours = new Date(Date.now()).getHours();
            let minutes = new Date(Date.now()).getMinutes();

            const messageData = {
                author: username,
                time: leadingZeros(hours) + ":" + leadingZeros(minutes),
                roomId: roomId,
                messageText: newMessage
            }

            await socket.emit("send_message", messageData)
            setMessages((messagesList) => [...messagesList, messageData])
            setNewMessage("");
        }
    }

    //add leading zeros to minut and hours
    const leadingZeros = (time) => {
        if(time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    }

    //Run this function on every change of socket variable
    useEffect(() => {
        socket.on("message", (data) => {
            //adding new message to message list that is displayed in chatMessages div
            setMessages((messagesList) => [...messagesList, data])
        })
    }, [socket])

    
    return (
        <div className="chat">
            <div className="chatName">
                <p id="liveChat">Live chat</p>
                <p id="roomName">Room: {roomId}</p>
            </div>
            <div className="chatMessages">
                <ScrollToBottom className="messagesList">
                {messages.map((message)=>{
                    return(
                        <div className="chatMessage" id={username===message.author ? "userOne" : "userTwo"}>
                            <div>
                                <div className='messageInfo'>
                                    <p id="author">{message.author}</p>
                                    <p>{message.time}</p>
                                </div>
                                <div className='messageContent'>
                                    <p>{message.messageText}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div className="chatInput">
                <input type="text" value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} onKeyDown={(e)=>{e.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}><MdSend className="sendIcon" size={20}/></button>
            </div>
        </div>
     );
}
 
export default Chat;