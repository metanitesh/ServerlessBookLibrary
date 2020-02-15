import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../home/home';
import Library from '../library/library';
import Book from '../book/book';

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      authenticated : false,
      userId: null,
      accessType:'Free'
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.subscribe = this.subscribe.bind(this);
  }

  login(userId){
    this.setState({
      authenticated : true,
      userId : userId,
      accessType:'Free'
    })
  }

  logout(){
    this.setState({
      authenticated: false,
      userId : null,
      accessType:'Free'
    })
  }

  subscribe(){
    this.setState({
      accessType: 'Premium'
    })
  }


  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} authStatus={this.state.authenticated} login={this.login}/>} />
            <Route exact path="/library" render={(props) => <Library {...props} logout={this.logout} accessType={this.state.accessType} authStatus={this.state.authenticated}/>}/>
            <Route exact path="/book/:id" render={(props) => <Book {...props} logout={this.logout} accessType={this.state.accessType} subscribe={this.subscribe} authStatus={this.state.authenticated}/>}/>
          </Switch>
        </BrowserRouter>
      </>      
    )
  }
}

export default App;
