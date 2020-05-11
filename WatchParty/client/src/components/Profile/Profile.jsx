import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.fetchToWatch = this.fetchToWatch.bind(this);
  }

  fetchToWatch() {
    /* MAKE BACKENDD API CALL TO FETCH TOWATCH LIST */
    const { userID } = this.props;
    console.log(userID);
  }

  render() {
    const { userID } = this.props;
    return (
      <>
        {userID === "" ? (<h3>Unable to retrieve profile. Please log in.</h3>)
          :
          (
            <h3>
              welcome user
            </h3>
          )}
      </>
    );
  }
}

Profile.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default Profile;
