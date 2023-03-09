import { createSlice } from '@reduxjs/toolkit';
import FormCreateProject from '../../components/Forms/FormProject/FormCreateProject';
import FormEditProject from '../../components/Forms/FormProject/FormEditProject';
import FormCreateTask from '../../components/Forms/FormTask/FormCreateTask';

const initialState = {
    title: "",
    visible: false,
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit: (propsValue) => { alert("Submit") },
};

const drawerHOCReducer = createSlice({
    name: 'loadingReducer',
    initialState,
    reducers: {
        open_drawer_edit: (state, action) => {
            state.visible = true;
            state.title = 'Edit Project';
            state.ComponentContentDrawer = <FormEditProject />
        },
        close_drawer: (state, action) => {
            state.visible = false;
        },
        set_submit: (state, action) => {
            state.callBackSubmit = action.payload;
        },
        open_drawer_create_project: (state, action) => {
            state.visible = true;
            state.title = 'Create Project';
            state.ComponentContentDrawer = <FormCreateProject />
        },
        open_drawer_create_task: (state, action) => {
            state.visible = true;
            state.title = 'Create Task';
            state.ComponentContentDrawer = <FormCreateTask />
        },
        set_submit_create_task: (state, action) => {
            state.callBackSubmit = action.payload;
        }


    }
});

export const { open_drawer_edit, close_drawer, set_submit, open_drawer_create_project,open_drawer_create_task , set_submit_create_task} = drawerHOCReducer.actions;

export default drawerHOCReducer.reducer;
