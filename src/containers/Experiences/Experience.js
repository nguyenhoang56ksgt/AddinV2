import React from 'react';
import classes from './Experience.module.css';
export const Experience = () => {
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

export default Experience;
