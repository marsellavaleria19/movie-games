import React, {useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import {Card,Row,Col,Button} from 'antd';
import {useHistory,Link} from "react-router-dom";

const { Meta } = Card;

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

const ShowGame = () => { 
    const {daftarGames,setDaftarGames,fetchStatusGame,setFetchStatusGame,functions} = useContext(MovieGameContext)
    const{fetchDataContext} = functions
    let history = useHistory();

    useEffect(()=>{
        
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
            }))
        }

        if(fetchStatusGame){
            fetchGames();
            setFetchStatusGame(false);
        }

    },[fetchStatusGame,setFetchStatusGame])
    
    return (
        <>
            <div className="content-homepage content-homepage-xl-6 content-homepage-l-9 content-homepage-md-10">
                <Card title="List Game" headStyle={{color:'white', fontSize:'20pt'}} className="card-show-movie-game-list">
                   {/* <div className="container-show-movie-game"> */}
                   <Row gutter={16}>
                        {
                            daftarGames!==null && (
                                <>
                                    {
                                        daftarGames.map((e,index)=>{
                                            return<Col span={8}><CardComponentGames key={index} classStyle="card-show-game" image={e.image_url} title={e.name} genre={e.genre} platform={e.platform} release={e.release} id={e.id} /></Col>
                                        })
                                    }
                                </>
                            )
                        }
                    {/* </div> */}
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default ShowGame



