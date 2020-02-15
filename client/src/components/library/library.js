import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../header/header"
import style from "./library.module.css"
import {getBooks, deleteBook} from "../api/library"


class Library extends Component {
  _isRedirect = false;

  constructor(props){
    super(props);
    this.state = {
      categories: ['Productivity', 'Economics', 'History', 'Science'],
      books: [],
      userId: false,
      deleteBookId:false
    }
  
    this.logout = this.logout.bind(this);
    this.handleBrokenImage = this.handleBrokenImage.bind(this);
  
  }

  componentWillMount(){
    if(!this.props.auth.isAuthenticated()){
      
      this.props.history.push('/')
      this._isRedirect = true;
    }else{
      this.setState({
        userId: this.props.auth.getUserId()
      })
    }
  }

  async componentDidMount() {
    if(!this._isRedirect){
      const result = await getBooks(this.props.auth.getIdToken());
      
      this.setState({
          books: result
      })
      
    }
  }

  logout(){
    this.props.auth.logout();
  }

  handleBrokenImage(event){
    event.target.src = "./default-book.png"
  }

  async handleDelete(event, id){
    event.preventDefault();
    const result = await deleteBook(this.props.auth.getIdToken(), id);
    alert("book delete successful");
    console.log(result)
    this.setState({
      books: this.state.books.filter(book => book.id != id)
    })

    
  }

  render() {
    const categoryListDom = this.state.categories.map((category) => {
      return <li key={category}>{category}</li>
    })

    

    const bookListDom = this.state
    .books
    .map((book) => {

      let deleteMarkup = false
      if(book.userId === this.state.userId){
        deleteMarkup = <button className={style.deleteButton}  onClick={e => this.handleDelete(e, book.id)}>Delete</button>
      }else{
        deleteMarkup = <></>
      }

      return <li key={book.id}>
      <Link to= {`/book/${book.id}`}>
      <img  alt='bookImage'  onError={this.handleBrokenImage} src={book.attachmentUrl} />
      <h5>{book.title}</h5>
      <p className={style.description}>Read</p>
      
      {deleteMarkup}
      </Link>
      </li>
    })

    
    return (
      <>
      <Header pageName="discovery" accessType={this.props.accessType}/>
      <Link className={style.addBook} to="/addbook">Add-Book</Link>
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