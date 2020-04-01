import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList'
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import history from "./utils/history";

library.add(
  faUserCircle
)

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <>
        <Router history={history}>
          <Header />
          <MovieList />
          <Switch>
            <Route exact path="/" />
            <PrivateRoute exact path="/profile" component={Profile} /> 
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
