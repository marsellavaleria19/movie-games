import React from "react";
import { Switch, Route, BrowserRouter as Router, Link,Redirect } from "react-router-dom";
import { Layout } from "antd";
import LayoutComponent from "../layout/layout";
import DetailShowMovie from "../pages/movie/detailshowmovie";
import DetailShowGame from "../pages/games/detailshowgame";
import MovieList from "../pages/movie/movielist";
import MovieCreate from "../pages/movie/movieform";
import MovieEdit from "../pages/movie/movieform"
import GameList from "../pages/games/gamelist";
import GameCreate from "../pages/games/gameform"
import GameEdit from "../pages/games/gameform"
import ChangePassword from "../pages/password/changepassword"
import Home from "../pages/home"
import ShowMovie from "../pages/movie/showmovie";
import ShowGame from "../pages/games/showgame";
import Login from "../pages/login";
import Register from "../pages/register";
import Cookies from "js-cookie";
import HomeAdmin from "../pages/homeadmin";

const Routes = () => {
    const RouteLogin = ({...props})=>{
        if(Cookies.get('token') === undefined){
            return <Route {...props}/>
        }else if(Cookies.get(`token`)!==undefined){
            return <Redirect to="/home"/>
        }
    }

    const RouteAdmin = ({...props})=>{
        if(Cookies.get('token') !== undefined){
            return <Route {...props}/>
        }else if(Cookies.get(`token`)!==undefined){
            return <Redirect to="/login"/>
        }
    }

    return (
      
        <Router >
            <Layout className="content">
                <Switch >
                    <Route exact path = "/" >
                        <LayoutComponent content={<Home/>}/>
                    </Route>
                    <RouteAdmin exact path = "/home" >
                        <LayoutComponent content={<HomeAdmin/>}/>
                    </RouteAdmin>
                    <Route exact path="/detailmovie/:id" >
                        <LayoutComponent content={<DetailShowMovie/>}/>
                    </Route> 
                    <Route exact path="/detailgame/:id" >
                        <LayoutComponent content={<DetailShowGame/>}/>
                    </Route> 
                    <Route exact path="/movie" >
                        <LayoutComponent content={<ShowMovie/>}/>
                    </Route> 
                    <RouteAdmin exact path="/movielist" >
                        <LayoutComponent content={<MovieList/>}/>
                    </RouteAdmin> 
                    <RouteAdmin exact path="/movielist/create" >
                        <LayoutComponent content={<MovieCreate/>}/>
                    </RouteAdmin>
                    <RouteAdmin exact path="/movielist/edit/:id" >
                        <LayoutComponent content={<MovieEdit/>}/>
                    </RouteAdmin>
                    <Route exact path="/game" >
                        <LayoutComponent content={<ShowGame/>}/>
                    </Route>
                    <RouteAdmin exact path="/gamelist" >
                        <LayoutComponent content={<GameList/>}/>
                    </RouteAdmin>
                    <RouteAdmin exact path="/gamelist/create" >
                        <LayoutComponent content={<GameCreate/>}/>
                    </RouteAdmin>  
                    <RouteAdmin exact path="/gamelist/edit/:id" >
                        <LayoutComponent content={<GameEdit/>}/>
                    </RouteAdmin> 
                    <RouteAdmin exact path="/changepassword" >
                        <LayoutComponent content={<ChangePassword/>}/>
                    </RouteAdmin> 
                    <RouteLogin exact path="/login" >
                        <LayoutComponent content={<Login/>}/>
                    </RouteLogin>
                    <RouteLogin exact path="/register" >
                        <LayoutComponent content={<Register/>}/>
                    </RouteLogin>
                </Switch> 
            </Layout> 
         </Router >
    );
};

export default Routes;