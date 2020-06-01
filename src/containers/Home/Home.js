import React from 'react';
import classes from './Home.module.css';
export const Home = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Row}>
          <div className={classes.Col}>1</div>
          <div className={classes.Col}>1</div>
          <div className={classes.Col}>1</div>
      </div> 
      <div className={classes.Row}>
          <div className={classes.Col}>2</div>
          <div className={classes.Col}>2</div>
          <div className={classes.Col}>2</div>
      </div> 
    </div>
  );
};

export default Home;
