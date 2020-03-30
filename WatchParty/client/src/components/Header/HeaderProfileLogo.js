import React from 'react';

const HeaderProfileLogo = () => (
  <div id="profile-pic-dropdown-container" >
    <div class="dropdown">
      <button class="dropdown-area">
        <img src={'default.png'} width="45" height="45" alt="profile"></img>
        <img src={'DropdownCaret.png'} width="25" height="15" alt="dropdown carot"></img>
      </button>

      <div class="dropdown-content">
        <span>Sign Out</span>
      </div>
    </div>
  </div>
)

export default HeaderProfileLogo;
