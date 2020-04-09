import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import LandingPage from './components/LandingPage/LandingPage'

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
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/results" component={SearchResults}/>
        </Switch>
      </Router>
      </>
    );
  }
}

export default App;
