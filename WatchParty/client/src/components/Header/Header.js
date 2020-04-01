import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Form, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css'
import { useAuth0 } from "../../react-auth0-spa";


const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="#home">WatchParty</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search movies or users" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Nav>
        <Nav>
          {!isAuthenticated && (
            <Nav.Link onClick={() => loginWithRedirect({})}>Log in / Sign up</Nav.Link>
          )}
          {isAuthenticated && (
            <NavDropdown
              title=<FontAwesomeIcon icon='user-circle' size='2x' />
              id="collapsible-nav-dropdown"
              alignRight>
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout()}>Log out</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
