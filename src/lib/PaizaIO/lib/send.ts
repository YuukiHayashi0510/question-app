import { get, post } from './util/fetch'
import { CreateParams, CreateResponse, GetDetailsResponse } from './util/types'

export async function sendToPaiza(
  code: string,
  input = ''
): Promise<CreateResponse> {
  const url = 'http://api.paiza.io:80/runners/create'
  const data: CreateParams = {
    source_code: code,
    language: 'python3',
    input: input,
    longpoll: true,
    api_key: 'guest',
  }

  return await post(url, data)
}

export async function getDetailsFromPaiza(
  sessionId: string
): Promise<GetDetailsResponse> {
  const url = `http://api.paiza.io/runners/get_details?id=${sessionId}&api_key=guest`
  return await get(url)
}
