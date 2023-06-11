/* eslint-disable no-unused-vars */
import { Children, createContext ,useCallback,useEffect,useState } from "react";
import { baseUrl, postRegister } from "../Utils/services";


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [registerError,setRegisterError] = useState(null);
    const [isRegisterLoading,setisRegisterLoading] = useState(false);
    const[registerInfo,setRegisterInfo] = useState({
        name : "",
        email : "",
        password : "",
    })
    console.log(user);
    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    },[])

    const registeruser = useCallback( async (event) => {
        event.preventDefault();
        setisRegisterLoading(true)
        setRegisterError(null)

        const response = postRegister(`${baseUrl}/users/register` , JSON.stringify(registerInfo))
        setisRegisterLoading(false)
        
        if(response.error){
            return setRegisterError(response);
        }
        console.log("Response from api " + JSON.stringify(response))
        localStorage.setItem("User" ,JSON.stringify(response) )
        setUser(response);
        //console.log("User " + JSON.stringify(user));

    },[registerInfo])

 

    //console.log(registerInfo);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    },[])

    return <AuthContext.Provider value={{registerInfo , updateRegisterInfo ,registeruser, registerError ,isRegisterLoading}}>
            {children}
        </AuthContext.Provider>   

}