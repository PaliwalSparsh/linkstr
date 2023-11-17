import successArt from "../Images/success.svg";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    },
  );
}

const SuccessOverlay = ({ publishUrl }: { publishUrl: string }) => {
  return (
    <div className="fixed left-0 top-0 z-20 min-h-full min-w-full bg-white/60 backdrop-blur-xl">
      <div className="mt-[30vh] flex flex-col items-center gap-2">
        <img src={successArt} alt="" className="h-12" />
        <div className="text-lg font-bold">Your link collection is live!</div>
        <div className="text-xs font-medium">
          Share your perfect link collection with friends and family
        </div>

        <input
          type="text"
          value={publishUrl}
          readOnly
          className="mt-8 w-80 rounded-lg bg-gray-200 px-3 py-2 text-xs font-medium outline-none"
        />

        <div>
          <button
            className="button mt-2 w-80 py-2"
            onClick={() => copyToClipboard(publishUrl)}
          >
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOverlay;
