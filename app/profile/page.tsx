import Header from "@/components/header";
import ProfileHero from "@/components/profile/ProfileHero";
import AuthenticationProviderWrapper from "../AuthentionProviderWrapper";

const Page = () => {
  return (
    <AuthenticationProviderWrapper>
      <div>
        <Header />
        <br />

        <ProfileHero />
      </div>
    </AuthenticationProviderWrapper>
  );
};

export default Page;
