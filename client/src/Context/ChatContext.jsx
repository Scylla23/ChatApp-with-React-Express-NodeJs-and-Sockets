/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext ,useCallback,useEffect,useState } from "react";
import { getRequest , baseUrl , postRequest } from "../Utils/services";
import { InputEmoji } from "react-input-emoji";
import {io} from "socket.io-client";



export const ChatContex = createContext();

export const ChatContexProvider = ({children , user}) => {
    const [userChats , setUserChats] = useState(null);
    const [isUserChatsLoading , setIsUserChatsLoading] = useState(null);
    const [userChatsError , setUserChatsError] = useState(null);
    const[potentialChats , setPotentialChats] = useState([]);
    const [currentChat , setCurrentChat] = useState(null);
    const [messages , setMessages] = useState(null);
    const [isMessagesLoading , setMessagesLoading] = useState(null);
    const [messagesError , setMessagesError] = useState(null);
    const [sendTextMessageError , setSendTextMessageError] = useState(null)
    const [newMessage , setNewMessage] = useState(null)
    const [socket , setSocket] = useState(null)
    const [onlineUsers , setonlineUsers] = useState([])


    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    },[user]);

    //add online user
    useEffect(() => {
        if(socket === null) return
        socket.emit("addNewUser" , user?.id)
        socket.on("getOnlineUsers" , (res) => {
            setonlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        };
    } , [socket])



    //send message
    useEffect(() => {
        if(socket === null) return

        const recipientId = currentChat?.members.find((id) => id !== user?._id);
        
        socket.emit("sendMessage", {...newMessage , recipientId})
    } , [newMessage])


    //receive message
    useEffect(() => {
        if(socket === null) return

        socket.on("getMessage" ,  res => {
            if(currentChat?._id !== res.chatId) return

            setMessages((prev) => [...prev , res] )
        } )

        return () => {
            socket.off("getMessage")
        }
    } , [socket , currentChat])



    useEffect(() => {

        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`)
            if(response.error){
                return console.log(response)
            }

            
            const pchats =     response.filter((u) => {
                let isChatCreated = false;
                if(user?._id === u?._id) return false;

                if(userChats){
                    isChatCreated =  userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated

            })
            setPotentialChats(pchats)
        }
        getUsers();
    } , [userChats])



    useEffect(() => {
        const getUserChats = async () => {
            if(user?._id){
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                //console.log(`${baseUrl}/chats/${user?._id}`)
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)
                setIsUserChatsLoading(false)
                if(response.error){
                    return setUserChatsError(response)
                }
                setUserChats(response)      
            }
        }
        getUserChats()
    },[user])


    useEffect(() => {
        const getMessages = async () => {
                setMessagesLoading(true)
                setMessagesError(null)
                //console.log(`${baseUrl}/chats/${user?._id}`)
                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)
                setMessagesLoading(false)
                if(response.error){
                    return setMessagesError(response)
                }
                setMessages(response)      
            
        }
        getMessages()
    },[currentChat])


    const sendTextMessage = useCallback(async (textMessage , sender , currentChatId ,setTextMessage) => {
        if(!textMessage) return console.log(" you must type something.. ")

        const response = await postRequest(`${baseUrl}/messages` , JSON.stringify({
            chatId : currentChatId,
            senderId : sender._id ,
            text: textMessage,
        }))

        if(response.error)
            return setSendTextMessageError(response)

        setNewMessage(response)
        setMessages((prev) => [...prev,response])
        setTextMessage("")
    } , [])



    const updateCurrentChat = useCallback( (chat) => {
        setCurrentChat(chat)
    } , [] )

    const createChat = useCallback(async(firstId , secondId) => {
        const response = await postRequest(`${baseUrl}/chats` , JSON.stringify({firstId , secondId}));

        if(response.error){
            return console.log(response)
        }
        setUserChats((prev) => [...prev , response])

    }  , [])

    return <ChatContex.Provider  value={{
        userChats,
        //setUserChats,
        isUserChatsLoading,
        //setIsUserChatsLoading,
        userChatsError,
        //setUserChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers

    }}
     >{children}</ChatContex.Provider>    

}