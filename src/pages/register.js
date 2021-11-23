import React, {useEffect, useContext } from 'react';
import "../assets/css/style.css"
import { MovieGameContext} from '../context/moviegamecontext';
import {Card,Form,Input,Button,Checkbox } from 'antd';
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from "../assets/img/gambar-register.png"

const { Meta } = Card;
const Register = () => { 
    const {inputUser,setInputUser,functions} = useContext(MovieGameContext)
    
    let history = useHistory();
 
    const onFinish = (event) => {
        axios.post(`https://backendexample.sanbersy.com/api/register`,{name:event.name,email:event.email,password:event.password})
        .then((e)=>{
            alert("Registration Successful")
            history.push('/login')
        }).catch((e)=>{
            alert(e)
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <>
            <div className="content-homepage content-homepage-xl-6 content-homepage-l-9 content-homepage-md-11">
                <Card className="card-register" cover={<img alt="example" src={logo} style={{height:'560px', width:'410px', objectFit:"cover",float:'left',marginRight:'50px'}}/>} bodyStyle={{paddingLeft:'20px'}}>
                    <div className="card-register-form">
                        <h5 class="header-register">Register</h5>
                            <Form layout="vertical" style={{paddingTop:'2px'}} onFinish={onFinish} onFinishFailed={onFinishFailed} method="post">
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    <Input required value={inputUser.name}/>
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Input required value={inputUser.email}/>
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Input.Password required value={inputUser.password}/>
                                </Form.Item><br/>
                                <Form.Item>
                                    <Button className="button-form-login" htmlType="submit">
                                        Register
                                    </Button>
                                </Form.Item>
                                <p style={{color:'white'}}> Do you have account ? <Link to="/login"> Back to login</Link> </p>
                            </Form>
                    </div>
                       
                </Card>

            </div>
        </>
    )
}

export default Register



