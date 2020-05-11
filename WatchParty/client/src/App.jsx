import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import LandingPage from './components/ActivityFeed/ActivityFeed';
import MoviePage from './components/MoviePage/MoviePage';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

library.add(
  faUserCircle,
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: "",
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogOut() {
    this.setState(
      {
        isLoggedIn: false,
        userId: "",
      },
    );
  }

  handleLogin(userid) {
    this.setState(
      {
        isLoggedIn: true,
        userId: userid,
      },
    );
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        <Router>
          <Header isLoggedIn={isLoggedIn} />
          <Switch>
            {isLoggedIn ? (<Route exact path="/" component={LandingPage} />) : (<Route exact path="/" component={() => <Login LogIn={this.handleLogin} />} />) }
            <Route exact path="/results" component={SearchResults} />
            <Route exact path="/results/:movieId" component={MoviePage} />
            <Route exact path="/login" component={() => <Login LogIn={this.handleLogin} />} />
            <Route exact path="/logout" component={() => <Logout LogOut={this.handleLogOut} />} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
