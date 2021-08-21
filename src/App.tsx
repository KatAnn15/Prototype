import React from 'react';
import Header from "./scripts/tsx/global_tsx/header_tsx/header";
import AboveTheFold from './scripts/tsx/global_tsx/above_the_fold';
import ListGallery from './scripts/tsx/main_tsx/list_gallery/list-gallery';

const App: React.FC  = () => {
  return (
    <div className="App">
      <Header/>
      <AboveTheFold/>
      <ListGallery/>
    </div>
  );
}

export default App;
 