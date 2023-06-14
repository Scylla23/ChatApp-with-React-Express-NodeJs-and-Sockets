/* eslint-disable react/prop-types */
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/images.png"

const UserChat = ({ chat , user }) => {

    const { recipientuser} = useFetchRecipientUser(chat,user);
    console.log("recipient user" , recipientuser);
    return ( 
        <Stack direction="horizontal" gap={3} className="user-card align-item-centre p-2 justify-content-between" role="button">
            <div className="d-flex">
                <div className="me-2">{<img src={avatar} height="35px" />}</div>
                <div className="text-content">
                    <div className="name">{recipientuser?.name}</div>
                    <div className="text">Text Message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-item-end">
                <div className="date">1/1/1001</div>
                <div className="this-user-notifications">2</div>
                <span className="user-online" ></span>
            </div>


        </Stack>
     );
}
 
export default UserChat;