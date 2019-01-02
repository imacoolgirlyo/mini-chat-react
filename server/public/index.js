const socket = io();
const chat = document.querySelector('.chat-log');
const chatInputForm = document.querySelector('.chat-input-form');
const message = document.querySelector('.js-input');
const logout = document.querySelector('.log');
const nicknameInputForm = document.querySelector('.nickname-input-form');
const nicknameInput = document.querySelector('.nickname-input');

// 닉네임 설정 
console.log(socket.id);

socket.on('connect', ()=> {
    console.log(socket.id);
})

const nicknameHandler = (e) => {
    e.preventDefault();
    const nickname = nicknameInput.value;
    localStorage.setItem("nickname", nickname);

    nicknameInput.value = "";

    chatInputForm.style.display = "block";
    nicknameInputForm.style.display = "none";
    
}


nicknameInputForm.addEventListener('submit', nicknameHandler);


const logoutHandle = (e) => {
    e.preventDefault();

    socket.disconnect();
   
    chatInputForm.style.display = "none";
    nicknameInputForm.style.display = "block";
    chat.style.display = "none";


}

logout.addEventListener('click', logoutHandle)

const makeChat = (msg, nick) => {
    const chat_li = document.createElement('li');
    const nick_span = document.createElement('span');
    
    const msgTxt = document.createTextNode(msg);

    nick_span.innerHTML = nick;

    chat_li.appendChild(nick_span);
    chat_li.appendChild(msgTxt);
    
    chat.appendChild(chat_li);

}

const emitMessage = (msg, nick) => {

    socket.emit('chat message', {msg, nick});
        makeChat(msg, nick);

}

chatInputForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let message_context = message.value;
    let message_nickname = localStorage.getItem('nickname');

    if(socket.connected){

        emitMessage(message_context, message_nickname);
        message.value = "";
}
    else{
        socket.connect();
        emitMessage(message_context, message_nickname);
        message.value = "";

    }
})

// 다른 사람 메세지 받기 

const newMessage = (ob) => {
    let nick = ob.nickname;
    let msg = ob.message;

    makeChat(msg, nick);
}

socket.on('message from others' , newMessage);


