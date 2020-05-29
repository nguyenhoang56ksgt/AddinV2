import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.Header}>
      <div className={classes.Inner__Header}>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li> <a href="/planning">Planning</a></li>
          <li> <a href="/todo">Todo</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
