import React from "react"
import { Layout, Menu} from 'antd';
import { Link,useHistory } from "react-router-dom";
import "../assets/css/style.css"
import Cookies from "js-cookie";
import logo from "../assets/img/logoMogams.png"

const { Header} = Layout;

const HeaderComponent=()=>{
  
  let history = useHistory();

  const handleLogout = ()=>{
      Cookies.remove('token');
      history.push('/login');
    }
    
  return (
    <Header className="navbar-header">
      {
          Cookies.get('token')===undefined ? <Link to ="/"><img src={logo} alt="logo" className="logo"/></Link> : null
      }
     
      <Menu className="navbar-menu" mode="horizontal">
        {
          Cookies.get('token')===undefined ? <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item> : <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
        }
        
        {
           Cookies.get('token')===undefined ?   <Menu.Item key="2"><Link to="/movie">Movie</Link></Menu.Item> :   <Menu.Item key="2"><Link to="/movielist">Movie</Link></Menu.Item>
        }

        {
          Cookies.get('token')===undefined ?   <Menu.Item key="3"><Link to="/game">Games</Link></Menu.Item> :   <Menu.Item key="3"><Link to="/gamelist">Games</Link></Menu.Item>
        }
        
        {
          Cookies.get('token')===undefined ? <Menu.Item key="4" style={{position:'absolute',right:"0",marginRight:"50px"}}><Link to ="/login">Login</Link></Menu.Item> :
          <Menu.Item key="5" style={{position:'absolute', right:'0', marginRight:'220px'}} onClick={handleLogout}>Logout</Menu.Item>
        }
        
      </Menu>
    </Header>
     
  )
};

export default HeaderComponent