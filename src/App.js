import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Exprerience from './containers/Experiences/Experience'

function App() {
  return (
    <BrowserRouter>
      <Layout>
       <div>Ok</div>
       <Exprerience/>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
