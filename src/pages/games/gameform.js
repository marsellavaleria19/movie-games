import React, { useState,useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import { Table,Button, Space,message,Card,Input,Checkbox } from 'antd';
import { useHistory,useParams,Link} from "react-router-dom";

const GameForm = () => { 
    let history = useHistory();
    let {id} = useParams();
    const {inputGame,setInputGame,currentIdGame,setCurrentIdGame,functions} = useContext(MovieGameContext);
    const {functionSubmit,functionEdit,functionUpdate} = functions

    useEffect(()=>{
        if(id!==null){
            functionEdit(id,'games');
        }    
     },[])

    const handleChange = (event)=>{
        let value = event.target.value;
        let nameOfInput = event.target.name;
        let platform = ["singlePlayer","multiplayer"]

        if(platform.indexOf(nameOfInput)===-1){
            setInputGame({...inputGame,[nameOfInput]:value});
        }
        else{
            setInputGame({...inputGame,[nameOfInput]:!inputGame[nameOfInput]})
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(currentIdGame==null){
            functionSubmit('games');
            message.success('Data added successfully!');      
        }
        else{
            functionUpdate('games');
            message.success('Data changed successfully!');    
        }
        
        history.push("/gamelist");
        setInputGame({ 
            genre: "",
            image_url: "",
            singlePlayer: 1,
            multiplayer: 1,
            name: "",
            platform: "",
            release: 0})

        setCurrentIdGame(null);
    }


    return (
        <>
        <Card className="card-data-form-admin" title="Form Games" headStyle={{color:'white', fontSize:'20pt'}}>
            <div className="content-form  content-form-xxl  content-form-xl content-form-l content-form-md">
                <form method="post" onSubmit={handleSubmit}>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Name</label><Input required className="input-form" placeholder="Name"  name="name" value={inputGame.name} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Genre</label><Input required className="input-form" placeholder="Genre" name="genre" value={inputGame.genre} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Release</label><Input required type="number" min={2000} max={2021} placeholder="Release" name="release" className="input-form" value={inputGame.release} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Platform</label><Input required type="text" placeholder="Platform" name="platform" className="input-form" value={inputGame.platform} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Image URL</label><Input required className="input-form" placeholder="Image URL" name="image_url" value={inputGame.image_url} onChange={handleChange}/><br/>
                    <div style={{marginTop:'10px'}}>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Player</label> 
                        <input type="checkbox" name="singlePlayer" checked={inputGame.singlePlayer == 1 ? true : false} onChange={handleChange}/><label className="label-checkbox label-checkbox-md">SinglePlayer</label>
                        <input type="checkbox" name="multiplayer" checked={inputGame.multiplayer == 1 ? true : false} onChange={handleChange}/><label className="label-checkbox label-checkbox-md">MultiPlayer</label><br/><br/>
                    </div >
                    <div style={{ marginLeft:'100px'}}>
                        <Button style={{marginRight:'10px'}}><Link to="/gamelist">Back</Link></Button>
                        <Button htmlType="submit" ghost>Submit</Button>
                    </div>
                </form>
            </div>         
        </Card>
        </>
    )
}

export default GameForm



