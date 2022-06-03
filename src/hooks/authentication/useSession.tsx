import { createContext, useContext, useState } from "react"
import { Session } from "../../types/session"

const SessionContext = createContext<[Session | undefined, (session: Session | undefined) => void]>([undefined, () => { throw new Error('Not implemented setSession') }])

interface Props {
  children: React.ReactNode
}

export const SessionContextProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | undefined>(undefined)

  return <SessionContext.Provider value={[session, setSession]}>{children}</SessionContext.Provider>
}

export const useSession = () => {
  return useContext(SessionContext)
}