import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Todo from './containers/Todo/Todo';


function App() {
  return (
  
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/about" exact component={About} />
            <Route path="/todo" exact component={Todo} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
  
  );
}

export default App;
