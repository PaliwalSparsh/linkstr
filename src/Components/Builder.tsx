import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";
import Header from "./Header";
import Welcome from "./Welcome";
import Collection from "./Collection";
import TitleAndDescription from "./TitleAndDescription";

// Types
export type Mode = "welcome" | "edit" | "preview";

const tempLinks = ["google.com", "youtube.com"];

const Builder = () => {
  const [showWelcome, setShowWelcome] = useState(true);
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

  const DragAndDrop = () => {};

  return (
    <div className="mx-auto w-[60rem]">
      {showWelcome && <Welcome onGetStarted={() => setShowWelcome(false)} />}
      <div className={`h-full w-full ${showWelcome ? "blur-xl" : ""}`}>
        <div className="h-full w-full">
          <Header mode="edit" />
          <div className="mx-auto w-[40rem]">
            <TitleAndDescription />
            <Collection />
            {/* Footer */}
            <div className="pb-[12rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;

/*
    <div>
      Hello!
      {!npub && (
        <button className="font-serif" onClick={submitLinks}>
          Submit links
        </button>
      )}
      {links.map((link) => (
        <div>{link}</div>
      ))}
    </div>
*/
