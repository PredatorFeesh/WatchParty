import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import LandingPage from './components/LandingPage/LandingPage';
import MoviePage from './components/MoviePage/MoviePage';

library.add(
  faUserCircle,
);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/results" component={SearchResults} />
          <Route exact path="/results/:movieId" component={MoviePage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
