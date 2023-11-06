import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";

const Builder = () => {
  const tempLinks = ["google.com", "youtube.com"];

  const [links, setLinks] = useState([]);

  const { npub } = useParams();

  useEffect(() => {
    async function get() {
      if (npub) {
        let event = await getLinkCollection(npub);
        let parsedLinks = JSON.parse(event[0]?.content);
        setLinks(parsedLinks);
      }
    }
    get();
  }, []);

  async function submitLinks() {
    const response = await createLinkCollection(tempLinks);
    console.log(response);
  }

  // Each will have a edit and a preview version

  const WelcomeOverlay = () => {};

  const Header = () => {};
  const TitleAndDescription = () => {};
  const Collection = () => {};
  const Link = () => {};

  return (
    <div>
      Hello!
      {!npub && (
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500"
          onClick={submitLinks}
        >
          {" "}
          Submit links{" "}
        </button>
      )}
      {links.map((link) => (
        <div>{link}</div>
      ))}
    </div>
  );
};

export default Builder;

/*
1. Think about state
2. React list dnd
*/
