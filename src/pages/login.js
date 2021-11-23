import React, {useEffect, useContext } from 'react';
import "../assets/css/style.css"
import { MovieGameContext} from '../context/moviegamecontext';
import {Card,Form,Input,Button,Checkbox } from 'antd';
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from "../assets/img/gambar-login-register.png"

const { Meta } = Card;
const Login = () => { 
    const {inputUser,setInputUser,functions} = useContext(MovieGameContext)
    const{lastestMovie} = functions
    let history = useHistory();

    const onFinish = (event) => {
        console.log(event.email)
        axios.post('https://backendexample.sanbersy.com/api/user-login',{email:event.email,password:event.password})
        .then((e)=>{
            alert("Login Successfull !");
            let token = e.data.token;
            let name = e.data.user.name;
            Cookies.set('token',token,{expires:1})
            Cookies.set('name',name,{expires:1})
            history.push('/home');
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
                <Card className="card-login" cover={<img alt="example" src={logo} style={{height:'500px', width:'410px', objectFit:"cover",float:'left',marginRight:'100px'}}/>} bodyStyle={{paddingLeft:'20px'}}>
                   <div className="card-login-form">     
                        <h5 class="card-title header-login">Login</h5>
                        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} method="post">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input value={inputUser.email} required/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input.Password value={inputUser.password} required/>
                            </Form.Item>
                            <Form.Item>
                                <Button className="button-form-login" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                            <p style={{color:'white'}}> You don't have account ? <Link to="/register"> Create account</Link> </p>
                        </Form> 
                    </div>                 
                </Card>

            </div>
        </>
    )
}

export default Login



