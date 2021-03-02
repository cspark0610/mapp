import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Favorites } from "./components/Favorites";
import { Users } from "./components/Users";
import { MovieProvider } from './context/MovieContext'
import { UserProvider } from './context/UserContext'

import { Search } from "./components/Search";

import "./index.css";



function App() {
  return (
  <UserProvider>
   <MovieProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path ='/register'> <Register/></Route>
          <Route exact path ='/login'> <Login/></Route>
          <Route exact path ='/search'> <Search/></Route>
          <Route path="/favorites"><Favorites /></Route>
          <Route path="/users"><Users /></Route>
          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
  </MovieProvider>
  </UserProvider>
  );
}

export default App;
