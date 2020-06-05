import {
  ADD_TASK_FAIL,
  ADD_TASK_START,
  ADD_TASK_SUCCESS,
  GET_TASK_FAIL,
  GET_TASK_SUCCESS,
  GET_TASK_START,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from './actionTypes';

export const addTask = (task) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: ADD_TASK_START });
    const fireStore = getFirestore();
    fireStore
      .collection('tasks')
      .add({
        ...task,
      })
      .then((res) => {
        dispatch({ type: ADD_TASK_SUCCESS });
      })
      .catch((err) => dispatch({ type: ADD_TASK_FAIL, payload: err }));
  };
};

export const getDoneTasks = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({
      type: GET_TASK_START,
    });
    const fireStore = getFirestore();

    fireStore
      .collection('tasks')
      .where('isDone', '==', true)
      .get()
      .then((res) => {
        let doneTask = [];
        res.forEach((doc) => {
          doneTask.push(doc.data());
        });

        //sort by date
        doneTask.sort((a, b) => -(a.createdAt - b.createdAt));
        dispatch({ type: GET_TASK_SUCCESS, payload: doneTask });
      })
      .catch((err) => dispatch({ type: GET_TASK_FAIL, payload: err }));
  };
};

export const updateTask = (task) => {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .collection('tasks')
      .doc(task.key)
      .update(task)
      .then(() => dispatch({ type: UPDATE_TASK_SUCCESS }));
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
