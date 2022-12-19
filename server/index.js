const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

//Creating express server
const app = express();
app.use(cors());

//Creating http server
const server = http.createServer(app).listen(process.env.PORT || 3001);

//New socket.io server with cors configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket)=>{
    //On "join_chat" event connect the user into the given room 
    socket.on("join_chat", (data)=>{
        socket.join(data);
        console.log(`User ${socket.id} joined a room with an id of: ${data}`)
    })

    //On "send_message" event send all the message info to the specific room
    socket.on("send_message", (data) => {
        socket.to(data.roomId).emit("message", data);
    })

    socket.on("disconnect", ()=>{
        console.log("User disconnected")
    })
})