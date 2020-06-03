import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import * as serviceWorker from './serviceWorker';

import { Provider, useSelector } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
} from 'redux-firestore';
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  isLoaded,
} from 'react-redux-firebase';
import rootReducer from './redux/reducers';
import fbConfig from './firebaseConfig';

// Create config for rrfProps object. We need this to pass it in the ReactReduxFirebaseProvider component
const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: 'users',
  attachAuthIsReady: true,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reduxFirestore(fbConfig),
    ),
  ),
);

const rrfProps = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions',
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div style={{color:''}}>Loading...</div>;
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
