/* eslint-disable no-unused-vars */
import { Children, createContext ,useCallback,useEffect,useState } from "react";
import { baseUrl, postRequest } from "../Utils/services";


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
    const [loginError,setLoginError] = useState(null);
    const [isLoginLoading,setisLoginLoading] = useState(false);
    const[loginInfo,setLoginInfo] = useState({
        name : "",
        email : "",
        password : "",
    })
    console.log("User" , user);
    console.log("LoginInfo" , loginInfo);
    useEffect(() =>{
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user))
    } , [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    },[])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    },[])

    const registeruser = useCallback( async (event) => {
        event.preventDefault();
        setisRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}/users/register` , JSON.stringify(registerInfo))
        setisRegisterLoading(false)
        console.log(response)
        if(response.error){
            return setRegisterError(response);
        }
        console.log("RegisterInfo  " + registerInfo);
        localStorage.setItem("User" ,JSON.stringify(registerInfo))
        setUser(response);
        //console.log("User " + JSON.stringify(user));

    },[registerInfo])


    const loginUser =  useCallback( async (e) => {
        e.preventDefault();
        setisLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(`${baseUrl}/users/login` , JSON.stringify(loginInfo))
        setisLoginLoading(false)

        if(response.error){
            return setLoginError(response)
        }
        localStorage.setItem("User",JSON.stringify(response))
        setUser(response)
        return response
    },[loginInfo])


    //console.log(user);
    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    },[])

   

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    },[])

    //console.log(registerInfo);

    

    return <AuthContext.Provider value={{user ,registerInfo , updateRegisterInfo ,registeruser, registerError ,isRegisterLoading ,
     logoutUser , loginError,loginInfo , loginUser , updateLoginInfo , isLoginLoading , 
     }}>
            {children}
        </AuthContext.Provider>   

}