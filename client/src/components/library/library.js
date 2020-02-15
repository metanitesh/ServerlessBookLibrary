import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../header/header"
import style from "./library.module.css"

class Library extends Component {
  _isRedirect = false;

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      books: [],
      selectedCategory: false
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
      fetch("https://ancient-springs-73658.herokuapp.com/categories")
      .then((response) => {
        return response.json();
      })
      .then((response) =>{
          this.setState({
            categories: response.categories
          })
        
      });

      fetch("https://ancient-springs-73658.herokuapp.com/books")
      .then((response) => {
        return response.json();
      })
      .then((response) =>{        
          this.setState({
            books: response.books
          })
        
      });
    }
  }

  setCategory(categoryId){
    this.setState({
      selectedCategory: categoryId
    })
  }

  logout(){
    this.props.logout();
    this.props.history.push('/')   
  }


  render() {
    const categoryListDom = this.state.categories.map((category) => {
      return <li key={category.id} onClick={() => { this.setCategory(category.id) }}>{category.title}</li>
    })

    const bookListDom = this.state
    .books
    .filter((book) => {
      if(this.state.selectedCategory){
        return book.category_id === this.state.selectedCategory
      }else{
        return true
      }
    })
    .map((book) => {
      return <li key={book.id}>
      <Link to= {`/book/${book.id}`}>
      <img  alt='bookImage' src={book.image_url} />
      <h5>{book.title}</h5>
      <p className={style.read}>Read</p>
      </Link>
      </li>
    })

    
    return (
      <>
      <Header pageName="discovery" accessType={this.props.accessType}/>
      <button className='logout' onClick={this.logout}> logout </button>
      <main className={style.library}>
        <section className={style.categories}>
          <ul>{categoryListDom}</ul>
        </section>
        <section className={style.books}>
          <ul>{bookListDom}</ul>
        </section>
      </main>
      </>
    );
  }
}

export default Library;