import React from 'react';
import {
  Button, Form, Navbar,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      registerFirst: "",
      registerLast: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordConfirm: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRegister(event) {
    event.preventDefault();
    const {
      registerFirst, registerLast, registerEmail, registerPassword, registerPasswordConfirm,
    } = this.state;
    if (registerFirst && registerLast && registerEmail && registerPassword &&
        registerPasswordConfirm && registerPassword === registerPasswordConfirm) {
      /* MAKE CREATE ACCOUNT API CALL IN BACKEND */
      alert("Account created. Redirecting"); // eslint-disable-line no-alert
      const { history } = this.props;
      history.push({ pathname: "/" });
    } else {
      alert("Please enter an email and password. Make sure the passwords are the same."); // eslint-disable-line no-alert
    }
  }

  render() {
    return (
      <>
        <div className="welcome-container">
          <div>
            <Navbar.Brand>Register</Navbar.Brand>
          </div>
        </div>
        <div className="login-container">
          <Form onSubmit={this.handleRegister}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="registerFirst" type="text" placeholder="First" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="registerLast" type="text" placeholder="Last" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control name="registerEmail" type="email" placeholder="Enter email" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name="registerPassword" type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label> Confirm Password</Form.Label>
              <Form.Control name="registerPasswordConfirm" type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

Register.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Register);
