import React, {useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import {useParams} from "react-router-dom";
import { FieldTimeOutlined } from '@ant-design/icons';
import {Card,Col,Row,Image,Badge,Descriptions,Tag} from 'antd';


const DetailShowGame = () => { 
    const {selectedShowGame,functions} = useContext(MovieGameContext)
    const{functionDetailShow} = functions
    let {id} = useParams();

    useEffect(()=>{
       functionDetailShow(id,'games');
    },[])
      
    return (
        <>
            <div className="content-homepage content-homepage-xl-6 content-homepage-l-10 content-homepage-md-11">
                <Card title="Detail Game" headStyle={{color:'white', fontSize:'20pt'}} className="card-show-detail">
                <div className="container-show-detail">
                       <div>
                            <Image src={selectedShowGame.image_url} alt={selectedShowGame.image_url} width="90%" height="500px"/><br/>
                        </div>
                        <div className="content-table-show-detail">
                            <table>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>{selectedShowGame.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Genre</b></td>
                                    <td>{selectedShowGame.genre}</td>
                                </tr>
                                <tr>
                                    <td><b>Release</b></td>
                                    <td>{selectedShowGame.release}</td>
                                </tr>
                                <tr>
                                    <td><b>Platform</b></td>
                                    <td>{selectedShowGame.platform}</td>
                                </tr>
                                <tr>
                                    <td><b>Player</b></td>
                                    <td>
                                        { selectedShowGame.singlePlayer==1 ? <Tag color="#f50">Single Player</Tag> : ""}
                                        {selectedShowGame.multiPlayer==1 ? <Tag color="#108ee9">Multi Player</Tag> : "" }
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DetailShowGame



