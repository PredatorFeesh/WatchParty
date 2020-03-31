import React from 'react';
import { Link } from "react-router-dom";

import { useAuth0 } from "../../react-auth0-spa";

const HeaderNavBar = () => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div id="site-navigation-bar">
      <nav className="nav-elements">
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}

        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

        {isAuthenticated && (
          <span>
            <Link to="/">Home</Link>&nbsp;
            <Link to="/profile">Profile</Link>
            <span>Activity Feed</span>&nbsp;
            <span>Matches</span>&nbsp;
          </span>
        )}
      </nav>
    </div>
  )
}

export default HeaderNavBar;
