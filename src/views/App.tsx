import React from 'react'
import { ContextView } from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import BrandIcon from "./brand_icon.svg";
import AuthGateway from "./auth-gateway/AuthGateway";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient()


const App = (props: ExtensionContextValue) => {
  return (
    <QueryClientProvider client={client}>
      <ContextView
        title="Yordex app"
        brandColor="#f7f8fa"
        brandIcon={BrandIcon}
        externalLink={{
          label: "Go to yordex plaftorm",
          href: "https://new-app.dev.yordex.com"
        }}
      >
        <AuthGateway {...props} />
      </ContextView >
    </QueryClientProvider>
  );
};

export default App;
