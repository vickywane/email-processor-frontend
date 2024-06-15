import Header from "@/components/header";
import DocumentWrapper from "./DocumentWrapper";

const Page = async ({ params }) => {
  return (
    <div>
      <Header />

      <DocumentWrapper docName={params?.slug} />
    </div>
  );
};

export default Page;
