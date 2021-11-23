import React, {useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import {useParams} from "react-router-dom";
import { FieldTimeOutlined } from '@ant-design/icons';
import {Card,Col,Row, Image,Rate,Descriptions,Divider,Comment,Avatar} from 'antd';


const DetailShowMovie = () => { 
    const {selectedShowMovie,functions} = useContext(MovieGameContext)
    const{functionDetailShow} = functions
    let {id} = useParams();

    useEffect(()=>{
       functionDetailShow(id,'movie');
    },[])
      
    return (
        <>
            <div className="content-homepage content-homepage-xl-7 content-homepage-l-9 content-homepage-md-11">
                <Card title="Detail Movie" headStyle={{color:'white', fontSize:'20pt'}} className="card-show-detail">
                    <div className="container-show-detail">
                       <div>
                            <Image src={selectedShowMovie.image_url} alt={selectedShowMovie.title} width="90%" height="500px"/><br/>
                        <Row>
                            <Col span={12}>
                                <Rate style={{fontSize:'20pt' , marginRight:'10px'}} value="1" count="1"/>
                                <span style={{fontSize:'14pt'}}><b>{selectedShowMovie.rating}/</b></span><span style={{fontSize:'12pt'}}>10</span>
                            </Col>
                            <Col span={12}>
                                <div style={{marginTop:'5px',marginRight:'50px'}}>
                                    <span style={{fontSize:'18pt', marginRight:'10px', paddingTop:'5px'}}><FieldTimeOutlined/></span>
                                    <span style={{fontSize:'14pt', marginTop:'5px'}}>{selectedShowMovie.duration} min</span>
                                </div>
                            </Col>
                        </Row>
                        </div>
                        <div className="content-table-show-detail">
                            <table>
                                <tr>
                                    <td><b>Title</b></td>
                                    <td>{selectedShowMovie.title}</td>
                                </tr>
                                <tr>
                                    <td><b>Genre</b></td>
                                    <td>{selectedShowMovie.genre}</td>
                                </tr>
                                <tr>
                                    <td><b>Year</b></td>
                                    <td>{selectedShowMovie.year}</td>
                                </tr>
                                <tr>
                                    <td><b>Description</b></td>
                                    <td>{selectedShowMovie.description}</td>
                                </tr>
                            </table>
                        </div>
                        {/* <Descriptions
                            bordered
                            column={{ xl: 1 }}
                            labelStyle = {{backgroundColor:'transparent', color:'white', fontWeight:'bold',marginLeft:'0px'}}
                            >
                                <Descriptions.Item label="Title">{selectedShowMovie.title}</Descriptions.Item>
                                <Descriptions.Item label="Genre">{selectedShowMovie.genre}</Descriptions.Item>
                                <Descriptions.Item label="Year">{selectedShowMovie.year}</Descriptions.Item>
                                <Descriptions.Item label="Description">{selectedShowMovie.description}</Descriptions.Item>
                            </Descriptions> */}
                    </div>
                   
                    <Divider style={{color:'white', border:'white'}}>Review</Divider>
                    <Card className="card-comment">
                    <Comment
                        author="User"
                        avatar={
                            <Avatar
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              alt="Han Solo"
                            />
                        }
                        content={
                            <p>
                             {selectedShowMovie.review}
                            </p>
                        }
                      />
                     </Card> 
                </Card>
            </div>
        </>
    )
}

export default DetailShowMovie



