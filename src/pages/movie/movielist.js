import React, { useState,useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import { useHistory} from "react-router-dom";
import { Table,Button,Card,message,Input,Collapse,Col,Row} from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

const {Search} = Input;
const { Panel } = Collapse;
const MovieList = () => { 
    
    const {daftarMovie,setDaftarMovie,setInputMovie,fetchStatusMovie,setFetchStatusMovie,functions} = useContext(MovieGameContext)
    const{fetchDataContext,functionDelete} = functions
    const[fetchStatusSearchMovie,setFetchStatusSearchMovie] = useState(true);
    const [filter,setFilter] = useState({genre:"",duration: "",year: 0});
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
        }))
      }
        if(fetchStatusMovie){
            fetchMovie();
            setFetchStatusMovie(false);
        }
        else{
            if(fetchStatusSearchMovie){
              setFetchStatusMovie(true);
              setFetchStatusSearchMovie(false);
            }
        }

        
    },[fetchStatusMovie,setFetchStatusMovie])

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            className:'table-column',
            sorter: (no1, no2) => no1.index - no2.index,
            fixed:true,
            width:50
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            className:'table-column',
            fixed:true,
            width:210,
            render: image_url=> ( <img src={image_url} style={{ height: '300px',width:'200px'}} /> )
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          className:'table-column',
          sorter: (title1, title2) => title1.title - title2.title,
          fixed:true,
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
          width:250,
          key: 'description'
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
            width:100,
            className:'table-column',
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

        const fetchMovieSeach = async ()=>{
          let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-movie`);
          const dataMovie = result.data;
          
            let filterData = dataMovie.filter((e)=>{
              return Object.values(e).join("").toLowerCase().includes(valueSearch.toLowerCase())
            })
            setDaftarMovie(filterData.map((item,index)=>{
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
            }))
            setFetchStatusSearchMovie(true);
          }
          fetchMovieSeach();
      }
 
     const handleDelete = (event)=>{
        let idMovie = parseInt(event.currentTarget.value);
        functionDelete(idMovie,'movie')
        message.success('Data Terhapus'); 
      }
    
    const handleChangeFilter = (e)=>{
      let value = e.target.value;
      let name = e.target.name;
      setFilter({...filter,[name]:value})
    }

    const handleSubmitFilter = (e)=>{
      e.preventDefault();
      console.log(filter);
      let fetchFilter = async() =>{
        let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-movie`);
        const dataMovie = result.data;
        console.log(dataMovie)
        let filterData = dataMovie.filter((e)=>{
          return e.year == filter.year || e.duration == filter.duration || e.genre === filter.genre
        })
        // console.log(filterData)
        setDaftarMovie(filterData.map((item,index)=>{
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
        }))
        setFetchStatusSearchMovie(true);
      }
      fetchFilter();
    }

    const handleReset=()=>{
      if(fetchStatusMovie===false)
      setFetchStatusMovie(true);
      setFilter({
        genre:"",duration: 0,year: 0
      })
    }
      
    return (
        <> 
        <Card className="card-data-admin" title="Data Movie" headStyle={{color:'white', fontSize:'20pt'}} extra={
          <div className="content-head-card">
            <Collapse className="collapse-admin">
              <Panel header="Filter" key="1">
                <div className="content-form-collapse">
                  <form onSubmit={handleSubmitFilter}>
                      <label> Genre : </label><Input className="input-form" required value={filter.genre} name="genre" onChange={handleChangeFilter} placeholder="genre"/><br/>
                      <label> Duration : </label><Input type="number" required min={0} value={filter.duration} name="duration" className="input-form" placeholder="duration" onChange={handleChangeFilter}/><br/>
                      <label> Year : </label><Input type="number" required min={1980} max={2021} value={filter.year} name="year" className="input-form" placeholder="year" onChange={handleChangeFilter}/><br/><br/>
                      <div style={{ marginLeft:'100px'}}>
                          <Button style={{marginRight:'10px'}} onClick={handleReset}>Reset</Button>
                          <Button htmlType="submit" ghost>Submit</Button>
                      </div>
                    </form>
                  </div>
              </Panel>
            </Collapse>  
            <Search placeholder="Search" allowClear onSearch={handleSearch} style={{ width: 200}} />
          </div>}>
          <div className="content-table">
            <Table className="table" columns={columns} dataSource={data} size="middle"
    scroll={{ x: 'calc(700px + 50%)' }} pagination={{className:"pagination"}} />             
          </div>
        </Card>
        </>
    )
}

export default MovieList



