import 'source-map-support/register'

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { createLogger } from '../../utils/logger'
import { getAllBooks } from '../../business-logic/books';
const logger = createLogger('getbooks')

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  
  const result = await getAllBooks();
  logger.info('Processing the fetch request for books : ',  result)

  if (result.length !== 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(result)
    }
  }
  
  logger.error('Fetch request for books failed', result);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(result)
  }

}
