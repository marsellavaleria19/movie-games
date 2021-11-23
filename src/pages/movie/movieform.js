import React, { useState,useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import { Button,message,Card,Input} from 'antd';
import { useHistory,useParams,Link} from "react-router-dom";

const MovieForm = () => { 
    
    const {TextArea} = Input;
    
    let history = useHistory();
    let {id} = useParams();
    const {inputMovie,setInputMovie,currentIdMovie,setCurrentIdMovie,setFetchMovie,functions} = useContext(MovieGameContext);
    const {functionSubmit,functionEdit,functionUpdate} = functions

    useEffect(()=>{
        if(id!==null){
            functionEdit(id,'movie');
        }
    
     },[])

    const handleChange = (event)=>{
        let value = event.target.value;
        let nameOfInput = event.target.name;
        
        setInputMovie({...inputMovie,[nameOfInput]:value});
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        // console.log("aaaaaa")
        if(currentIdMovie===null){
            functionSubmit('movie');
            message.success('Data added successfully!'); 
                 
        }
        else{
            functionUpdate('movie');
            message.success('Data changed successfully!');    
        }
        
        history.push("/movielist");
        setInputMovie({ name:"",
        description:"",
        duration: "",
        genre: "",
        image_url: "",
        rating: "",
        review: "",
        title: "",
        year: 0})

        setCurrentIdMovie(null);
    }

  

    return (
        <>
        <Card className="card-data-form-admin" title="Form Movie" headStyle={{color:'white', fontSize:'20pt'}}>
            <div className="content-form  content-form-xxl  content-form-xl content-form-l content-form-md">
                <form method="post" onSubmit={handleSubmit}>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Title</label><Input required className="input-form" placeholder="Title" name="title" value={inputMovie.title} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Genre</label><Input required className="input-form" placeholder="Genre" name="genre" value={inputMovie.genre} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Year</label><Input required type="number" min={1980} max={2021} className="input-form"  placeholder="Genre" name="year" value={inputMovie.year} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Duration</label><Input type="number" required min={0} className="input-form" placeholder="Duration" name="duration" value={inputMovie.duration} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Rating</label><Input type="number" required min={0} max={10} className="input-form" placeholder="Rating" name="rating" value={inputMovie.rating} onChange={handleChange}/><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Description</label><TextArea required className="ant-input-text-area input-form" placeholder="Description" value={inputMovie.description} name="description" onChange={handleChange} /><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Review</label><TextArea required className="ant-input-text-area input-form" placeholder="Review" name="review" value={inputMovie.review} onChange={handleChange} /><br/>
                    <label className="content-form-label content-form-label-xxl content-form-label-xl content-form-label-l content-form-label-md">Image URL</label><Input required className="input-form" placeholder="Image URL" name="image_url" value={inputMovie.image_url} onChange={handleChange}/><br/>
                    <div style={{ marginLeft:'100px'}}>
                        <Button style={{marginRight:'10px'}}><Link to="/movielist">Back</Link></Button>
                        <Button htmlType="submit" ghost>Submit</Button>
                    </div>
                </form>
            </div>         
        </Card>
        </>
    )
}

export default MovieForm



