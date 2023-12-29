import {
  CreateResponse,
  CreateParams,
  GetDetailsResponse,
} from '~/types/infrastructure/paiza'
import { PaizaClient } from './paizaClient'

export default abstract class PaizaRepository {
  static get client() {
    return new PaizaClient()
  }

  static async getResults(sessionId: string): Promise<GetDetailsResponse> {
    const url = `http://api.paiza.io/runners/get_details?id=${sessionId}&api_key=guest`
    return await this.client.get(url)
  }

  static async postCode(code: string, input = ''): Promise<CreateResponse> {
    const url = 'http://api.paiza.io:80/runners/create'
    const data: CreateParams = {
      source_code: code,
      language: 'python3',
      input: input,
      longpoll: true,
      api_key: 'guest',
    }

    return await this.client.post(url, data)
  }
}
