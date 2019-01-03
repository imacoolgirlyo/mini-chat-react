const socket = io({
    autoConnect: false
});
const chat = document.querySelector('.chat-log');
const chatInputForm = document.querySelector('.chat-input-form');
const message = document.querySelector('.js-input');
const logout = document.querySelector('.log');
const nicknameInputForm = document.querySelector('.nickname-input-form');
const nicknameInput = document.querySelector('.nickname-input');

let status = true;

// 닉네임 입력하고, 소켓 처음 연결 , connect 
const loginHandler = (e) => {

    socket.open();

    e.preventDefault();

    let status = true;
    const nickname = nicknameInput.value;
    localStorage.setItem("nickname", nickname);

    socket.emit('nickname' , nickname, status);

    nicknameInput.value = "";

    chatInputForm.style.display = "block";
    nicknameInputForm.style.display = "none";
    
}
nicknameInputForm.addEventListener('submit', loginHandler);


const logoutHandle = (e) => {

    e.preventDefault();

    let status = false;
    let nickname = localStorage.getItem('nickname');
    socket.emit('nickname' , nickname, status);

    socket.disconnect();
   
    chatInputForm.style.display = "none";
    nicknameInputForm.style.display = "block";
    chat.style.display = "none";


}
logout.addEventListener('click', logoutHandle)

const makeChat = (msg, nick) => {
    
    chat.style.display = "block";

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

        emitMessage(message_context, message_nickname);
        message.value = "";
})


const newMessage = (ob) => {
    let nick = ob.nickname;
    let msg = ob.message;

    makeChat(msg, nick);
}

socket.on('message from others' , newMessage);

const logInOutNotiHandler = (nick, status) => {

    console.log(status);
    if(status){

        const li = document.createElement('li');
        li.innerHTML = `${nick} 가 입장하였습니다.`;

        chat.appendChild(li);

    }else{
        const li = document.createElement('li');
        li.innerHTML = `${nick} 가 퇴장하였습니다.`;

        chat.appendChild(li);
    }
    
}

socket.on('login notification' , logInOutNotiHandler);


