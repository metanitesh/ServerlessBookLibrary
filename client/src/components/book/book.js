import React, { Component } from 'react';
import Header from '../header/header'
import style from './book.module.css'

class Book extends Component {
  _isRedirect = false;

  constructor(props){
    super(props);
    this.state = {
      book:{}
    }
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    if(!this.props.authStatus){
      this.props.history.push('/')
      this._isRedirect = true;
    }
  }

  componentDidMount() {
    if(!this._isRedirect){
    fetch(`https://ancient-springs-73658.herokuapp.com/books/${this.props.match.params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) =>{
        this.setState({
          book: myJson
        })
      });
    }
  }

  subscribe(){
    this.props.subscribe();
  }

  logout(){
    this.props.logout();
    this.props.history.push('/')   
  }

  render() {
    let cta = '';
    if(this.props.accessType === 'Free'){
      cta = 
        <section className={style.ctaScreen}> 
          <button onClick= {this.props.subscribe} className={style.button}>Subscribe to Read</button>
        </section>
    }
    
    

    return (
      <>

      <Header pageName="Discover Books" accessType= {this.props.accessType}/>
      <button className='logout' onClick={this.logout}> logout </button>
      <main className={style.container}>
        <h1 className={style.heading}>{this.state.book.title || 'loading...'}</h1>
        <p className={style.paragraph}>{this.state.book.content}</p>
        <p className={style.paragraph}>{this.state.book.content}</p>
      </main>
      {cta}
      </>
    );
  }
}

export default Book;
