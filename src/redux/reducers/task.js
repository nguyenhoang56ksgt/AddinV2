import {
  ADD_TASK_START,
  ADD_TASK_FAIL,
  ADD_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  GET_TASK_START,
  DELETE_TASK_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  tasks: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK_START:
    case GET_TASK_START:
      return {
        ...state,
        loading: true,
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case ADD_TASK_FAIL:
    case GET_TASK_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };
    default:
      return state;
  }
}
