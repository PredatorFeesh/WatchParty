import React from 'react';
import { withRouter, Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

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
      alert("Please enter a movie name!"); // eslint-disable-line no-alert
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
    const { isLoggedIn } = this.props;
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Link to="/">
            <Navbar.Brand>WatchParty</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Form inline onSubmit={(event) => { event.preventDefault(); }}>
                <FormControl data-testid="search-field" onChange={(this.handleTextChange)} value={searchText} onKeyUp={this.handleSearchKeyUp} type="text" placeholder="Search for movies" className="mr-sm-2" />
                <Button data-testid="search-button" onClick={this.handleSearchSubmit} variant="outline-info">Search</Button>
              </Form>
            </Nav>
            <Nav>
              <NavDropdown
                title={<FontAwesomeIcon icon={faUserCircle} size="2x" />}
                id="collapsible-nav-dropdown"
                alignRight
              >
                {isLoggedIn ?
                  (
                    <>
                      <NavDropdown.Item as={Link} to="/profile">
                        My Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/logout">
                        Log Out
                      </NavDropdown.Item>
                    </>
                  )
                  :
                  (
                    <NavDropdown.Item as={Link} to="/login">
                      Log In
                    </NavDropdown.Item>
                  )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

Header.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withRouter(Header);
