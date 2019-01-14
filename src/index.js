const socket = io({
    autoConnect: false
});
const chat = document.querySelector('.chat-log');
const chatInputForm = document.querySelector('.chat-input-form');
const message = document.querySelector('.js-input');
const logout = document.querySelector('.log');
const nicknameInputForm = document.querySelector('.nickname-input-form');
const nicknameInput = document.querySelector('.nickname-input');

const gifContatiner = document.querySelector('.gifs');
const gifInputForm = document.querySelector('.gif-input-form');
const gifInput = document.querySelector('.gif-input');
const gifBtn = document.querySelector('.gifBtn'); 
const gifSearchBtn = document.querySelector('.gif_search');

let status = true;

const gifBtnHandler = e => {
    e.preventDefault();
    chatInputForm.style.display = "none";
    gifInputForm.style.display = "block";
}

const gifSearchBtnHandler = e => {
    e.preventDefault();

    let nickname = localStorage.getItem('nickname');
    let gif_input_v = gifInput.value;

    fetch(`http://api.giphy.com/v1/gifs/search?q=${gif_input_v}&api_key=co5seap5Cu8XVR3owweQWvbkXNqEeHSO&limit=5`)
    .then(res => res.json())
    .then(data => {
        gifContatiner.src = data.data[2].images.original.url;
        socket.emit('gif', nickname, data.data[2].images.original.url)
    });

}
const gifUrlHander = (nick, url) => {

    const chat_li = document.createElement('li');
    const nick_span = document.createElement('span');
    const img_gif = document.createElement('img');

    nick_span.innerHTML = nick;
    img_gif.src = url;

    chat_li.appendChild(nick_span);
    chat_li.appendChild(img_gif);
    
    chat.appendChild(chat_li);

}

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
    gifBtn.style.display = "block";
    
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
    let nickname_check = localStorage.getItem('nickname');
    if(nickname_check != nick){

    chat.style.display = "block";
    const chat_li = document.createElement('li');
    chat_li.classList.add('chat_container_other')
    const nick_span = document.createElement('div');
    const msgTxt = document.createElement('div');
    nick_span.classList.add('chat_nick');
    

    nick_span.innerHTML = nick;
    msgTxt.innerHTML = msg;

    chat_li.appendChild(nick_span);
    chat_li.appendChild(msgTxt);
    
    chat.appendChild(chat_li);

    }else{

    chat.style.display = "block";
    const chat_li = document.createElement('li');
    const msgTxt = document.createElement('div');

    msgTxt.innerHTML = msg;
    
    chat_li.appendChild(msgTxt);
    chat_li.classList.add('chat_container_me')


    chat.appendChild(chat_li);

    }

}

const chatInputFormHandler = (e) => {
    e.preventDefault();
        let message_context = message.value;
        let message_nickname = localStorage.getItem('nickname');
    if(message.value != ""){
        socket.emit('chat message', message_nickname, message_context);
        makeChat(message_nickname, message_context);
    
        message.value = "";
    }
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
chatInputForm.addEventListener('submit', chatInputFormHandler)
gifBtn.addEventListener('click', gifBtnHandler);
gifSearchBtn.addEventListener('click', gifSearchBtnHandler);

socket.on('message from others' , makeChat);
socket.on('login notification' , logInOutNotiHandler);
socket.on('gif from others', gifUrlHander);


