/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import {Alert , Button , Form , Row  , Col , Stack} from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext";
const register = () => {
  const {user ,registerInfo , updateRegisterInfo , registeruser , registerError,isRegisterLoading} = useContext(AuthContext);
    return ( 
    <>
        <Form  onSubmit={registeruser}>
            <Row style={{height:"100vh" , justifyContent:"centre" , paddingTop:"10%",}}>
                <Col xs={6}>
                    <Stack>
                        <h2>Register</h2>
                        <Form.Control type="text" placeholder="Name" onChange={(e) => 
                            updateRegisterInfo({...registerInfo , name : e.target.value})
                        } />
                        <Form.Control type="email" placeholder="Email" onChange={(e) => 
                            updateRegisterInfo({...registerInfo , email : e.target.value})
                        } />
                        <Form.Control type="password" placeholder="Password" onChange={(e) => 
                            updateRegisterInfo({...registerInfo , password : e.target.value})
                        } />
                        <Button type="submit" variant="primary" >
                            {isRegisterLoading ? "Creating your account" : "Register"}
                        </Button>
                        {
                            registerError?.error && (<Alert variant="danger">
                            <p>{registerError?.message}</p>
                            </Alert>)
                        }
                    </Stack>
                
                </Col>

            </Row>
        </Form>
    </>
  );
};
 
export default register;