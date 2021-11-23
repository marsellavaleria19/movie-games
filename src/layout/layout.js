import React from "react"
import "../assets/css/style.css"
import { Layout} from 'antd';
 import HeaderComponent from "./navigation";
 import FooterComponent from "./footer";
import SidebarComponent from "./sidebar";
import Cookies from "js-cookie";


const {Content} = Layout;

const LayoutComponent=(props)=>{
  return (
    <>
       {Cookies.get('token')!==undefined ? <SidebarComponent/> : null}
       <Layout breakpoint="sm">
           <HeaderComponent/>
           <Content className="content-body">
                {props.content}     
            </Content>
            <FooterComponent/>
       </Layout>
    </>
    //    <Content className="content">
    //         {Cookies.get('token')!==undefined ? <SidebarComponent/> : null}
    //         <Layout style={{backgroundColor:'transparent'}}>
    //             <HeaderComponent/>
    //             <Content className="content-body">
    //                 {props.content}
    //             </Content>
    //         </Layout>
    //         <FooterComponent/>
    //    </Content>
    )
};

export default LayoutComponent