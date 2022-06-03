import { useCallback, useState } from "react"
import { isAPIError } from "../../utils/request"
import { saveAuthenticationToken } from '../../utils/authentication'
import { createSession } from "../../server/session"
import { useSession } from "./useSession"

export const useCreateSession = (userId: string) => {
  const [_, setSession] = useSession()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const createSessionAsync = useCallback(async (username: string, password: string) => {
    try {
      setIsLoading(true)
      const session = await createSession(username, password, userId)
      await saveAuthenticationToken(userId, session.token)
      setSession(session)
    } catch (e) {
      if (isAPIError(e)) {
        setError(e.reason)
      } else {
        setError('Something went wrong, please try again later')
      }
    } finally {
      setIsLoading(false)
    }
  }, [userId, setSession])

  return { createSession: createSessionAsync, error, isLoading }
}