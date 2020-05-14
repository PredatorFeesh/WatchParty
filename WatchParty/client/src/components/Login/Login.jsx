import React from 'react';
import {
  Button, Form, Navbar,
} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: '',
      loginPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    if (loginEmail && loginPassword) {
      /* MAKE API CALL IN BACKEND TO LOGIN */
      const { history, LogIn } = this.props;
      LogIn("some userid");
      history.push({ pathname: "/" });
    } else {
      alert("Please enter an email and password"); // eslint-disable-line no-alert
    }
  }

  render() {
    return (
      <>
        <div className="welcome-container">
          <div>
            <Navbar.Brand>Login</Navbar.Brand>
          </div>
        </div>
        <div className="login-container">
          <Form onSubmit={this.handleLogin}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control name="loginEmail" type="email" placeholder="Enter email" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name="loginPassword" type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Button data-testid="login-btn" variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
        <div className="make-account-container">
          <div>
            Don&apos;t have an account?
          </div>
          <Link to="/register">
            Sign Up
          </Link>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  LogIn: PropTypes.func.isRequired,
};

export default withRouter(Login);
