import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 2,
            "priority": "Medium"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [],
        "lstComment": [],
        "taskId": 9298,
        "taskName": "thanh",
        "alias": "thanh",
        "description": "day la description",
        "statusId": "2",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "typeId": 1,
        "priorityId": 2,
        "projectId": 11879
    },

}

const taskModalReducer = createSlice({
    name: 'taskModalReducer',
    initialState,
    reducers: {
        get_task_detail: (state, action) => {
            state.taskDetailModal = action.payload;
        },
        change_task_modal: (state, action) => {
            const { name, value } = action.payload;
            // console.log(name, value);
            state.taskDetailModal = { ...state.taskDetailModal, [name]: value };
        },
        change_members_detail_task_add: (state, action) => {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.payload];
            // console.log(state.taskDetailModal.assigness)
        },
        change_members_detail_task_remove: (state, action) => {
            console.log(state.taskDetailModal)
            // let arr = state.taskDetailModal.assigness.filter((mem) => {
            //     return state.taskDetailModal.assigness != action.payload.userId
            // })
            // console.log("arr",arr)
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.payload.userId)];
            // console.log(state.taskDetailModal.assigness)
        },
        
    },
});

export const { get_task_detail, change_task_modal, change_members_detail_task_add ,change_members_detail_task_remove } = taskModalReducer.actions;

export default taskModalReducer.reducer;
