import React, {useEffect, useContext } from 'react';
import "../assets/css/style.css"
import { MovieGameContext} from '../context/moviegamecontext';
import {Card,Col,Row,Rate,Button,Statistic,Typography } from 'antd';
import CarouselComponent from '../layout/carousel';
import {VideoCameraOutlined,PlayCircleOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import Cookies from 'js-cookie';


const { Meta } = Card;
const { Title,Paragraph } = Typography;

const Home = () => { 
    const {daftarMovie,daftarGames,setDaftarMovie,setDaftarGames,fetchStatus,setFetchStatus,functions} = useContext(MovieGameContext)
    const{fetchDataContext} = functions
    let history = useHistory();

    useEffect(()=>{
        const fetchMovie = async ()=>{
            let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-movie`);
            const dataMovie = result.data;
            setDaftarMovie(dataMovie.map((item,index)=>{
                return {
                    index:index+1,
                    id:item.id,
                    description:item.description,
                    duration: item.duration,
                    genre: item.genre,
                    image_url: item.image_url,
                    rating: item.rating,
                    review: item.review,
                    title: item.title,
                    year: item.year
                }
            }) )
        }

        const fetchGames = async ()=>{
            let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-game`);
            const dataGames = result.data;
            setDaftarGames(dataGames.map((item,index)=>{
                return {
                    index:index+1,
                    id:item.id,
                    genre: item.genre,
                    image_url: item.image_url,
                    singlePlayer: item.singlePlayer,
                    multiplayer: item.multiplayer,
                    name: item.name,
                    platform: item.platform,
                    release: item.release
                }
            }) )
        }

        if(fetchStatus){
            fetchMovie();
            setFetchStatus(false);
        }

        if(fetchStatus){
            fetchGames();
            setFetchStatus(false);
        }

    },[fetchStatus,setFetchStatus])
    
    const handleDetailShowMovie = (event)=>{
        let idMovie = parseInt(event.currentTarget.value);
        history.push(`/detailmovie/${idMovie}`)
    }

    const handleDetailShowGames = (event)=>{
        let idGame = parseInt(event.currentTarget.value);
        history.push(`/detailgame/${idGame}`)
    }

    return (
        <>
            <div className="content-homeadmin content-homeadmin-xxl content-homeadmin-xl content-homeadmin-md">
                <Row>
                    <Col span={12}>
                        <Card className="card-statistic">
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Movie"  className="static-movie" value={daftarMovie.length} style={{fontSize:'40pt'}}/>
                                </Col>
                                <Col span={12}>
                                    <VideoCameraOutlined style={{color:'white', fontSize:'100pt', paddingTop:'50px'}}/>
                                </Col>
                            </Row>
                         
                            
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="card-statistic">
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Games" value={daftarGames.length} precision={2} />
                                </Col>
                                <Col span={12}>
                                    <PlayCircleOutlined style={{color:'white', fontSize:'100pt', paddingTop:'50px'}}/>
                                </Col>
                            </Row>
                           
                        </Card>
                    </Col>
                </Row>
                <Card className="card-welcome-admin" style={{marginTop:'20px',padding:'10px'}}>
                    <Row>
                        <Col className="col-welcome-admin col-welcome-admin-xxl col-welcome-admin-l col-welcome-admin-md">
                            <span style={{margin:'auto'}}> <VideoCameraOutlined style={{color:'white', fontSize:'100pt', paddingTop:'50px',marginRight:'20px'}}/><PlayCircleOutlined style={{color:'white', fontSize:'100pt', paddingTop:'50px'}}/>  </span>
                        </Col>
                        <Col span={12}>
                            <Title style={{color:'white'}}>Welcome,{Cookies.get('name')}!</Title>
                            <Paragraph style={{color:'white', fontSize:'14pt'}}>
                                This is the admin page. Here, you can process movie data and game data. You can enter data, change data, and even delete data.
                            </Paragraph>          
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default Home



