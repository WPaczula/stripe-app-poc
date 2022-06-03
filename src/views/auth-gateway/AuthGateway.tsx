import { ExtensionContextValue } from '@stripe/ui-extension-sdk/context'
import { Banner, Spinner, Button } from '@stripe/ui-extension-sdk/ui'
import { useLoadSession } from '../../hooks/authentication/useLoadSession'
import { useLogout } from '../../hooks/authentication/useLogout'
import Login from '../login/Login'

const AuthGateway = ({ userContext }: ExtensionContextValue) => {
  const { session, isLoading: isSessionloading } = useLoadSession(userContext.id)
  const { logout, isLoading: isLogoutLoading } = useLogout(userContext.id)

  const onLogout = async () => {
    await logout()
  }

  if (isSessionloading) {
    return <Spinner size="large" />
  }

  if (!session) {
    return <Login userId={userContext.id} />
  }
  return (
    <Banner actions={
      <Button type="primary" onPress={onLogout}>{isLogoutLoading && <Spinner size="small" />}Logout</Button>
    }
      title="Welcome"
      description={`You are logged in as ${session.firstName} ${session.lastName}`}
    />
  )
}

export default AuthGateway