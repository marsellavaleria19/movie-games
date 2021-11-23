import React, { useState,useEffect, useContext } from 'react';
import "../../assets/css/style.css"
import { MovieGameContext} from '../../context/moviegamecontext';
import { Table,Button, Space,message,Card,Input,Collapse } from 'antd';
import { useHistory} from "react-router-dom";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';


const {Search} = Input;
const {Panel} = Collapse;
const GameList = () => { 
 
    const {daftarGames,setDaftarGames,setInputGame,fetchStatusGame,setFetchStatusGame,functions} = useContext(MovieGameContext)
    const{fetchDataContext,functionDelete} = functions
    const[fetchStatusSearchGame,setFetchStatusSearchGame] = useState(true);
    const [filter,setFilter] = useState({genre:"",release: 0,platform: ""});
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
      }else{
        if(fetchStatusSearchGame){
          setFetchStatusGame(true);
          setFetchStatusSearchGame(false);
        }
      }

   
       
    },[fetchStatusGame,setFetchStatusGame])

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            className:'table-column',
            responsive : ["sm"],
            fixed:true,
            sorter: (no1, no2) => no1.index - no2.index,
            width:50
        
          },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            className:'table-column',
            responsive : ["sm"],
            fixed:true,
            width:210,
            render: image_url=> ( <img src={image_url} style={{ height: '300px',width:'200px'}} /> )
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          className:'table-column',
          responsive : ["sm"],
          fixed:true,
          sorter: (title1, title2) => title1.title - title2.title,
        },
        {
          title: 'Platform',
          dataIndex: 'platform',
          key: 'platform',
          className:'table-column',
          responsive : ["sm"],
          sorter: (platform1, platform2) => platform1.platform - platform2.platform,
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          className:'table-column',
          key: 'genre',
          responsive : ["sm"],
          sorter: (genre1, genre2) => genre1.platform - genre2.platform
        },

        {
            title: 'Release',
            dataIndex: 'release',
            key: 'release',
            className:'table-column',
            responsive : ["sm"],
            sorter: (release1, release2) => release1.release - release2.release
        },
        {
            title: 'Single Player',
            dataIndex: 'singlePlayer',
            key: 'singlePlayer',
            className:'table-column',
            responsive : ["sm"],
            sorter: (singlePlayer1, singlePlayer2) => singlePlayer1.singlePlayer - singlePlayer2.singlePlayer,
            render : (item) =>{
              return item ==1 ? 'Yes' : 'No'
            }
        },
        {
          title: 'Multi Player',
          dataIndex: 'multiplayer',
          key: 'multiplayer',
          className:'table-column',
          responsive : ["sm"],
          sorter: (singlePlayer1, singlePlayer2) => singlePlayer1.singlePlayer - singlePlayer2.singlePlayer,
          render:(item)=>{
            return item ==1 ? 'Yes' : 'No'
          }
      },
      {
          title: 'Action',
          key: 'action',
          className:'table-column',
          responsive : ["sm"],
          render: (value, index) => (
            <div key={index}>
                  <Button style={{ backgroundColor:'transparent', border:'none', color:"white", marginRight:"2px"}} onClick={handleEdit} value={value.id}><EditOutlined /></Button>
                  <Button style={{ backgroundColor:'transparent', border:'none', color:"white"}} onClick={handleDelete} value={value.id}><DeleteOutlined /></Button>
            </div>
          ),
        },
      ];
      
      const data = [...daftarGames];

      const handleEdit = (event)=>{    
        let idGames = parseInt(event.currentTarget.value);
        history.push(`/gamelist/edit/${idGames}`)
        setInputGame({
          genre: "",
          image_url: "",
          singlePlayer: 1,
          multiplayer: 1,
          name: "",
          platform: "",
          release: 0})
      }

       const handleSearch = (valueSearch)=>{
        const fetchSearch = async()=>{
            let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-game`);
            const dataGames = result.data;
            let filterData = dataGames.filter((e)=>{
                return Object.values(e).join("").toLowerCase().includes(valueSearch.toLowerCase())
            })
            setDaftarGames(filterData.map((item,index)=>{
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
          setFetchStatusSearchGame(true);
        }
        fetchSearch();
     
      }
 
     const handleDelete = (event)=>{
        let idGames = parseInt(event.currentTarget.value);
        functionDelete(idGames,'games')
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
        let result = await fetchDataContext(`https://backendexample.sanbersy.com/api/data-game`);
        const dataGame = result.data;
        let filterData = dataGame.filter((e)=>{
          return e.release == filter.release || e.platform == filter.platform || e.genre === filter.genre
        })
        setDaftarGames(filterData.map((item,index)=>{
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
        setFetchStatusSearchGame(true);
      }
      fetchFilter();
    }

    const handleReset=()=>{
      if(fetchStatusGame===false)
      setFetchStatusGame(true);
      setFilter({
          genre:"",release: 0,platform: ""
      })
    }
      
    return (
        <>
         <Card className="card-data-admin" title="Data Games" headStyle={{color:'white', fontSize:'20pt'}}  extra={
            <div className="content-head-card">
              <Collapse className="collapse-admin">
                <Panel header="Filter" key="1">
                  <div className="content-form-collapse">
                    <form onSubmit={handleSubmitFilter}>
                        <label> Genre : </label><Input className="input-form" value={filter.genre} name="genre" onChange={handleChangeFilter} placeholder="genre" required /><br/>
                        <label> Release : </label><Input type="number" value={filter.release} name="release" className="input-form" placeholder="release" required onChange={handleChangeFilter}/><br/>
                        <label> Platform : </label><Input value={filter.platform} name="platform" className="input-form" placeholder="platform" required onChange={handleChangeFilter}/><br/><br/>
                        <div style={{ marginLeft:'100px'}}>
                            <Button style={{marginRight:'10px'}} onClick={handleReset}>Reset</Button>
                            <Button htmlType="submit" ghost>Submit</Button>
                        </div>
                      </form>
                    </div>
                </Panel>
              </Collapse>  
              <Search placeholder="Search" allowClear onSearch={handleSearch} style={{ width: 200}} />
            </div>
            }>
             <div className="content-table">
              <Table className="table" columns={columns} dataSource={data} size="middle"
                scroll={{ x: 'calc(700px + 50%)' }} pagination={{className:"pagination"}} />             
          </div>    
        </Card>
        </>
    )
}

export default GameList



