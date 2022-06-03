import { useQuery } from "react-query"
import { getSession } from "../../server/session"
import { Session } from "../../types/session"
import { APIError } from "../../utils/request"

export const getSessionKey = (userId: string) => ['session', userId]

export const useSession = (userId: string) => {
  const { data, isLoading, error } = useQuery<Session, APIError>(getSessionKey(userId), { queryFn: () => getSession(userId), retry: false })

  return { session: data, error, isLoading }
}