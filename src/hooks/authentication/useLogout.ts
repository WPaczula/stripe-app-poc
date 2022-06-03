import { useCallback, useState } from "react"
import { removeSession } from "../../server/session"
import { clearAuthenticationToken } from "../../utils/authentication"
import { isAPIError } from "../../utils/request"
import { useSession } from "./useSession"

export const useLogout = (userId: string) => {
  const [_, setSession] = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await removeSession(userId)
    } catch (e) {
      if (isAPIError(e)) {
        console.log(e.reason)
      } else {
        console.log(e)
      }
    }
    finally {
      setSession(undefined)
      setIsLoading(false)
      await clearAuthenticationToken(userId)
    }
  }, [userId, setSession])

  return { logout, isLoading }
}