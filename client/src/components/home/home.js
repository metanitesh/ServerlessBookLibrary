import React, { Component } from 'react';
import style from './home.module.css';
import Header from './../header/header'

class Home extends Component {

  constructor(props){
    super(props);
    this.login = this.login.bind(this)
  }
  
  componentDidMount(){
    if(this.props.auth.isAuthenticated()){
      this.props.history.push('/library');
    }
  }

  login(e){
    e.preventDefault();
    this.props.auth.login()
  }

  render() {
    return (
      <>
      <Header pageName='Log in'/>
      <main className={style.main}>
        <form onSubmit={this.login}>
          <button id='login' className={style.loginButton}>Login</button>
        </form>
      </main>
      </>
    );
  }
}

export default Home;
