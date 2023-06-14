/* eslint-disable no-unused-vars */
import {Routes , Route , Navigate} from "react-router-dom"
import Chat from "./Pages/Chat"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import NavBar from "./Components/NavBar"
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext"
import { ChatContexProvider } from "./Context/ChatContext"

function App() {
  const {user} = useContext(AuthContext);
  console.log("User" , user);
  return (
    <ChatContexProvider user  = {user} >
      <NavBar/>
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat/> : <Login/>} />
          <Route path="/register" element={ user ? <Chat/> : <Register/> } />
          <Route path="/login" element={ user ? <Chat/> : <Login/> } />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Container>
    </ChatContexProvider>
  )
}

export default App
