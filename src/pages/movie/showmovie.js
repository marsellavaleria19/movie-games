import React, {useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import {Card,Col,Row,Rate,Button} from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import {useHistory,Link} from "react-router-dom";

const { Meta } = Card;

const CardComponent = (props)=>{
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

const ShowMovie = () => { 
    const {daftarMovie,setDaftarMovie,fetchStatusMovie,setFetchStatusMovie,functions} = useContext(MovieGameContext)
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

        if(fetchStatusMovie){
            fetchMovie();
            setFetchStatusMovie(false);
        }
    
    },[fetchStatusMovie,setFetchStatusMovie])
    

    const handleText = (text,num) =>{
        if(text === null){
            return ""
        }else{
            return text.slice(text,num)+"..."
        }
    }

    return (
        <>
            <div className="content-homepage content-homepage-xl-6 content-homepage-l-9 content-homepage-md-10">
                <Card title="List Movie" headStyle={{color:'white', fontSize:'20pt'}} className="card-show-movie-game-list">
                   {/* <div className="container-show-movie-game"> */}
                   <Row gutter={16}>
                        {
                            daftarMovie!==null && (
                                <>
                                    {
                                        daftarMovie.map((e,index)=>{
                                            return<Col span={8}><CardComponent key={index} classStyle="card-show-movie" key={index} image={e.image_url} title={e.title} description={handleText(e.description,150)} rating={e.rating} duration={e.duration} id={e.id} /></Col>
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

export default ShowMovie



