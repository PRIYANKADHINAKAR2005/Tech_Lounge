const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const cors = require('cors');


const formatmessage = require("./util/messages.js");
const { JoinUsers, getUser, userLeave, getRoomUsers } = require('./util/users.js');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

const usernameTech = "TechLounge";

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    let user;

    socket.on('joinChatRoom', ({ username, room }) => {
        user = JoinUsers(socket.id, username, room);
        socket.join(user.room);

        // Welcome the user when connected
        socket.emit("message", formatmessage(usernameTech, 'Welcome to the TechLounge.. Start your Journey..'));

        // Broadcast when a user joins the chat
        socket.broadcast.to(user.room).emit('message', formatmessage(usernameTech, `${user.username} has joined the chat`));

        // Send updated users list
        io.to(user.room).emit('getUsersDetails', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // When a chat message is received
    socket.on('chatmsg', (msg) => {
        user = getUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatmessage(user.username, msg));
        }
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatmessage(usernameTech, `${user.username} has left the chat`));
            
            // Send updated users list
            io.to(user.room).emit('getUsersDetails', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
