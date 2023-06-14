/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { ChatContex } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";

const potentialChats = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useContext(AuthContext)
    const {potentialChats , createChat } = useContext(ChatContex)
    
   return ( 
   <>
        <div className="all-users">
            {potentialChats && potentialChats.map((u,index) => {
                return (<div className="single-user"  key={index} onClick={createChat(user._id , u._id)} >
                {u.name}
                <span className="user-online"></span>
            </div>);
            })}
        </div>
    </> 
    );
}
 
export default potentialChats;