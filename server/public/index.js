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

const makeChat = (nick, msg) => {
    // 나한테 온거, 남한테 온거 구분
    console.log(nick + msg);

    chat.style.display = "block";
    const chat_li = document.createElement('li');
    const nick_span = document.createElement('span');
    const msgTxt = document.createTextNode(msg);

    nick_span.innerHTML = nick;

    chat_li.appendChild(nick_span);
    chat_li.appendChild(msgTxt);
    
    chat.appendChild(chat_li);

}


const logInOutNotiHandler = (nick, status, clientNum) => {

    console.log(status);
    if(status){
        console.log("접속자 수 " + clientNum);

        const li = document.createElement('li');
        li.innerHTML = `${nick} 가 입장하였습니다.`;

        chat.appendChild(li);

    }else{
        const li = document.createElement('li');
        li.innerHTML = `${nick} 가 퇴장하였습니다.`;

        chat.appendChild(li);
    }
    
}

nicknameInputForm.addEventListener('submit', loginHandler);
logout.addEventListener('click', logoutHandle)
chatInputForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let message_context = message.value;
    let message_nickname = localStorage.getItem('nickname');

    socket.emit('chat message', message_nickname, message_context);
    makeChat(message_nickname, message_context);

    message.value = "";
})


socket.on('message from others' , makeChat);
socket.on('login notification' , logInOutNotiHandler);


