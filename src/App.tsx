import React from 'react';
import HomePage from './scripts/tsx/main_tsx/home_page_tsx/home';
import MoviesPage from './scripts/tsx/main_tsx/movies_page_tsx/movies-page';
import MovieItemIndividual from './scripts/tsx/main_tsx/movie_page_individual_tsx/movie_item_individual_tsx/movie_item_individual';
import {HashRouter, Route, Switch} from "react-router-dom";
import Footer from './scripts/tsx/global_tsx/footer_tsx/footer';
import BuilderPage from './scripts/tsx/main_tsx/builder_tsx/builder-page';

const App: React.FC  = () => {
  return (
    <div className="App">
      <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/movies/" component={MoviesPage}></Route>
        <Route exact path="/movies/:movieId" component={MovieItemIndividual}></Route>
        <Route exact path="/builder" component={BuilderPage}></Route>
      </Switch>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
 