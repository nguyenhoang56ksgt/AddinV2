import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Todo from './containers/Todo/Todo';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/about" exact component={About} />
            <Route path="/todo" exact component={Todo} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
