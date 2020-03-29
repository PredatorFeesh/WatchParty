import React, {Component} from 'react';

class HeaderNavBar extends Component{

    render(){

        return(
            <div id="site-navigation-bar">
                    <nav class="nav-elements">
                        <a>
                            Activity Feed
                        </a>
                        <a>
                            Matches
                        </a>
                        <a>
                            Profile
                        </a>
                    </nav>
            </div>
        );

    }

}

export default HeaderNavBar;