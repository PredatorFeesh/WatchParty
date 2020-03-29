import React, { Component } from 'react';
import HeaderLogo from './HeaderLogo'
import HeaderSBox from './HeaderSBox'
import HeaderNavBar from './HeaderNavBar'
import HeaderProfileLogo from './HeaderProfileLogo'

class Header extends Component {

    render() {
        
        return (
          
          <header id="site-header" role="banner" style={{backgroundColor : '#606060',width : '100%',height : '80px',display: 'flex',alignItems: 'center',flexWrap: 'nowrap' }}>
              <HeaderLogo></HeaderLogo>
              <HeaderSBox></HeaderSBox>
              <HeaderNavBar></HeaderNavBar>
              <HeaderProfileLogo></HeaderProfileLogo>
          </header>      
          
        );
      }

}

export default Header;
