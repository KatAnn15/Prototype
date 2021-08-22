import React from 'react';
import HomePage from './scripts/tsx/main_tsx/home_page_tsx/home';
import MoviesPage from './scripts/tsx/main_tsx/movies_page_tsx/movies-page';
import {HashRouter, Route, Switch} from "react-router-dom"

const App: React.FC  = () => {
  return (
    <div className="App">
      <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/movies/:category" component={MoviesPage}></Route>
        <Route exact path="/movies/" component={MoviesPage}></Route>
      </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
 