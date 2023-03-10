import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import SiderBar from '../components/SiderBar/SiderBar';
import { Breadcrumb, Layout, Menu, theme, Col, Dropdown, Button, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ACCESS_TOKEN, USER_LOGIN } from '../utils/settings';
const { Header, Content, Footer, Sider } = Layout;

const HomeTemplate = (props) => {
   const thisUser = JSON.parse(localStorage.getItem(USER_LOGIN));
   // console.log('thisUser', thisUser)
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   if (!localStorage.getItem(ACCESS_TOKEN)) {
      return <Redirect to='/login' />
   }
   const items = [
      {
         key: '1',
         label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
               1st menu item
            </a>
         ),
      },
      {
         key: '2',
         label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Profile
            </a>
         ),
      },
      {
         key: '3',
         label: (
            <NavLink  to='' onClick={() => {
               localStorage.removeItem(ACCESS_TOKEN);
            }}>
               LogOut
            </NavLink>
         ),
      },
   ];
   return (
      <Route
         exact
         path={props.path}
         render={(propsRoute) => {
            return (
               <Layout
                  style={{
                     minHeight: '100vh',
                  }}
               >
                  <SiderBar />
                  <Layout className="site-layout">
                     <Header
                        style={{
                           padding: 0,
                           background: colorBgContainer,
                        }}
                     >
                        <Col span={6} offset={18}>
                           <Space wrap size={16}>
                              <Dropdown
                                 menu={{
                                    items,
                                 }}
                                 placement="bottom"
                              >
                                 <Avatar  size={40} src={<img src={thisUser.avatar} alt="avatar" />} />
                              </Dropdown>
                           </Space>
                        </Col>
                     </Header>
                     <Content
                        style={{
                           margin: '0 16px',
                        }}
                     >
                        <div
                           style={{
                              padding: 24,
                              minHeight: 360,
                              background: colorBgContainer,
                           }}
                        >
                           <props.component {...propsRoute} />
                        </div>
                     </Content>
                     <Footer
                        style={{
                           textAlign: 'center',
                        }}
                     >
                        Capstone final project !!!
                     </Footer>
                  </Layout>
               </Layout>
            );
         }}
      />
   );
};

export default HomeTemplate;
