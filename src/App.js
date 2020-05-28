import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
 

function App() {
  return (
    <BrowserRouter>
      <Layout>
       <div>Ok</div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
