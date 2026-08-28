import { useState } from "react";
import { motion } from "framer-motion";
import successArt from "../Images/success.svg";
import Button from "../Components/Button";

function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    },
  );
}

const SuccessOverlay = ({
  publishUrl,
  onCreateNew,
}: {
  publishUrl: string;
  onCreateNew: () => void;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(publishUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="fixed left-0 top-0 z-20 flex min-h-full min-w-full items-center justify-center bg-white/60 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-2">
        <img src={successArt} alt="" className="h-12" />
        <div className="text-lg font-bold">Your link collection is live!</div>
        <div className="text-xs font-medium">
          Share your perfect link collection with friends and family
        </div>

        <motion.input
          initial={{ backgroundColor: "rgb(229, 231, 235)" }}
          whileHover={{ backgroundColor: "rgb(209, 213, 219)" }}
          whileTap={{ backgroundColor: "rgb(156, 163, 175)" }}
          type="text"
          value={publishUrl}
          readOnly
          className="mt-8 w-80 cursor-default rounded-lg px-3 py-2 text-xs font-medium outline-none"
        />

        <div>
          <Button className="button mt-2 w-80 py-2" onClick={handleCopy}>
            {isCopied ? "Copied!" : "Copy link"}
          </Button>
        </div>

        <div>
          <Button
            className="button-secondary mt-8 w-80 py-2"
            onClick={onCreateNew}
          >
            Create new collection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOverlay;
