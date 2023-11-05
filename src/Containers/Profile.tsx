import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";

const Profile = () => {
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

  return (
    <div>
      Hello!
      {!npub && <button onClick={submitLinks}> Submit links </button>}
      {links.map((link) => (
        <div>{link}</div>
      ))}
    </div>
  );
};

export default Profile;
