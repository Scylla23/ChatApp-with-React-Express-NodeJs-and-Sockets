/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { ChatContex } from "../Context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../Components/Chat/UserChat";
import PotentialChats from "../Components/Chat/PotentialChats";
import { AuthContext } from "../Context/AuthContext";

const chat = () => {
    const {user} = useContext(AuthContext)
  const {
    userChats,
    setUserChats,
    isUserChatsLoading,
    setIsUserChatsLoading,
    userChatsError,
    setUserChatsError,
  } = useContext(ChatContex);

  //console.log("UserChats", userChats);
  return (
  <Container>
    <PotentialChats/>

    {userChats?.length < 1 ? null : (
      <Stack direction="horizontal" gap={4} className="align-items-start" >
        <Stack className="message-box flex-grow-0" gap={3}>
            {isUserChatsLoading &&  <p>Loading Chats</p> }
            {userChats?.map((chat,index) =>{
                return (
                    <div key={index}>
                        <UserChat chat ={chat} user ={user}/>
                    </div>
                )
            })}
        </Stack>
        <p>ChatBox</p>
      </Stack>
    )}
  </Container>);
  
};

export default chat;
