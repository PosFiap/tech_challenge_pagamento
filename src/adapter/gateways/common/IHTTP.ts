export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export enum HTTPStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export interface HTTPRequest {
  host: string
  method: HTTPMethod
  path?: string
  body?: any
  headers?: any
}

export interface HTTPResponse<T = any> {
  statusCode: HTTPStatusCode
  body?: T
}

export interface IHTTP {
  request<T>(config: HTTPRequest): Promise<HTTPResponse<T>>
}
