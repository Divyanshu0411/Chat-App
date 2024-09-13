import { Box } from '@chakra-ui/layout';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import ChatBox from '../components/MyChats';
import MyChats from '../components/ChatBox';
import { useState } from 'react';

const ChatPage = () => {

    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p='10px'>
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}

            </Box>
        </div>
    )
}

export default ChatPage;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ChatPage = () => {

//     const [chats, setChats] = useState([]);

//     const fetchChats = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/chat");
//             console.log(response.data);
//             setChats(response.data);
//         } catch (error) {
//             if (error.response) {
//                 console.error('Server responded with:', error.response.data);
//                 console.error('Status code:', error.response.status);
//             } else if (error.request) {
//                 console.error('No response received:', error.request);
//             } else {
//                 console.error('Error:', error.message);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchChats();
//     }, []);

//     return (
//         <div>
//             <h1>Chatpage</h1>
//             {chats.map(chat => <div key={chat.id}>{chat.chatName}</div>)}
//         </div>
//     );
// };

// export default ChatPage;
