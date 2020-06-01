import axiosService from '../../axiosService';
import {
  ADD_TASK_FAIL,
  ADD_TASK_START,
  ADD_TASK_SUCCESS,
  GET_TASK_FAIL,
  GET_TASK_SUCCESS,
  GET_TASK_START,
  DELETE_TASK_SUCCESS,
} from './actionTypes';

export const addTask = (task) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TASK_START,
    });
    axiosService
      .post(`/tasks.json`, task)
      .then((res) => {
        const newTask = {
          ...task,
          id: res.data.name,
        };
        dispatch({ type: ADD_TASK_SUCCESS, payload: newTask });
      })
      .catch((err) => dispatch({ type: ADD_TASK_FAIL, payload: err }));
  };
};

export const getTasks = () => {
  return (dispatch) => {
    dispatch({
      type: GET_TASK_START,
    });
    axiosService
      .get(`/tasks.json`)
      .then((res) => {
        const fetchedTasks = [];
        for (let key in res.data) {
          fetchedTasks.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch({ type: GET_TASK_SUCCESS, payload: fetchedTasks });
      })
      .catch((err) => dispatch({ type: GET_TASK_FAIL, payload: err }));
  };
};

export const updateTask = (task) => {
  return (dispatch) => {
    axiosService
      .put(`/tasks.json/${task.id}`, task)
      .then((res) => console.log(res));
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    axiosService.delete(`/tasks/${taskId}.json`).then((res) => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: taskId,
      });
    });
  };
};
