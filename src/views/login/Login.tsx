import { useState } from "react";
import { Banner, Box, Button, Spinner, TextField, } from "@stripe/ui-extension-sdk/ui";
import { useSession } from "../../hooks/authentication/useSession";
import { useCreateSession } from "../../hooks/authentication/useCreateSession";

interface Props {
  userId: string
}

const Login = ({ userId }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { session, isLoading: isSessionLoading, error: sessionError } = useSession(userId)
  const { createSession, error: createSessionError, isLoading: isCreateSessionLoading } = useCreateSession(userId, username, password)

  const onLogIn = async () => {
    await createSession()
  }

  if (isSessionLoading && !session && !sessionError) {
    return <Spinner size="large" />
  }

  return (
    <>
      {session && <Banner type='default' title={'Welcome'} description={`You are logged as ${session.firstName} ${session.lastName}`} />}
      {createSessionError && <Banner type="critical" title="Error" description={createSessionError.reason} />}
      <Box css={{ marginTop: 'small', height: "3/12", stack: "y", distribute: 'space-between' }}>
        <TextField label="Email" onChange={(e) => { setUsername(e.currentTarget.value) }} defaultValue={username} />
        <TextField label="Password" onChange={(e) => { setPassword(e.currentTarget.value) }} defaultValue={password} type="password" />
        <Button type="primary" css={{ width: 'fill', alignX: 'center' }} onPress={onLogIn} disabled={isCreateSessionLoading}>{isCreateSessionLoading && <Spinner size="small" />}Log in</Button>
      </Box>
    </>
  );
};

export default Login;
