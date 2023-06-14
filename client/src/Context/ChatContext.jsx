/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext ,useCallback,useEffect,useState } from "react";
import { getRequest , baseUrl , postRequest } from "../Utils/services";


export const ChatContex = createContext();

export const ChatContexProvider = ({children , user}) => {
    const [userChats , setUserChats] = useState(null);
    const [isUserChatsLoading , setIsUserChatsLoading] = useState(null);
    const [userChatsError , setUserChatsError] = useState(null);
    const[potentialChats , setPotentialChats] = useState([]);


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
        createChat

    }}
     >{children}</ChatContex.Provider>    

}