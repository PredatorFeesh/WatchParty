import React, {Component} from 'react';

class HeaderNavBar extends Component{

    render(){

        return(
            <div id="site-navigation-bar" style={{flex: 'auto', fontSize: '20px', paddingRight: '16px', color:'white', fontFamily: 'Arial Narrow, sans-serif'}}>
                    <nav>
                        <a style={{paddingRight: '16px'}}>
                            Activity Feed
                        </a>
                        <a style={{paddingRight: '16px'}}>
                            Matches
                        </a>
                        <a style={{paddingRight: '16px'}}>
                            Profile
                        </a>
                    </nav>
            </div>
        );

    }

}

export default HeaderNavBar;