import React, {Component} from 'react';

class HeaderProfileLogo extends Component{

    render(){

        return(
            <div id="user-profile-picture-dropdown" >
                <img src={'default.png'} style={{paddingRight: '50px'}} width="45" height="45" ></img>
            </div>
        );
    }

}

export default HeaderProfileLogo;