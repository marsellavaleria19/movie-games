import React, { useState,useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import { useHistory,useParams} from "react-router-dom";
import { Table,Button,Card,message,Input} from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

const {Search} = Input;
const MovieListSearch = () => { 
    let {valueSearch} = useParams();
    const {daftarMovie,setDaftarMovie,setInputMovie,fetchStatusMovie,setFetchStatusMovie,functions} = useContext(MovieGameContext)
    const{fetchDataContext,functionDelete} = functions
    let history = useHistory();
    
    useEffect(()=>{
      const fetchMovieSeach = async ()=>{
        let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-movie`);
        const dataMovie = result.data;
        
        let filterData = dataMovie.filter((e)=>{
            return Object.values(e).join("").toLowerCase().includes(valueSearch.toLowerCase())
        })
        setDaftarMovie([...filterData]);
      }
        if(fetchStatusMovie){
            fetchMovieSeach();
            setFetchStatusMovie(false);
        }
    },[fetchStatusMovie,setFetchStatusMovie])

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            className:'table-column',
            sorter: (no1, no2) => no1.index - no2.index
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            className:'table-column',
            render: image_url=> ( <img src={image_url} style={{ height: '300px',width:'200px'}} /> )
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          className:'table-column',
          sorter: (title1, title2) => title1.title - title2.title,
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          className:'table-column'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          className:'table-column',
          key: 'description',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            className:'table-column',
            sorter: (rating1, rating2) => rating1.rating - rating2.rating
        },
        {
            title: 'Duration (min)',
            dataIndex: 'duration',
            key: 'duration',
            className:'table-column',
            sorter: (duration1, duration2) => duration1.duration - duration2.duration
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            className:'table-column',
            sorter: (year1, year2) => year1.year - year2.year
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            className:'table-column'
        },
        {
          title: 'Action',
          key: 'action',
          className:'table-column',
          render: (value, index) => (
            <div key={index}>
                  <Button style={{ backgroundColor:'transparent', border:'none', color:"white", marginRight:"10px"}} onClick={handleEdit} value={value.id}><EditOutlined /></Button>
                  <Button style={{ backgroundColor:'transparent', border:'none', color:"white"}} value={value.id} onClick={handleDelete}><DeleteOutlined /></Button>
            </div>
          ),
        },
      ];
      
      const data = [...daftarMovie];

      const handleEdit = (event)=>{    
        let idMovie = parseInt(event.currentTarget.value);
        history.push(`/movielist/edit/${idMovie}`)
        setInputMovie({
          description:"",
          duration: "",
          genre: "",
          image_url: "",
          rating: "",
          review: "",
          title: "",
          year: 0})
      }

      const handleSearch = (valueSearch)=>{    
        history.push(`/movielist/search/${valueSearch}`)
      }
 
     const handleDelete = (event)=>{
        let idMovie = parseInt(event.currentTarget.value);
        functionDelete(idMovie,'movie')
        message.success('Data Terhapus'); 
    }
      
    return (
        <>
        <Card className="card-data-admin" title="Data Movie" headStyle={{color:'white', fontSize:'20pt'}} extra={<Search placeholder="Search" onSearch={handleSearch} style={{ width: 200 }} />}>
            <Table className="table" columns={columns} dataSource={data} pagination={{className:"pagination"}} />     
        </Card>
        </>
    )
}

export default MovieListSearch



