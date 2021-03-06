import React, { Component } from 'react';
import style from './header.module.css';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className={style.header}> 
        <Link to="/library"><img className={style.logo} alt="logo" src="/Blinkist-Logo.png" /></Link>
        
      </header>
    );
  }
}

export default Header;