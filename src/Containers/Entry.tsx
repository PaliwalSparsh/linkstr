import { useParams } from "react-router-dom";
import WelcomeOverlay from "./WelcomeOverlay";
import CollectionViewer from "./CollectionViewer";
import CollectionBuilder from "./CollectionBuilder";

const Entry = () => {
  const { npub } = useParams();

  return (
    <>
      <WelcomeOverlay />
      {npub ? <CollectionViewer npub={npub} /> : <CollectionBuilder />}
    </>
  );
};

export default Entry;
