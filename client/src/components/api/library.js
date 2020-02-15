import { apiEndpoint } from '../config'
import Axios from 'axios'


export async function getBooks(idToken) {
  console.log('Fetching books')

  const response = await Axios.get(`${apiEndpoint}/books`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Books:', response)
  return response.data
}

export async function getBooksById(idToken, bookId) {
  
  const response = await Axios.get(`${apiEndpoint}/books/${bookId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Books:', response)
  return response.data
}

export async function deleteBook(idToken, bookId) {
  
  const response = await Axios.delete(`${apiEndpoint}/books/${bookId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('delete:', response)
  return response.data
}


export async function addBook(idToken, book) {
  
  const response = await Axios.post(`${apiEndpoint}/books`, JSON.stringify(book), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  console.log('Books:', response)
  return response.data
}


export async function getUploadUrl(idToken,bookId){
  const response = await Axios.post(`${apiEndpoint}/books/${bookId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl, file){
  await Axios.put(uploadUrl, file)
}
