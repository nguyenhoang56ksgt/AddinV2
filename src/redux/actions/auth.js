import axios from 'axios';
import { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './actionTypes';
import firebase from '../../firebaseConfig';

const authStart = () => {
  return {
    type: LOGIN_START,
  };
};

const authSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const authFail = (err) => {
  return {
    type: LOGIN_FAIL,
    payload: err,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000); //time out nhan vao la milisecond
  };
};

export const auth = (email, password, firebase) => {
  
  return (dispatch) => {
    dispatch(authStart());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res)
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        //dispatch(authFail(err.response.data.error));
      });
  };
  // const authData = {
  //   email: email,
  //   password: password,
  //   returnSecureToken: true,
  // };

  // const url =
  //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMMFzFUTtsKrNWRh9yThgT-s_gwOwU0K4';

  // axios
  //   .post(url, authData)
  //   .then((res) => {
  //     console.log(res);
  //     dispatch(authSuccess(res.data));
  //     //dispatch(checkAuthTimeout(res.data.expiresIn));
  //   })
  //   .catch((err) => {
  //     dispatch(authFail(err.response.data.error));
  //   });
  // };
};
