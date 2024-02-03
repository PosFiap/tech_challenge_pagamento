import https from 'node:https'
import { HTTPRequest, HTTPResponse, HTTPStatusCode, IHTTP } from '../gateways/common/IHTTP'

export class HTTPClient implements IHTTP {
  async request<T>(config: HTTPRequest): Promise<HTTPResponse<T>> {
    const options = {
      host: config.host,
      path: config.path,
      headers: config.headers,
      method: config.method
    }

    return new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        response.on('data', (d) => {
          resolve({
            statusCode: response.statusCode as HTTPStatusCode,
            body: d
          })
        })
      })

      if (config.body) {
        req.write(JSON.stringify(config.body))
      }

      req.on('error', (error) => {
        console.error(error)
        reject(new Error('Erro ao tentar efetuar a request!'))
      })

      req.end()
    })
  }
}
