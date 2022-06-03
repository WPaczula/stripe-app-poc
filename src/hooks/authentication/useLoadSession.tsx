import { useCallback, useEffect, useState } from "react"
import { getSession } from "../../server/session"
import { isAPIError } from "../../utils/request"
import { useSession } from "./useSession"

export const useLoadSession = (userId: string) => {
  const [session, setSession] = useSession()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const getSessionAsync = async () => {
      try {
        setIsLoading(true)
        const session = await getSession(userId)
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
    }
    getSessionAsync()
  }, [userId, setSession])

  return { session, error, isLoading }
}