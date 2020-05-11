import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Logout.css';

class Logout extends React.Component {
  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    const { history, LogOut } = this.props;
    LogOut();
    history.push({ pathname: "/" });
  }

  render() {
    return (
      <>
        <div className="logout-confirm-mesg">
          <h2> Are you sure you want to log out?</h2>
        </div>
        <div className="logout-btn-container">
          <Button variant="danger" onClick={this.handleLogoutClick}>
            Log Out
          </Button>
        </div>
      </>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  LogOut: PropTypes.func.isRequired,
};

export default withRouter(Logout);
