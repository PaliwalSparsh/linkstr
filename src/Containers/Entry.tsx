import { useParams } from "react-router-dom";
import WelcomeOverlay from "./WelcomeOverlay";
import ViewCollection from "./ViewCollection";
import EditCollection from "./EditCollection";

const Entry = () => {
  const { npub } = useParams();

  // show welcome page if localstorage doesn't have showwelcome boolean
  // if params have npub show view collection
  // if params don't have npub show create collection

  return (
    <>
      <WelcomeOverlay />
      {npub ? <ViewCollection npub={npub} /> : <EditCollection />}
    </>
  );
};

export default Entry;
