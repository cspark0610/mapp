import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Favorites } from "./components/Favorites";
import { Users } from "./components/Users";
import { UserFavorites } from "./components/UserFavorites";
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
          <Route path ='/register'> <Register/></Route>
          <Route path ='/login'> <Login/></Route>
          <Route path ='/search'> <Search/></Route>
          <Route path="/favorites"><Favorites /></Route>
          <Route path="/users"><Users /></Route>
          <Route path="/users/:id"><UserFavorites /></Route>
          <Redirect from ="/" to="/login" /> 
        </Switch>
      </Router>
  </MovieProvider>
 </UserProvider>
  );
}

export default App;
