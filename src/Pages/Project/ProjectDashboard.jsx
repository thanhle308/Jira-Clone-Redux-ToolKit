import { message, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, SearchOutlined, ClearOutlined, UserAddOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Avatar, Popover, AutoComplete } from 'antd';
import Highlighter from 'react-highlight-words';
import { NavLink } from 'react-router-dom';


import { getAllProjectAction, deleteProjectAction, assignUserProjectAction, removeUserFromProjectAction } from "../../redux/action/projectAction";
import { open_drawer_create_project, open_drawer_edit } from '../../redux/reducer/drawerHOCReducer';
import { edit_project } from '../../redux/reducer/projectReducer';
import { getAllUserAction } from '../../redux/action/userAction';

const confirm = (e) => {
   message.success('Click on Yes');
};

const cancel = (e) => {
   message.error('Click on No');
};
const ProjectDashboard = () => {
   const { projectList } = useSelector(state => state.projectReducer);
   const { allUser } = useSelector(state => state.userReducer)
   // console.log(' list', allUser)
   const searchRef = useRef(null);
   const dispatch = useDispatch();

   const [value, setValue] = useState("");

   const columns = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: 'id',
         width: '10%',
         sorter: (item2, item1) => {
            return item2.id - item1.id;
         },
         sortDirections: ['descend']
      },
      {
         title: 'Project Name',
         dataIndex: 'projectName',
         key: 'projectName',
         width: '20%',
         render: (text, record, index) => {
            return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
         },
         sorter: (item2, item1) => {
            let projectName1 = item1.projectName?.trim().toLowerCase();
            let projectName2 = item2.projectName?.trim().toLowerCase();
            if (projectName2 < projectName1) {
               return -1;
            }
            return 1;
         }
      },
      {
         title: 'Category',
         dataIndex: 'categoryName',
         key: 'categoryName',
         width: '20%',
         sorter: (item2, item1) => {
            let categoryName1 = item1.categoryName?.trim().toLowerCase();
            let categoryName2 = item2.categoryName?.trim().toLowerCase();
            if (categoryName2 < categoryName1) {
               return -1;
            }
            return 1;
         }
      },
      {
         title: 'Creator',
         dataIndex: 'creator',
         key: 'creator',
         render: (text, record, index) => {
            return <Tag color='green'>{record.creator?.name}</Tag>
         },
         sorter: (item2, item1) => {
            let creator1 = item1.creator?.name.trim().toLowerCase();
            let creator2 = item2.creator?.name.trim().toLowerCase();
            if (creator2 < creator1) {
               return -1;
            }
            return 1;
         }

      },
      {
         title: 'Menbers',
         key: 'members',
         render: (text, record, index) => {
            return <div>
               {record.members?.slice(0, 3).map((member, index) => {
                  return <Popover key={index} placement='top' title={'Members'} content={() => {
                     return <table className='table'>
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th className='text-center'>Avatar</th>
                              <th>Name</th>
                              <th><ToolOutlined style={{ fontSize: '18px' }} /></th>
                           </tr>
                        </thead>
                        <tbody>
                           {record.members?.map((item, index) => {
                              return <tr key={index}>
                                 <td>{item.userId}</td>
                                 <td>
                                    <img src={item.avatar} width='30' height='30' style={{ borderRadius: '50%' }} />
                                 </td>
                                 <td>{item.name}</td>
                                 <td>
                                    <ClearOutlined className='btn btn-danger' onClick={() => {
                                       const userProject = {
                                          userId: item.userId,
                                          projectId: record.id,
                                       }
                                       //gửi action xóa
                                       dispatch(removeUserFromProjectAction(userProject))
                                    }} />
                                 </td>
                              </tr>
                           })}
                        </tbody>
                     </table>
                  }}>
                     <Avatar className='mr-1' key={index} src={member.avatar} />
                  </Popover>
               })}
               {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

               <Popover placement='rightTop' title={'Add User'} content={() => {
                  return <AutoComplete
                     options={allUser?.map((user, index) => {
                        return { label: user.name, value: user.userId.toString() }
                     })}

                     value={value}

                     onChange={(text) => {
                        setValue(text);
                     }}
                     onSelect={(valueSelect, option) => {
                        // set gia  tri hop thoai 
                        setValue(option.label);
                        let userProject = {
                           'projectId': record.id,
                           'userId': Number(valueSelect)
                        }
                        //goi api assignUserProject de add user vao project
                        dispatch(assignUserProjectAction(userProject))

                     }}

                     style={{ width: '100%' }}
                     onSearch={(value) => {
                        console.log('value', value)
                        if (searchRef.current) {
                           clearTimeout(searchRef.current);
                        }
                        searchRef.current = setTimeout(() => {
                           // call api lay danh sach tat ca user
                           dispatch(getAllUserAction(value))
                        }, 300)
                     }} />
               }} trigger="click">
                  <UserAddOutlined className='btn btn-primary ml-2' style={{ borderRadius: '50%' }} />
               </Popover>
            </div>
         },
      },
      {
         title: 'Action',
         key: 'action',
         render: (text, record, index) => (
            <Space key={index} size='middle'>
               <button className='btn btn-primary mr-2' onClick={() => {
                  //Dispatch len reducer cai form can load kieu nao
                  dispatch(open_drawer_edit());
                  //Disatch du lieu dong hien tai can edit
                  dispatch(edit_project(record));
               }}><EditOutlined /></button>

               <Popconfirm
                  title="Delete Project ?"
                  onConfirm={() => {
                     // gui dispatch id project can xoa
                     dispatch(deleteProjectAction(record.id))
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
               >
                  <button className='btn  btn-danger'><DeleteOutlined /></button>
               </Popconfirm>
            </Space>
         )
      },
   ];


   useEffect(() => {
      dispatch(getAllProjectAction())

   }, [])
   return <div className='container'>
      <h1 className='mb-4'>Project Management</h1>
      <button className='btn btn-primary mb-2' onClick={() => {
         dispatch(open_drawer_create_project())
      }}> Add New Project</button>
      <Table rowKey={'id'} style={{ width: '100%' }} columns={columns} dataSource={projectList} />
   </div>
};

export default ProjectDashboard;
