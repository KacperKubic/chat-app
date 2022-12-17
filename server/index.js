const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket)=>{
    console.log(socket.id);

    socket.on("join_chat", (data)=>{
        socket.join();
        console.log(`User ${socket.id} joined a room with an id of: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.id).emit("message", data);
    })

    socket.on("disconnect", ()=>{
        console.log("User disconnected")
    })
})

server.listen(3001, ()=>{
    console.log("Server running on port 3001")
})