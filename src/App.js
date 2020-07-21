import React from 'react';
import logo from './logo.svg';
import './App.css';
import Book from "./components/Book"
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Switch,Router,browserHistory,IndexRoute } from 'react-router-dom';

function App(){
    return(
      <main>
        
        <BrowserRouter>
        <Navbar/>
        <Switch>
        
          <Route path="/" component={Home} exact/>
          <Route path="/book" component={Book}/>
          <Route path="/dashboard" component={Dashboard}/>
          
        </Switch>
        </BrowserRouter>
      </main>
      // <Router history = {browserHistory}>
      // <Router>
      // <Route path = "/" component = {App}>
      //    {/* <IndexRoute component = {Home} /> */}
      //    <Route path = "home" component = {Home} />
      //    <Route path = "book" component = {Book} />
      //    <Route path = "dashboard" component = {Dashboard} />
      // </Route>
      // </Router>

    )
}

export default App;
