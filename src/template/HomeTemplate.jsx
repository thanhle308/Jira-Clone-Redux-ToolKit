import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import SiderBar from '../components/SiderBar/SiderBar';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { ACCESS_TOKEN } from '../utils/settings';
const { Header, Content, Footer, Sider } = Layout;

const HomeTemplate = (props) => {
   const {
      token: { colorBgContainer },
   } = theme.useToken();
   if (!localStorage.getItem(ACCESS_TOKEN)) {
      return <Redirect to='/login'/>
   }
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
                     />
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
