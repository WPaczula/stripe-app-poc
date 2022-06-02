import { Banner, Box, Button, ContextView, TextField } from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import BrandIcon from "./brand_icon.svg";
import { useState, useCallback } from "react";

const App = ({ userContext, environment }: ExtensionContextValue) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<any | undefined>(undefined)
  const [error, setError] = useState<string>('')
  const onLogIn = useCallback(() => {
    fetch('https://new-app.dev.yordex.com/api/sessions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username, password }), })
      .then(res => res.json())
      .then(res => {
        setSession(res)
      }).catch(e => {
        setError(e.message)
      })
  }, [username, password])

  return (
    <ContextView
      title="Yordex app"
      brandColor="#f7f8fa"
      brandIcon={BrandIcon}
      externalLink={{
        label: "Go to yordex plaftorm",
        href: "https://new-app.dev.yordex.com"
      }}
    >
      {error && <Banner type="critical" title="Error" description={error} />}
      <Box css={{ marginTop: 'small', height: "auto", stack: "y", alignY: 'top' }}>
        <TextField label="Email" onChange={(e) => { setUsername(e.currentTarget.value) }} defaultValue={username} />
        <TextField label="Password" onChange={(e) => { setPassword(e.currentTarget.value) }} defaultValue={password} type="password" />
        <Box css={{ marginTop: 'small' }}>
          <Button onPress={onLogIn}>Log in</Button>
        </Box>
        {session && <Banner title={'Welcome'} description={`You are logged in to yordex as: ${session.firstName} ${session.lastName}`} />}
      </Box>
    </ContextView >
  );
};

export default App;
