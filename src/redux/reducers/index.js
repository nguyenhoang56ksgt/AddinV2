import { combineReducers } from 'redux';

import auth from './auth';
import task from './task';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
export default combineReducers({
  auth,
  task,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
