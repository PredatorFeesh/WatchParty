import React, {Component} from 'react';

class HeaderSBox extends Component{

    render(){

        return(
            
            <div id="movie-search-bar-wrapper">
                    <form>
                        <input id="movie-search-box"  type="text" placeholder="Movie search"/>
                    </form>
            </div>
        );

    }

}

export default HeaderSBox;