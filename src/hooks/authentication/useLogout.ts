import { useMutation, useQueryClient } from "react-query"
import { removeSession } from "../../server/session"
import { clearAuthenticationToken } from "../../utils/authentication"
import { getSessionKey } from "./useSession"

export const useLogout = (userId: string) => {
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: () => removeSession(userId), onSettled: async () => {
      await queryClient.resetQueries({ queryKey: getSessionKey(userId) })
      await clearAuthenticationToken(userId)
    }
  })

  return { logout: logoutMutation.mutate, isLoading: logoutMutation.isLoading }
}