import React, { useState } from 'react';
import {  BrowserRouter as Router } from 'react-router-dom';
//import logo from './logo.svg';
import './App.scss';
import SideBar from './layout/sidebar/SideBarMenu'
import MainContent from './layout/main/MainContent'
import { GlobalAppContext } from './context';

function App() {
  const [toggled, setToggled] = useState(true);
  const [hasBackground, setHasBackground] = useState(true);

  let style = toggled ? "toggled" : "";
  style += hasBackground ? " sidebar-bg" : "";

  return (
    <Router>
      <GlobalAppContext.Provider
        value={{toggled, setToggled, hasBackground, setHasBackground}}  
      >
        <div className={"page-wrapper default-theme bg1 "+ style  }>
          <SideBar />
          <MainContent />
        </div>
      </GlobalAppContext.Provider>
    </Router>
  );
}

export default App;
