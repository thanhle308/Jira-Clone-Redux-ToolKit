import React from 'react';
import { Fragment } from 'react';
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { open_drawer_create_task } from '../../redux/reducer/drawerHOCReducer';
import jira from '../../assets/img/jira.png'
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}
const SiderBar = () => {
  const dispatch = useDispatch();
  const items = [
    getItem(<NavLink to='/'>Dashboard</NavLink>, '1', <PieChartOutlined />, '', ''),
    getItem(<div onClick={() => {
      //Goi api mo form 
      dispatch(open_drawer_create_task());
    }}>Create Task</div>, '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 60,
            margin: 10,
            backgroundImage: `url(${jira})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </>
  )
};

export default SiderBar;
