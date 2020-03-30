import React, {Component} from 'react';

class HeaderProfileLogo extends Component{

    render(){

        return(
            <div id="profile-pic-dropdown-container" >
                
                <div class="dropdown">
                    <button class="dropdown-area">
                        <img src={'default.png'} width="45" height="45" ></img>
                        <img src={'DropdownCaret.png'} width="25" height="15" ></img>
                    </button>
                    
                    <div class="dropdown-content">
                        <a href="#">Sign Out</a>
                    </div>
                </div>

            </div>
        );
    }

}

export default HeaderProfileLogo;