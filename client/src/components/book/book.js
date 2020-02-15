import React, { Component } from 'react';
import Header from '../header/header'
import style from './book.module.css'
import {getBooksById} from "../api/library"

class Book extends Component {
  _isRedirect = false;

  constructor(props){
    super(props);
    this.state = {
      book:{}
    }
  }

  componentWillMount(){
    if(!this.props.auth.isAuthenticated()){
      this.props.history.push('/')
      this._isRedirect = true;
    }
  }

  async componentDidMount() {
    if(!this._isRedirect){
      const bookId = this.props.match.params.id
      const idToken = this.props.auth.getIdToken()

      const result = await getBooksById(idToken, bookId);
      this.setState({
        book: result
      })  

    }
  }



  render() {

    return (
      <>

      
      <button className='logout' onClick={this.props.auth.logout}> logout </button>
      <main className={style.container}>
        <h1 className={style.heading}>{this.state.book.title || 'loading...'}</h1>
        <p className={style.paragraph}>{this.state.book.description}</p>
      </main>
      
      </>
    );
  }
}

export default Book;
