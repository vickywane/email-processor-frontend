import DocumentWrapper from "./DocumentWrapper";

const Page = async ({ params }) => {
  return (
    <div>
      <DocumentWrapper docName={params?.slug} />
    </div>
  );
};

export default Page;
