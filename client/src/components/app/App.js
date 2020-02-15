import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../home/home';
import Library from '../library/library';
import Book from '../book/book';
import AddBook from '../book/add-book';
import Auth from '../auth/auth';
import createHistory from 'history/createBrowserHistory';
import Callback from '../auth/callback'
const history = createHistory({forceRefresh:true});
const auth = new Auth(history)


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
    }
    this.auth = auth;
  }

  handleAuthentication = (props) => {
    const location = props.location
    if (/access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication()
    }
  }


  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} auth={this.auth}/>} />
            <Route path="/callback" render={props => <Callback {...props} handleAuthentication={this.handleAuthentication}/> }/>
            <Route exact path="/library" render={(props) => <Library {...props} auth={this.auth} />}/>
            <Route exact path="/book/:id" render={(props) => <Book {...props} auth={this.auth} />}/>
            <Route exact path="/addBook" render={(props) => <AddBook {...props} auth={this.auth} />}/>
            
          </Switch>
        </BrowserRouter>
      </>      
    )
  }
}

export default App;
