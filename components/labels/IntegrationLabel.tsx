import { GoLinkExternal } from "react-icons/go";
import { IoIosLink } from "react-icons/io";

const extractHyphensFromText = (text: string) => {
  return text.split("-").join(" ");
};

interface IntegrationLabelProps {
  label: string;
  documentLink?: string;
}

const dynamicLabel = (label: string, documentLink?: string) => {
  switch (label) {
    case "google-spreadsheet":
      return (
        <div>
          <div className="flex flex-row bg-[green] hover:cursor-pointer rounded-full px-4 py-2">
            <p className="text-sm text-white capitalize">
              {extractHyphensFromText(label)}
            </p>

            {documentLink && (
              <div className="ml-1">
                <IoIosLink color="white" fontSize={18} />
              </div>
            )}
          </div>
        </div>
      );

    case "google.com":
      return (
        <div>
          <div className="flex flex-row bg-[green] hover:cursor-pointer rounded-full px-4 py-2">
            <p className="text-sm text-white capitalize">Google</p>
          </div>
        </div>
      );
    default:
      return (
        <p className="text-sm text-white capitalize">
          {extractHyphensFromText(label)}
        </p>
      );
  }
};

const IntegrationLabel = ({ label, documentLink }: IntegrationLabelProps) => {
  return (
    <div>
      {documentLink ? (
        <a href={documentLink || "#"} target="_blank">
          {dynamicLabel(label)}
        </a>
      ) : (
        dynamicLabel(label)
      )}
    </div>
  );
};

export default IntegrationLabel;
