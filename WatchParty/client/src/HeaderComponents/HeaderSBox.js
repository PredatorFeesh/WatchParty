import React, {Component} from 'react';

class HeaderSBox extends Component{

    render(){

        return(
            
            <div id="movie-search-bar-wrapper" style={{paddingRight: '16px'}}>
                    <form id="movie-search-box" >
                        <input type="text" style={{width : '250px', height: '28px', fontSize: '16px', border: '0px', borderRadius: '5px', fontFamily: 'sans-serif', background:  '#a8a8a8'}} placeholder="Movie search"/>
                    </form>
            </div>
        );

    }

}

export default HeaderSBox;