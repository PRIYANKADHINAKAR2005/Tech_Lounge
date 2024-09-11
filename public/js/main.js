const socket = io(window.location.origin);

const chatmessage = document.querySelector('.chat-messages');
const roomname = document.getElementById('room-name');
const userList = document.getElementById('users');




 
// Getting the user details
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join the chat room
socket.emit('joinChatRoom', { username, room });

// Get room users
socket.on('getUsersDetails', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Receive message
socket.on('message', (message) => {
    console.log(message);
    Outputting(message);

    // Scroll down
    chatmessage.scrollTop = chatmessage.scrollHeight;
});

// Send message
const chat_form = document.getElementById("chat-form");
chat_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg").value;

    socket.emit('chatmsg', msg);
    document.getElementById("msg").value = "";
    e.target.elements.msg.focus();
});

function Outputting(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomname.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const leaveBtn = document.getElementById('leave-btn');

   
    leaveBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
});
