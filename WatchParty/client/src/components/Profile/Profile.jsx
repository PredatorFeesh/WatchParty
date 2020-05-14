import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Nav, Tab,
  Button,
} from 'react-bootstrap';


import theMovieDb from 'themoviedb-javascript-library';

import './Profile.css';

theMovieDb.common.api_key = 'bd5800f4f98c685b042cd33a1a790365';
theMovieDb.common.base_uri = 'https://api.themoviedb.org/3/';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userDescription: "",
      toWatchMovieData: [],
      loadingToWatchMovieData: true,
      watchedMovieData: [],
      loadingWatchedMovieData: true,
      userFollowers: [],
      loadingUserFollowers: true,
      userFollowing: [],
      loadingUserFollowing: true,
    };
    this.fetchUserName = this.fetchUserName.bind(this);
    this.fetchUserDescription = this.fetchUserDescription.bind(this);
    this.fetchToWatchMovies = this.fetchToWatchMovies.bind(this);
    this.fetchWatchedMovieData = this.fetchWatchedMovieData.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
    this.fetchFollowing = this.fetchFollowing.bind(this);
  }

  componentDidMount() {
    this.fetchUserName();
    this.fetchUserDescription();
    this.fetchToWatchMovies();
    this.fetchWatchedMovieData();
    this.fetchFollowers();
    this.fetchFollowing();
  }

  fetchUserName() {
    /* MAKE BACKEND API CALL TO GET USER NAME FROM USERID */
    /* DUMMY IMPLEMENTATION FOR TESTING */
    this.setState({
      userName: "Oliver M.",
    });
  }

  fetchUserDescription() {
    /* MAKE BACKEND API CALL TO GET USER PROFILE DESCRIPTION FROM USERID */
    /* DUMMY IMPLEMENTATION FOR TESTING */
    this.setState({
      userDescription: "Ollie's profile",
    });
  }

  fetchToWatchMovies() {
    /* MAKE BACKEND API CALL TO FETCH TOWATCH LIST WHICH IS AN ARRAY OF MOVIEIDS */
    /* DUMMY IMPLEMENTATION FOR TESTING */
    const toWatch = [131631, 131634, 671, 673, 39538, 146233];
    toWatch.forEach((element) => {
      theMovieDb.movies.getById(
        { id: element },
        (data) => {
          const response = JSON.parse(data);
          this.setState((prevState) => ({
            toWatchMovieData: [...prevState.toWatchMovieData, response],
          }));
        },
        (err) => console.log(err), // eslint-disable-line no-console
      );
    });
    this.setState({ loadingToWatchMovieData: false });
  }

  fetchWatchedMovieData() {
    /* MAKE BACKEND API CALL TO FETCH WATCHED LIST WHICH IS AN ARRAY OF MOVIEIDS */
    /* DUMMY IMPLEMENTATION FOR TESTING */
    const watched = [299536, 466272, 530915];
    watched.forEach((element) => {
      theMovieDb.movies.getById(
        { id: element },
        (data) => {
          const response = JSON.parse(data);
          this.setState((prevState) => ({
            watchedMovieData: [...prevState.watchedMovieData, response],
          }));
        },
        (err) => console.log(err), // eslint-disable-line no-console
      );
    });
    this.setState({ loadingWatchedMovieData: false });
  }

  fetchFollowers() {
    /* MAKE BACKEND API CALL TO FETCH FOLLOWERS LIST WHICH IS AN ARRAY OF USERIDS */
    /* CALL USERDETAILS API ON EACH USERID TO GET USER FIRST & LAST NAME */
    /* DUMMY IMPLEMENTATION FOR TESTING */
    this.setState({
      userFollowers: ["Phoebe J.", "Rachel L.", "Sally M.", "John D."],
      loadingUserFollowers: false,
    });
  }

  fetchFollowing() {
    /* MAKE BACKEND API CALL TO FETCH FOLLOWING USERS LIST WHICH IS AN ARRAY OF USERIDS */
    /* CALL USERDETAILS API ON EACH USERID TO GET USER FIRST & LAST NAME */
    /* DUMMY IMPLEMENTATION FOR TESTING */
    this.setState({
      userFollowing: ["Jim H.", "Kevin M."],
      loadingUserFollowing: false,
    });
  }

  render() {
    const { userID } = this.props;
    const {
      userName, userDescription, loadingToWatchMovieData, toWatchMovieData, loadingWatchedMovieData,
      watchedMovieData, loadingUserFollowers, userFollowers, userFollowing, loadingUserFollowing,
    } = this.state;
    return (
      <>
        {userID === "" ? (<h3>Unable to retrieve profile. Please log in.</h3>)
          :
          (
            <div className="profile-main-container">
              <div className="profilepic-name-container">
                <div className="profilepic-container">
                  <img
                    src="/userDefault.png"
                    width="380"
                    height="380"
                    alt="user profile"
                  />
                </div>
                <div className="profilename-container">
                  <h3>{userName}</h3>
                </div>
                <div className="profiledesc-container">
                  {userDescription}
                </div>
              </div>
              <div className="profile-tab-container">
                <div>
                  <Tab.Container defaultActiveKey="To-watch">
                    <Col>
                      <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="Overview">Overview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="To-watch">
                            To-watch (
                            {toWatchMovieData.length}
                            )
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="Watched">
                            Watched (
                            {watchedMovieData.length}
                            )
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="Followers">
                            Followers (
                            {userFollowers.length}
                            )
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="Following">
                            Following (
                            {userFollowing.length}
                            )
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col>
                      <Tab.Content>
                        <Tab.Pane eventKey="Overview">
                          <div className="tab-overview">
                            <h3>
                              Looking for some horror movies to watch
                            </h3>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="To-watch">
                          {
                            !loadingToWatchMovieData ?
                              (toWatchMovieData.map(
                                (el) => (
                                  <>
                                    <div className="to-watch-list" key={el.id}>
                                      <img
                                        className="list-movie-item-img"
                                        onError={(event) => { event.target.src = "/default.png"; }} // eslint-disable-line no-param-reassign
                                        src={`https://image.tmdb.org/t/p/w1280${el.poster_path}`}
                                        width="50"
                                        height="80"
                                        alt="movie poster"
                                      />
                                      <div className="to-watch-title">
                                        {el.title}
                                        {' '}
                                        {el.release_date !== "" && el.release_date !== undefined ? (`(${el.release_date.substring(0, 4)})`) : (null)}
                                      </div>
                                      <div className="to-watch-list-to-watch-btn">
                                        <Button variant="primary">
                                          Mark watched
                                        </Button>
                                      </div>
                                    </div>
                                    <hr />
                                  </>
                                ),
                              ))
                              :
                              (<h3>Loading...</h3>)
                          }
                        </Tab.Pane>
                        <Tab.Pane eventKey="Watched">
                          {
                            !loadingWatchedMovieData ?
                              (watchedMovieData.map(
                                (el) => (
                                  <>
                                    <div className="to-watch-list" key={el.id}>
                                      <img
                                        className="list-movie-item-img"
                                        onError={(event) => { event.target.src = "/default.png"; }} // eslint-disable-line no-param-reassign
                                        src={`https://image.tmdb.org/t/p/w1280${el.poster_path}`}
                                        width="50"
                                        height="80"
                                        alt="movie poster"
                                      />
                                      <div className="to-watch-title">
                                        {el.title}
                                        {' '}
                                        {el.release_date !== "" && el.release_date !== undefined ? (`(${el.release_date.substring(0, 4)})`) : (null)}
                                      </div>
                                      <div className="to-watch-list-to-watch-btn">
                                        <Button variant="success">
                                          Mark to-watch
                                        </Button>
                                      </div>
                                    </div>
                                    <hr />
                                  </>
                                ),
                              ))
                              :
                              (<h3>Loading...</h3>)
                          }
                        </Tab.Pane>
                        <Tab.Pane eventKey="Followers">
                          {
                            !loadingUserFollowers ?
                              (userFollowers.map(
                                (user) => (
                                  <>
                                    <div className="tab-followers">
                                      <img
                                        className="user-profile-img"
                                        onError={(event) => { event.target.src = "/default.png"; }} // eslint-disable-line no-param-reassign
                                        src="/userDefault.png"
                                        width="80"
                                        height="80"
                                        alt="user profile"
                                      />
                                      {user}
                                    </div>
                                    <hr />
                                  </>
                                ),
                              ))
                              :
                              (<h3>Loading...</h3>)
                          }
                        </Tab.Pane>
                        <Tab.Pane eventKey="Following">
                          {
                            !loadingUserFollowing ?
                              (userFollowing.map(
                                (user) => (
                                  <>
                                    <div className="tab-followers">
                                      <img
                                        className="user-profile-img"
                                        onError={(event) => { event.target.src = "/default.png"; }} // eslint-disable-line no-param-reassign
                                        src="/userDefault.png"
                                        width="80"
                                        height="80"
                                        alt="user profile"
                                      />
                                      {user}
                                    </div>
                                    <hr />
                                  </>
                                ),
                              ))
                              :
                              (<h3>Loading...</h3>)
                          }
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Tab.Container>
                </div>
              </div>
            </div>
          )}
      </>
    );
  }
}

Profile.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default Profile;
