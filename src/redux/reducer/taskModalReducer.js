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
        // get_list_tasktype: (state, action) => {
        //     state.listTaskTypes = action.payload;
        // },
    },
});

export const { } = taskModalReducer.actions;

export default taskModalReducer.reducer;
