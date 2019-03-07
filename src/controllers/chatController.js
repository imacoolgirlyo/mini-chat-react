import { chats } from '../db';


export const home = (req, res) => {
    res.render('home', { chats } );

}
// 자바스크립트 socket.io가 전송하는 것을 처리해야함
export const submitMessage = (req, res) => {
    console.log(req);
    res.send('message arrived');
}

// chat 중 msgType이 GIF 면 link, Text면 message를 주고 싶은데 