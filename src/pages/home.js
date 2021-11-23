import React, {useEffect, useContext } from 'react';
import "../assets/css/style.css"
import { MovieGameContext} from '../context/moviegamecontext';
import {Card,Col,Row,Rate,Button} from 'antd';
import CarouselComponent from '../layout/carousel';
import { FieldTimeOutlined } from '@ant-design/icons';
import {useHistory,Link} from "react-router-dom";

const { Meta } = Card;

const CardComponentMovie = (props)=>{
    return (
        <>
            <Link to={`/detailmovie/${props.id}`}>
                <Card hoverable className={props.classStyle} cover={<img alt="example" src={props.image} className="card-show-image"/>}>
                    <Meta title={props.title} description={props.description}/><br/>
                    <Row>
                        <Col span={12}>
                            <Rate style={{fontSize:'10pt' , marginRight:'5px'}} value="1" count="1"/><span style={{fontSize:'9pt'}}>{props.rating}/10</span>
                        </Col>
                        <Col span={12}>
                            <div style={{marginTop:'4px',textAlign:'right'}}>
                                <span style={{fontSize:'9pt', marginRight:'5px', paddingTop:'5px'}}><FieldTimeOutlined/></span>
                                <span style={{fontSize:'9pt', marginTop:'10px'}}>{props.duration} min</span>
                            </div>
                        </Col>
                    </Row> 
                </Card>
            </Link>
        </>
    )
}

const CardComponentGames = (props)=>{
    return (
        <>
            <Link to={`/detailgame/${props.id}`}>
                <Card hoverable className={props.classStyle} cover={<img alt="example" src={props.image} className="card-show-image"/>}>
                    <Meta title={props.title}/><br/>
                    Genre :{props.genre}<br/>
                    Release : {props.release}<br/>
                    Platform : {props.platform}<br/> 
                </Card>
            </Link>
        </>
    )
}

const Home = () => { 
    const {daftarMovie,daftarGames,setDaftarMovie,setDaftarGames,fetchStatusMovie,setFetchStatusMovie,fetchStatusGame,setFetchStatusGame,functions} = useContext(MovieGameContext)
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

        if(fetchStatusMovie){
            fetchMovie();
            setFetchStatusMovie(false);
        }

        if(fetchStatusGame){
            fetchGames();
            setFetchStatusGame(false);
        }

    },[])
    
    const handleText = (text,num) =>{
        if(text === null){
            return ""
        }else{
            return text.slice(text,num)+"..."
        }
    }

    return (
        <>
            <div className="content-homepage content-homepage-xxl-6 content-homepage-xl-7 content-homepage-l-8 content-homepage-md-9">
                <CarouselComponent/>
                <Card title="Movies" headStyle={{color:'white', fontSize:'20pt'}} className="card-show-movie-game" extra={<Link style={{color:'white'}} to ="/movie">View More</Link>}>
                   {/* <div className="container-show-movie-game"> */}
                   <Row gutter={16}>
                        {
                            daftarMovie!==null && (
                                <>
                                    {
                                        daftarMovie.filter((e,index)=>{
                                            return index<3
                                        }).map((e,index)=>{
                                            return<Col span={8}><CardComponentMovie classStyle="card-show-movie" key={index} image={e.image_url} title={e.title} description={handleText(e.description,150)} rating={e.rating} duration={e.duration} id={e.id} /></Col>
                                        })
                                    }
                                </>
                            )
                        }
                    </Row>
                    {/* </div> */}
                </Card>
                <Card title="Games" headStyle={{color:'white', fontSize:'20pt'}}className="card-show-movie-game" extra={<Link style={{color:'white'}} to="/game">View More</Link>}>
                   {/* <div className="container-show-movie-game"> */}
                    <Row gutter={16}>    
                        {
                            daftarGames!==null && (
                                <>
                                    {
                                        daftarGames.filter((e,index)=>{
                                            return index<3
                                        }).map((e,index)=>{
                                            return<Col span={8}> <CardComponentGames key={index} classStyle="card-show-game" image={e.image_url} title={e.name} genre={e.genre} platform={e.platform} release={e.release} id={e.id} /></Col>
                                        })
                                    }
                                </>
                            )
                        }
                    </Row>
                    {/* </div> */}
                </Card>
            </div>
        </>
    )
}

export default Home



