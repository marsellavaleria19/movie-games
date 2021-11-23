import React, { useState,useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import { Button,message,Card,Input} from 'antd';
import { useHistory,useParams,Link} from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

const ChangePasswordForm = () => { 
    
    const {TextArea} = Input;
    
    let history = useHistory();
    let {id} = useParams();
    const [inputChangePassword,setInputChangePassword] = useState({
        current_password:"",
        new_password: "",
        new_confirm_password: ""
    });

    const handleChange = (event)=>{
        let value = event.target.value;
        let nameOfInput = event.target.name;
        
        setInputChangePassword({...inputChangePassword,[nameOfInput]:value});
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const { current_password,new_password,new_confirm_password} = inputChangePassword;
        axios.post(`https://backendexample.sanbersy.com/api/change-password`,{
            current_password,new_password,new_confirm_password},{headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
            .then(res=>{
                message.success("Password changed successfully!")
              
            }).catch((e)=>{
                message.error(e.response.data);
            })
        
        history.push('/home')
        setInputChangePassword({
        current_assword:"",
        new_password: "",
        new_confirm_password: ""})
    }

  

    return (
        <>
        <Card className="card-data-form-admin" title="Form Change Password" headStyle={{color:'white', fontSize:'20pt'}}>
            <div className="content-form-password">
                <form method="post" onSubmit={handleSubmit}>
                    <label className="content-form-password-label content-form-password-label-xxl content-form-password-label-xl content-form-password-label-l content-form-password-label-md">Current Password</label><Input.Password required style={{width:'40%', marginBottom:'10px'}} placeholder="Current Password" name="current_password" value={inputChangePassword.current_password} onChange={handleChange}/><br/>
                    <label className="content-form-password-label content-form-password-label-xxl content-form-password-label-xl content-form-password-label-l content-form-password-label-md">New Password</label><Input.Password required placeholder="Genre" style={{width:'40%', marginBottom:'10px'}} placeholder="New Password" name="new_password" value={inputChangePassword.new_password} onChange={handleChange}/><br/>
                    <label className="content-form-password-label content-form-password-label-xxl content-form-password-label-xl content-form-password-label-l content-form-password-label-md">Confirm Password</label><Input.Password style={{width:'40%'}} placeholder="Confirm Password" name="new_confirm_password" value={inputChangePassword.new_confirm_password} required onChange={handleChange}/><br/>
                        <Button htmlType="submit" ghost>Submit</Button>
                </form>
            </div>         
        </Card>
        </>
    )
}

export default ChangePasswordForm



