import React from 'react';

import HeaderLogo from './HeaderLogo'
import HeaderSBox from './HeaderSBox'
import HeaderNavBar from './HeaderNavBar'
import HeaderProfileLogo from './HeaderProfileLogo'
import './Header.css'

const Header = () => (
  <header id="site-header" role="banner" >
    <HeaderLogo />
    <HeaderSBox />
    <HeaderNavBar />
    <HeaderProfileLogo />
  </header>
)

export default Header;
