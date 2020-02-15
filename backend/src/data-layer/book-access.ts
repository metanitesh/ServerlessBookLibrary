import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { Book } from '../models/book'
import { UpdateBookRequest } from '../requests/UpdateBookRequest'

export class BookAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly bookTable = process.env.LIBRARY_TABLE) {
  }

  async getAllBooks(): Promise<Book[]> {

    const result = await this.docClient.scan({
      TableName : this.bookTable
    }).promise()


    const items = result.Items
    return items as Book[]
  }

  // async getAllTodos(userId: string): Promise<Todo[]> {

  //   const result = await this.docClient.query({
  //     TableName : this.bookTable,
  //     KeyConditionExpression: 'userId = :userId',
  //     IndexName: this.bookIndex,
  //     ExpressionAttributeValues: {
  //         ':userId': userId
  //     }
  //   }).promise()


  //   const items = result.Items
  //   return items as Todo[]
  // }

  async createBook(book: Book) : Promise<Book>{
    
    await this.docClient.put({
      TableName: this.bookTable,
      Item: book
    }).promise()

    return book;
  }

  async updateBook(bookId: string, updateTodo: UpdateBookRequest) : Promise<string>{
    
    const params = {
      TableName: this.bookTable,
      Key: {
          "id": bookId
      },
      UpdateExpression: "set title = :x, description = :y, isbn = :z",
      ExpressionAttributeValues: {
          ":x": updateTodo.title,
          ":y": updateTodo.description,
          ":z": updateTodo.isbn
      }
    };
  
    await this.docClient.update(params).promise();

    return "";
  }


  async deleteBook(bookId: string) : Promise<string>{
    const params = {
      TableName:this.bookTable,
      Key: {
        "id": bookId
      }
    };
  
    await this.docClient.delete(params).promise();

    return "";
  }


}

