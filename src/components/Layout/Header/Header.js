import React from 'react'
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.Header}>
        <div className={classes.Inner__Header}>
        <ul>
            <li>About</li>
            <li>Planning</li>
            <li>Todo</li>
        </ul>
        </div>
        </div>
    )
}

export default Header
