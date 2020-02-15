import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateBookRequest } from '../../requests/UpdateBookRequest'
import { createLogger } from '../../utils/logger'
import { updateBook } from '../../business-logic/books'
const logger = createLogger('update')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const bookId = event.pathParameters.bookId
  logger.info("Processing the update todo request for :", bookId)
  const updatedTodo: UpdateBookRequest = JSON.parse(event.body)
  await updateBook(bookId, updatedTodo)

  logger.info("Update todo request was successful", bookId)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ""
  }
}
