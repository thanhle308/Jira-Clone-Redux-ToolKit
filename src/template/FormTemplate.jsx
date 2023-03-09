import React from 'react';
import { Route } from 'react-router-dom';
import imgForm from '../assets/img/login.jpg';
import { Layout, Space } from 'antd';
import { useEffect, useState } from "react";
const { Header, Footer, Sider, Content } = Layout;

const FormTemplate = (props) => {
   const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
   useEffect(() => {
      window.onresize = () => {
         setSize({
            width: window.innerWidth,
            height: window.innerHeight
         })
      }
   }, [])
   return (
      <Route
         exact
         path={props.path}
         render={(propsRoute) => {
            return (
               <>
                  <Layout>
                     <Sider width='60%' style={{ height:"100vh", backgroundImage: `url(${imgForm})`, backgroundSize: 'cover' ,backgroundRepeat:'no-repeat'} }>
                     </Sider>
                     <Content style={{ background: "linear-gradient(#141e30, #243b55)" }}>
                        <props.component {...propsRoute} />
                     </Content>
                  </Layout>

                  {/* <div className='container-fluid'>
                     <div className='row'>
                        <div className='col-8 p-0'>
                           <img
                              src={imgForm}
                              style={{
                                 height: '100vh',
                                 objectFit: 'cover',
                                 width: '100%',
                              }}
                           />
                        </div>
                        <div className='col-4'>
                           <props.component {...propsRoute} />
                        </div>
                     </div>
                  </div> */}
               </>
            );
         }}
      />
   );
};

export default FormTemplate;
