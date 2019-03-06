import { chats } from '../db';


export const home = (req, res) => {


    res.render('home', { chats } );

}

// chat 중 msgType이 GIF 면 link, Text면 message를 주고 싶은데 