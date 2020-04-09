import React from 'react';
import { withRouter } from "react-router-dom"
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Form, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css'

class Header extends React.Component {
 
  constructor(props){
    super(props);

    this.state ={
      searchText: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
  }

  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
  };

  handleTextChange(event) {
    this.setState( {searchText: event.target.value} );
  }

  handleSearchSubmit(event){
    if(this.state.searchText){
      let temp = this.state.searchText;
      this.setState( {searchText: ''} )

      this.props.history.push({
        pathname: "/results",
        state: {searchText: temp}
      });

    } else {
      alert("Please enter a movie name!")
    }

  }

  handleSearchKeyUp(event){
    event.preventDefault();
    if (event.key === 'Enter' && event.keyCode === 13) {
        this.handleSearchSubmit();
    }
  }

  render () {
    return (
      <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand onClick={this.handleRoute("/")} href="/">WatchParty</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Form inline onSubmit={(event) => {event.preventDefault()}}>
              <FormControl onChange={(this.handleTextChange)} value={this.state.searchText} onKeyUp={this.handleSearchKeyUp} type="text" placeholder="Search movies or users" className="mr-sm-2" />
              <Button onClick={this.handleSearchSubmit} variant="outline-info">Search</Button>
            </Form>
          </Nav>
          <Nav>
            {
              <NavDropdown
                title=<FontAwesomeIcon icon='user-circle' size='2x' />
                id="collapsible-nav-dropdown"
                alignRight>
                <NavDropdown.Item>Log In</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    );
  }


}

export default withRouter(Header);
