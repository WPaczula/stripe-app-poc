import { APIError } from "../../utils/request"
import { saveAuthenticationToken } from '../../utils/authentication'
import { createSession } from "../../server/session"
import { useMutation, useQueryClient } from "react-query"
import { Session } from "../../types/session"

export const useCreateSession = (userId: string, username: string, password: string) => {
  const queryClient = useQueryClient()
  const createSessionMutation = useMutation<Session, APIError>({
    mutationFn: () => createSession(username, password, userId), onSuccess: async (session) => {
      queryClient.setQueryData(['session', userId], session)
      await saveAuthenticationToken(userId, session.token)
    }
  })

  return { createSession: createSessionMutation.mutate, error: createSessionMutation.error, isLoading: createSessionMutation.isLoading }
}