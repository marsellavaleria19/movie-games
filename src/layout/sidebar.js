import React from "react"
import { Layout, Menu} from 'antd';
import "../assets/css/style.css";
import { VideoCameraFilled,PlayCircleFilled, SettingFilled } from '@ant-design/icons';
import logo from "../assets/img/logoMogams.png"
import { Link,useHistory } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarComponent=()=>{
    
    return (
        <Sider className="sidebar" >
            <div className="sidebar-header">
                <img src={logo} alt="logo" width="150px" height="120px"/>
            </div>
            <Menu theme="dark" style={{marginTop:"50px"}} mode="inline">
            <SubMenu key="sub1" icon={<VideoCameraFilled/>} title="Movie">
                <Menu.Item key="1"><Link to="/movielist">Data Movie</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/movielist/create">Add Data Movie</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<PlayCircleFilled />} title="Games">
                <Menu.Item key="3"><Link to="/gamelist">Data Games</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/gamelist/create">Add Data Game</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingFilled />} title="Settings">
                <Menu.Item key="5"><Link to="/changepassword">Change Password</Link></Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>
    )
};

export default SidebarComponent