import React from 'react';
import Header from './Header/Header';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
