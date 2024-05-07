import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    ExperimentOutlined,
    SnippetsOutlined,
} from '@ant-design/icons';

import "../styles/DefaultLayout.css";
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;
const App = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  return (
    <Layout style={{ minHeight: '960px',background: 'rgb(125, 210, 240)'}}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#023E8A',borderRadius: '15px',paddingTop: '10px',height:'950px'}}>
        <div className="demo-logo-vertical">
        <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkv6dg5oDHHjkj_uxHOeYf4jxlEWriGmryV9fmayjbw&s"alt="Pharmacy Logo" style={{width: '130px',height:'130px', borderRadius: '100px',marginLeft:'36px'}}/>
        <h1 className="text-center text-light font-wight-bold mt-4">IVORY</h1>
        <h1 className="text-center text-light font-wight-bold mt-4">DENTAL</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          style={{padding: '16px 0',background:'#023E8A'}}>
          
          <Menu.Item key="/" icon={<HomeOutlined />}>
               <Link to="/" >Home</Link>
           </Menu.Item>
          <Menu.Item key="/ManageTreatment" icon={<ExperimentOutlined/>}>
              <Link to="/ManageTreatment" >Manage Treatment</Link>
           </Menu.Item>
          <Menu.Item key="ManagePatient" icon={<UserOutlined/>}>
              <Link to="/ManagePatient" >Manage Patient</Link>
           </Menu.Item>
         <Menu.Item key="Bills" icon={<SnippetsOutlined/>}>
              <Link to="/Bills" >Bills</Link>
             </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
                  Logout
              </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 20,
            minHeight: 210,
            background: colorBgContainer,
            backgroundImage: 'url(https://i.pinimg.com/originals/1d/48/8e/1d488eed415db70371ccba24dde74fbb.jpg)',
            borderRadius: borderRadiusLG,
          }}
        >
          { children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;