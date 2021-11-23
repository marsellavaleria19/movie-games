import React from 'react';
import "../assets/css/style.css"
import { Layout, Carousel } from 'antd';
import slider1 from "../assets/img/slider1.jpg"
import slider2 from "../assets/img/slider2.jpg"
import slider3 from "../assets/img/slider3.jpeg"
import slider4 from "../assets/img/slider4.jpg"

const { Header, Content, Footer } = Layout;

const CarouselComponent = () => {
    return ( 
        <>
           <Carousel dotPosition="bottom" className="carousel" autoplay>
                <div>
                <img src={slider1} className="carousel-img" media alt=""/> 
                </div>
                <div>
                <img src={slider2} className="carousel-img" alt=""/> 
                </div>
                <div>
                <img src={slider3} className="carousel-img" alt=""/> 
                </div>
                <div>
                <img src={slider4} className="carousel-img" alt=""/> 
                </div>
            </Carousel>
        </>
    )
}

export default CarouselComponent