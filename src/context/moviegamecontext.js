import React, {createContext,useState } from "react"
import axios from "axios";
import { useHistory} from "react-router-dom";
import Cookies from "js-cookie";

export const MovieGameContext = createContext();

export const MovieGameProvider = props => {

    const [daftarMovie,setDaftarMovie] = useState([]);
    const [daftarMovieSearch,setDaftarMovieSearch] = useState([]);
    const [daftarGames,setDaftarGames] = useState([]);
    const [daftarGamesSearch,setDaftarGamesSearch] = useState([]);
    const [inputMovie,setInputMovie] = useState({
        description:"",
        duration: "",
        genre: "",
        image_url: "",
        rating: "",
        review: "",
        title: "",
        year: 0
    });
  
    const [inputGame,setInputGame] = useState({
        genre: "",
        image_url: "",
        singlePlayer: true,
        multiplayer: true,
        name: "",
        platform: "",
        release: ""
    });

    const [selectedShowMovie,setSelectedShowMovie] = useState({
        id:0,
        description:"",
        duration: "",
        genre: "",
        image_url: "",
        rating: "",
        review: "",
        title: "",
        year: 0
    });
    const [selectedShowGame,setSelectedShowGame] = useState({
        id:0,
        genre: "",
        image_url: "",
        singlePlayer: 1,
        multiplayer: 1,
        name: "",
        platform: "",
        release: ""
    });
    
    const [inputUser,setInputUser] = useState({
       name:"",
       email:"",
       password:""
    });
    const [fetchStatusMovie,setFetchStatusMovie] = useState(true);
    const [fetchStatusMovieSearch,setFetchStatusMovieSearch] = useState(true);
    const [fetchStatusGame,setFetchStatusGame] = useState(true);
    const [fetchStatusGameSeach,setFetchStatusGameSearch] = useState(true);
    const [currentIdMovie,setCurrentIdMovie] = useState(null);
    const [currentIdGame,setCurrentIdGame] = useState(null);
   
    const fetchDataContext = async (url) =>{
        let result = axios.get(url);
        return result;
    }

    const functionSubmit = (category)=>{
        if(category=="movie"){
            const {description,duration,genre,image_url,
                rating,review,title,year} = inputMovie;
                console.log(inputMovie)
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`,{
                description,duration,genre,image_url,
                rating,review,title,year},{headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
                .then(res=>{
                   setFetchStatusMovie(true)
                })
        }
        else{
            const { genre,image_url,singlePlayer,multiplayer,name,platform,release} = inputGame;
            axios.post(`https://backendexample.sanbersy.com/api/data-game`,{
                genre,image_url,singlePlayer,multiplayer,name,platform,release},{headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
                .then(res=>{
                   setFetchStatusGame(true)
            })
        }         
    }

    const functionEdit = (id,category)=>{
        if(category=="movie"){
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(item=>{
                let data = item.data;
          
                const {description,duration,genre,image_url,
                    rating,review,title,year} = data;
               
                setInputMovie({description,duration,genre,image_url,rating,review,title,year})
                setCurrentIdMovie(id);
            })
        }
        else{
            axios.get(` https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(item=>{
                let data = item.data;
          
                const {genre,image_url,singlePlayer,multiplayer,name,platform,release} = data;
                setInputGame({genre,image_url,singlePlayer,multiplayer,name,platform,release})
                setCurrentIdGame(id);
            }) 
        }
    }

    const functionDelete = (id,category)=>{
        if(category=='movie'){
            axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`,{headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
            .then(()=>{
                let newDataMovie = daftarMovie.filter(item=>{
                    return item.id !== id
                })
                setDaftarMovie(newDataMovie)
            })
        }
        else{
            axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`,{headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
            .then(()=>{
                let newDataGames = daftarGames.filter(item=>{
                    return item.id !== id
                })
                setDaftarGames(newDataGames)
            }) 
        }
    }

    const functionUpdate = (category)=>{
        if(category=='movie'){
            const {description,duration,genre,image_url,rating,review,title,year} = inputMovie;
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${currentIdMovie}`,{description,duration,genre,image_url,rating,review,title,year},
                        {headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
            .then(()=>{
                setFetchStatusMovie(true);
            })
        }
        else{
            const {genre,image_url,singlePlayer,multiplayer,name,platform,release} = inputGame;
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${currentIdGame}`,{genre,image_url,singlePlayer,multiplayer,name,platform,release},
            {headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
            .then(()=>{
                setFetchStatusGame(true);
            })
        }
    }
   
    const functionDetailShow = (id,category)=>{
        if(category=='movie'){
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(item=>{
                let data = item.data;
                const { id,description,duration,genre,image_url,rating,review,title,year} = data;
                setSelectedShowMovie({id,description,duration,genre,image_url,rating,review,title,year})
            })
        }
        if(category=='games'){
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(item=>{
                let data = item.data;
                const {id,genre,image_url,singlePlayer,multiplayer,name,platform, release} = data;
                setSelectedShowGame({id,genre,image_url,singlePlayer,multiplayer,name,platform, release})
            }) 
        }  
    }

    const functions = {
        fetchDataContext,
        // lastestMovieGames,
        functionDetailShow,
        functionSubmit,
        functionEdit,
        functionUpdate,
        functionDelete
    }

    return (
    <MovieGameContext.Provider value={{
        daftarMovie, 
        setDaftarMovie,
        daftarMovieSearch, 
        setDaftarMovieSearch,
        daftarGames,
        setDaftarGames,
        daftarGamesSearch,
        setDaftarGamesSearch,
        selectedShowMovie,
        setSelectedShowMovie,
        selectedShowGame,
        setSelectedShowGame,
        inputUser,
        setInputUser,
        inputMovie,
        setInputMovie,
        inputGame,
        setInputGame,
        fetchStatusMovie,
        setFetchStatusMovie,
        fetchStatusMovieSearch,
        setFetchStatusMovieSearch,
        fetchStatusGame,
        setFetchStatusGame,
        fetchStatusGameSeach,
        setFetchStatusGameSearch,
        currentIdMovie,
        setCurrentIdMovie,
        currentIdGame,
        setCurrentIdGame,
        functions

    }}>
      {props.children}
    </MovieGameContext.Provider>
  );
};