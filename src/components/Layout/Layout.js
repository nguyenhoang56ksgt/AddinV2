import React from 'react';
import Header from './Header/Header';
import classes from './Layout.module.css';

const CustomLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div className={classes.Content}>{children}</div>
    </>
  );
};

export default CustomLayout;
