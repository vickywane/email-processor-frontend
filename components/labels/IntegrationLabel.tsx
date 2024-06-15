import { GoLinkExternal } from "react-icons/go";
import { IoIosLink } from "react-icons/io";

const extractHyphensFromText = (text: string) => {
  return text.split("-").join(" ");
};

interface IntegrationLabelProps {
  label: string;
  documentLink?: string;
}

const dynamicLabel = (label: string) => {
  switch (label) {
    case "google-spreadsheet":
      return (
        <div>
          <div className="flex flex-row bg-[green] hover:cursor-pointer rounded-full px-4 py-2">
            <p className="text-sm text-white capitalize">
              {extractHyphensFromText(label)}
            </p>

            <div className="ml-1">
              <IoIosLink color="white" fontSize={18} />
            </div>
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
    <a href={documentLink || "#"} target="_blank">
      {dynamicLabel(label)}
    </a>
  );
};

export default IntegrationLabel;
