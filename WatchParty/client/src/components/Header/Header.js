import React, { Component } from 'react';
import HeaderLogo from './HeaderLogo'
import HeaderSBox from './HeaderSBox'
import HeaderNavBar from './HeaderNavBar'
import HeaderProfileLogo from './HeaderProfileLogo'
import './Header.css'

class Header extends Component {

    render() {
        
        return (
          
          <header id="site-header" role="banner" >
              <HeaderLogo></HeaderLogo>
              <HeaderSBox></HeaderSBox>
              <HeaderNavBar></HeaderNavBar>
              <HeaderProfileLogo></HeaderProfileLogo>
          </header>      
          
        );
      }

}

export default Header;
