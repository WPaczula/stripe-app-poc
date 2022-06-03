import { useState } from "react";
import { Banner, Box, Button, Spinner, TextField, } from "@stripe/ui-extension-sdk/ui";
import { useLoadSession } from "../../hooks/authentication/useLoadSession";
import { useCreateSession } from "../../hooks/authentication/useCreateSession";

interface Props {
  userId: string
}

const Login = ({ userId }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { session } = useLoadSession(userId)
  const { createSession, error: createSessionError, isLoading: isCreateSessionLoading } = useCreateSession(userId)

  const onLogIn = async () => {
    await createSession(username, password)
  }

  return (
    <>
      {session && <Banner type='default' title={'Welcome'} description={`You are logged as ${session.firstName} ${session.lastName}`} />}
      {createSessionError && <Banner type="critical" title="Error" description={createSessionError} />}
      <Box css={{ marginTop: 'small', height: "3/12", stack: "y", distribute: 'space-between' }}>
        <TextField label="Email" onChange={(e) => { setUsername(e.currentTarget.value) }} defaultValue={username} />
        <TextField label="Password" onChange={(e) => { setPassword(e.currentTarget.value) }} defaultValue={password} type="password" />
        <Button type="primary" css={{ width: 'fill', alignX: 'center' }} onPress={onLogIn} disabled={isCreateSessionLoading}>{isCreateSessionLoading && <Spinner size="small" />}Log in</Button>
      </Box>
    </>
  );
};

export default Login;
