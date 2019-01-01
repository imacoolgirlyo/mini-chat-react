const socket = io();
const chat = document.querySelector('.chat-log');
const form = document.querySelector('form');
const message = document.querySelector('.js-input');


const makeChat = (msg) => {
    const chat_li = document.createElement('li');
    chat_li.innerHTML = msg;
    chat.appendChild(chat_li);

}

form.addEventListener('submit', event => {
    event.preventDefault();
    
    let message_context = message.value;
    socket.emit('chat message', message_context);
    makeChat(message_context);
    message.value = "";
    
})