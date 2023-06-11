/* eslint-disable no-unused-vars */
import {Alert , Button , Form , Row  , Col , Stack} from "react-bootstrap"
const Login = () => {
  return ( 
    <>
        <Form>
            <Row style={{height:"100vh" , justifyContent:"centre" , paddingTop:"10%"}}>
                <Col xs={6}>
                    <Stack>
                        <h2>Login</h2>
                        <Form.Control type="email" placeholder="Email" />
                        <Form.Control type="password" placeholder="Password" />
                        <Button type="submit" variant="primary" >
                            Login
                        </Button>
                        <Alert variant="danger">
                            <p>An Error Occured</p>
                        </Alert>
                    </Stack>
                
                </Col>

            </Row>
        </Form>
    </>
  );
};
 
export default Login;