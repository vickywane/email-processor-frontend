import Onboarding from "@/components/Onboarding";
import Header from "@/components/header";
import Integrations from "@/components/integrations";
import AuthenticationProviderWrapper from "./AuthentionProviderWrapper";

export default function Home() {
  return (
    <AuthenticationProviderWrapper>
      <div>
        <Header />

        <div className="max-w-[1200px] m-auto">
          <br />

          <Onboarding />
        </div>
      </div>
    </AuthenticationProviderWrapper>
  );
}
