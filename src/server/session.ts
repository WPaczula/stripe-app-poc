import { deleteRequest, get, post } from '../utils/request'
import { Session } from '../types/session'

interface CreateSessionDto {
  username: string
  password: string
}

export const createSession = (username: string, password: string, userId: string) => {
  return post<CreateSessionDto, Session>('/sessions', userId, { username, password })
}

export const getSession = (userId: string) => {
  return get<Session>('/sessions', userId)
}

export const removeSession = (userId: string) => {
  return deleteRequest<void>('/sessions', userId)
}