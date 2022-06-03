import axios, { AxiosResponse } from 'axios'
import { getConfig } from '../../config'
import { getAuthenticationToken } from './authentication'
import queryString from 'query-string'

const { apiURL } = getConfig()

function handleResponse<ResponseData>(request: Promise<AxiosResponse<ResponseData>>) {
  return request.then((res) => res.data).catch(handleError)
}

export interface APIError {
  reason: string
  status: number
}

export const isAPIError = (e: any): e is APIError => {
  return e.reason !== undefined && e.status !== undefined
}

const handleError = (e: any) => {
  const reason =
    (e.response &&
      e.response.data &&
      e.response.data.errors &&
      e.response.data.errors[0] &&
      e.response.data.errors[0].message) ||
    'Something went wrong, please try again later'
  const status = (e.response && e.response.status) || 400

  return Promise.reject({ reason, status })
}

const formatQuery = <T extends object>(query?: T): string => {
  if (query === undefined) {
    return ''
  }

  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => !(value === '' || value === null || value === undefined),
    ),
  )
  const stringifiedQuery = queryString.stringify(filteredQuery, {
    arrayFormat: 'comma',
  })
  return stringifiedQuery ? `?${stringifiedQuery}` : ''
}

export async function get<ResponseData, Query extends object = Record<string, any>>(
  path: string,
  userId: string,
  query?: Query,
) {
  return handleResponse(
    axios.get<ResponseData>(`${apiURL}${path}${formatQuery(query)}`, {
      headers: {
        authorization: await getAuthenticationToken(userId),
      },
    }),
  )
}

const requestWithBodyFactory = <RequestData, ResponseData>(
  method: 'put' | 'post' | 'patch',
  path: string,
  userId: string,
  data?: RequestData,
) => async () => {
  const headers: any = {
    'Content-Type': 'application/json',
  }
  const authorization = await getAuthenticationToken(userId)
  if (authorization) {
    headers.authorization = authorization
  }

  return handleResponse(
    axios[method]<RequestData, AxiosResponse<ResponseData>>(
      `${apiURL}${path}`,
      data,
      {
        headers,
      },
    ),
  )
}

export const post = <RequestData, ResponseData>(
  path: string,
  userId: string,
  data?: RequestData,
) => requestWithBodyFactory<RequestData, ResponseData>('post', path, userId, data)()

export async function deleteRequest<ResponseData>(path: string, userId: string) {
  const headers: any = {
    'Content-Type': 'application/json',
    authorization: await getAuthenticationToken(userId),
  }

  return handleResponse(
    axios.delete<AxiosResponse<ResponseData>>(`${apiURL}${path}`, {
      headers,
    }),
  )
}