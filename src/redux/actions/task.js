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
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .collection('tasks')
      .add({
        ...task,
        author: 'Manh Hoang',
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: ADD_TASK_SUCCESS });
      })
      .catch((err) => dispatch({ type: ADD_TASK_FAIL, payload: err }));

    // fireStore.collection('taks').add({
    //   ...task,
    //   createdBy: 'Hoang',
    // }).then(res => console.log(res));
    // dispatch({
    //   type: ADD_TASK_START,
    // });

    // axiosService
    //   .post(`/tasks.json`, task)
    //   .then((res) => {
    //     const newTask = {
    //       ...task,
    //       id: res.data.name,
    //     };
    //     dispatch({ type: ADD_TASK_SUCCESS, payload: newTask });
    //   })
    //   .catch((err) => dispatch({ type: ADD_TASK_FAIL, payload: err }));
  };
};

export const getTasks = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({
      type: GET_TASK_START,
    });
    const fireStore = getFirestore();
    fireStore
      .collection('tasks')
      .get()
      .then((res) => {
        dispatch({ type: GET_TASK_SUCCESS });
      })
      .catch((err) => dispatch({ type: GET_TASK_FAIL, payload: err }));
  };
};

export const updateTask = (task) => {
  return (dispatch) => {
    axiosService
      .put(`/tasks/${task.id}.json`, task)
      .then((res) => console.log(res));
  };
};

export const deleteTask = (taskId) => {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .collection('tasks')
      .doc(taskId)
      .delete()
      .then(() => dispatch({ type: DELETE_TASK_SUCCESS }));
  };
};
