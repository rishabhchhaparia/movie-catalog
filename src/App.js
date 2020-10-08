import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import MovieCatalog from './components/MovieCatalog';
import MovieDetail from './components/MovieDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/:movieId'>
            <MovieDetail />
          </Route>
          <Route path='/'>
            <MovieCatalog />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
