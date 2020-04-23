import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
  }

  handleRoute = (route) => () => {
    const { history } = this.props;
    history.push({ pathname: route });
  };

  handleTextChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleSearchSubmit() {
    const { searchText } = this.state;
    if (searchText) {
      const temp = searchText;
      this.setState({ searchText: '' });
      const { history } = this.props;
      history.push({
        pathname: "/results",
        state: { searchText: temp },
      });
    } else {
      alert("Please enter a movie name!");
    }
  }

  handleSearchKeyUp(event) {
    event.preventDefault();
    if (event.key === 'Enter' && event.keyCode === 13) {
      this.handleSearchSubmit();
    }
  }

  render() {
    const { searchText } = this.state;
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand onClick={this.handleRoute("/")} href="/">WatchParty</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Form inline onSubmit={(event) => { event.preventDefault(); }}>
                <FormControl onChange={(this.handleTextChange)} value={searchText} onKeyUp={this.handleSearchKeyUp} type="text" placeholder="Search movies or users" className="mr-sm-2" />
                <Button onClick={this.handleSearchSubmit} variant="outline-info">Search</Button>
              </Form>
            </Nav>
            <Nav>
              <NavDropdown
                title=<FontAwesomeIcon icon="user-circle" size="2x" />
                id="collapsible-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item>Log In</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(Header);
