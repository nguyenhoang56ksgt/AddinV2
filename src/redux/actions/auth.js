import { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './actionTypes';

const authStart = () => {
  return {
    type: LOGIN_START,
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

export const signIn = (credentials, firebase) => (
  dispatch,
  getState,
  { getFirebase },
) => {
  dispatch(authStart());
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.username, credentials.password)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT,
      });
    });
};
