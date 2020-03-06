import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import SideBar from './layout/sidebar/SideBarMenu'
import MainContent from './layout/main/MainContent'

function App() {
  return (
    <div className="page-wrapper default-theme sidebar-bg bg1 toggled">
       <SideBar />
       <MainContent />
    </div>
  );
}

export default App;
