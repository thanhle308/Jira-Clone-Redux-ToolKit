import { http } from '../interceptor';

export const getAllProjectService = () => {
   return http.get('api/Project/getAllProject');
};

export const getProjectDetailService = (id) => {
   return http.get(`api/Project/getProjectDetail?id=${id}`);
};

export const getTaskDetailService = (id) => {
   return http.get(`api/Project/getTaskDetail?taskId=${id}`);
};

export const createProjectService = (data) => {
   return http.post('api/Project/createProject', data);
};

export const createProjectAuthorizeService = (data) => {
   return http.post('api/Project/createProjectAuthorize', data);
};

export const assignUserProjectService = (data) => {
   return http.post('api/Project/assignUserProject', data);
};

export const assignUserTaskService = (data) => {
   return http.post('api/Project/assignUserTask', data);
};

export const removeUserFromTaskService = (data) => {
   return http.post('api/Project/removeUserFromTask', data);
};

export const removeUserFromProjectService = (data) => {
   return http.post('api/Project/removeUserFromProject', data);
};

export const createTaskService = (data) => {
   return http.post('api/Project/createTask', data);
};

export const updateTaskService = (data) => {
   return http.post('/api/Project/updateTask', data);
};

export const updateProjectService = (id, data) => {
   return http.put(`api/Project/updateProject?projectId=${id}`, data);
};

export const updateStatusService = (data) => {
   return http.put(`api/Project/updateStatus`, data);
};

export const updatePriorityService = (data) => {
   return http.put(`api/Project/updatePriority`, data);
};

export const updateDescriptionService = (data) => {
   return http.put(`api/Project/updateDescription`, data);
};

export const updateTimeTrackingService = (data) => {
   return http.put(`api/Project/updateTimeTracking`, data);
};

export const updateEstimateService = (data) => {
   return http.put('api/Project/updateEstimate', data);
};

export const deleteProjectService = (id) => {
   return http.delete(`api/Project/deleteProject?projectId=${id}`);
};

export const deleteTaskService = (id) => {
   return http.delete(`api/Project/removeTask?taskId=${id}`);
};
