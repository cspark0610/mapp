import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Favorites } from "./components/Favorites";
import { GlobalProvider } from './context/GlobalState'

import { Search } from "./components/Search";

import "./index.css";



function App() {
  return (
   <GlobalProvider>
      <Router>
        <Header />

        <Switch>
          <Route exact path ='/'> <Search/></Route>
          <Route path="/favs"><Favorites /></Route>
        </Switch>
      </Router>
  </GlobalProvider>
  );
}

export default App;
