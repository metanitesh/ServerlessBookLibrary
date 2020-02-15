import React, { Component } from 'react';
import Header from '../header/header'
import style from './addbook.module.css'
import {addBook, getUploadUrl, uploadFile} from "../api/library"

const UploadState = {
  "NoUpload": "NoUpload",
  "SavingData":"SavingData......",
  "UpladingFile":"UploadingFile......",
  "FetchingPresignedUrl": "FetchingPresignedUrl......",
  "UploadingFile":"UploadingFile....."
}

class AddBook extends Component {
  _isRedirect = false;

  constructor(props){
    super(props);
    this.state = {
      title: false,
      summary: false,
      isbn: false,
      file: false,
      UploadState: UploadState.NoUpload
    }

    this.setUploadState = this.setUploadState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleInputChange =this.handleInputChange.bind(this)
  }

  componentWillMount(){
    if(!this.props.auth.isAuthenticated()){
      this.props.history.push('/')
      this._isRedirect = true;
    }
  }

  setUploadState(newState) {
    this.setState({
      UploadState: newState
    })
  }


  handleSubmit = async (event) => {
    event.preventDefault()

    if(!this.state.title || !this.state.summary || !this.state.isbn){
      alert("All fields are required");
      return
    }


    const bookObj = {
      title:this.state.title,
      description:this.state.summary,
      isbn:this.state.isbn,

    }

    this.setUploadState(UploadState.SavingData);
    const result = await addBook(this.props.auth.getIdToken(), bookObj);
    const uploadedBook = result.item;

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.FetchingPresignedUrl)
      const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), uploadedBook.id)


      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadUrl, this.state.file)

      alert('File was uploaded!')
    } catch (e) {
      alert('Could not upload a file: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }


  handleFileChange = (event) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }


  handleInputChange = (event) => {
    const value = event.target.value
    const id = event.target.id;
    if (!value) return

    this.setState({
      [id]: value
    })
  }

  render() {
    
    return (
    <>
    <Header pageName="Add Book" accessType={this.props.accessType}/>
    <form className={style.addForm} onSubmit={this.handleSubmit}>
      

        <label> Book Name*</label>
        <input id="title" className="title" 
          type="text" 
          placeholder="Pragmatic programmer" 
          required 
          onChange={this.handleInputChange}
        />
        <br />

        <label> ISBN:*</label>
        <input id="isbn" className="isbn" 
          type="text" 
          required 
          placeholder="9780545791427"
          onChange={this.handleInputChange}
        />
        <br />
        
        <label> Book Summary*</label>
        <textarea id="summary" className="summary"
          type="text" 
          placeholder="Pragmatic Programmers […] think beyond
          the immediate problem, always trying to
          place it in its larger context, always trying to
          be aware of the bigger picture. They think
          critically."
          required 
          onChange={this.handleInputChange}
        />
        <br />


          <label>File*</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Image to upload"
            onChange={this.handleFileChange}
          />
          <span className={style.uploadStatus}>{this.state.UploadState}</span>
          <br />
      
        
        <button>Add Book!</button>

    	</form>
      </>
    );
  }
}

export default AddBook;
