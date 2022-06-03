import { ContextView } from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import BrandIcon from "./brand_icon.svg";
import { SessionContextProvider } from "../hooks/authentication/useSession";
import AuthGateway from "./auth-gateway/AuthGateway";

const App = (props: ExtensionContextValue) => {
  return (
    <SessionContextProvider>
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
    </SessionContextProvider>
  );
};

export default App;
