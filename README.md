

# TechLounge Chat Application By Priyanka
TechLounge is a simple real-time chat application built using Node.js, Express, Socket.io, and Vanilla JavaScript. It allows users to join different chat rooms and send real-time messages.

# Features
Join a chat room with a custom username. 
Real-time messaging with users in the same chat room. 
Display a list of users in the chat room. Leave the room and redirect back to the homepage.  

# Tech Stack 
Frontend: HTML, CSS, JavaScript 
Backend: Node.js, Express, Socket.io 
Real-time Communication: Socket.io 


# Prerequisites 
Make sure you have the following installed on your machine:
Node.js (v14 or above) npm (Node package manager)

Backend (Node.js & Express) server.js: This is the entry point of the application. It sets up the Express server and integrates Socket.io for handling real-time communication. The connection event handles new connections and listens for events like joinChatRoom, chatmsg, and disconnect.

messages.js: Utility file that formats messages by adding a timestamp and username.

users.js: Utility file that manages users, including adding a user to a room, removing a user when they disconnect, and getting a list of users in a specific room.

Frontend (HTML, CSS, JavaScript) index.html: The frontend page where users can enter a username and a room to join the chat. It also includes the main chat interface. 

main.js: Client-side JavaScript that connects to the Socket.io server, handles events like sending and receiving messages, and updates the DOM. 

# Future Enhancements 
Adding typing indicators to show when another user is typing. Storing chat history in a database so that users can view older messages. Adding support for private messaging between users. Implementing emojis, GIFs, or file sharing features.
