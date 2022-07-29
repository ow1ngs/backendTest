import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export interface ResponseBody {
  success: boolean
  data?: any
  error?: string
}
export interface Response {
  statusCode?: number,
  body: ResponseBody
}


/**
 * Centralized response function for all functions.
 * @param response (ResponseBody) - Object with a set of attributes to respond
 * @returns response for the api gateway
 */
export const formatJSONResponse = (response: Response): any => {
  return {
    statusCode: response.statusCode || 200,
    body: JSON.stringify(response.body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'POST'
    }
  };
};
