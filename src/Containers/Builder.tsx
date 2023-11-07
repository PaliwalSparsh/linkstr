import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";
import linkstrLogo from "../Images/logo.svg";
import linkIcon from "../Images/link.svg";
import cancelIcon from "../Images/cancel.svg";

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

  const WelcomeOverlay = () => {
    return (
      <div>
        <Header mode="welcome" />
      </div>
    );
  };

  type Mode = "welcome" | "edit" | "preview";

  const Header = ({ mode }: { mode: Mode }) => {
    const Logo = (
      <div className="flex flex-row items-center">
        <img src={linkstrLogo} alt="logo" className="pr-1.5 h-8" />
        <span className="font-serif leading-none pt-1">Linkstr</span>
      </div>
    );

    const PublishButton = (
      <div>
        <button className="button">Publish</button>
      </div>
    );

    return (
      <div className="flex justify-between mt-8">
        {Logo}
        {mode === "edit" && PublishButton}
      </div>
    );
  };
  const TitleAndDescription = () => {
    return (
      <div className="text-center mx-auto mt-14">
        <div className="font-serif text-6xl leading-none">
          Top 10 travel destinations in India
        </div>
        <div className="text-black/40 text-xs">
          <span>curated by – </span>
          <span className="font-bold">SPARSH PALIWAL</span>
          <span className="font-bold"> • 5 Nov 2022</span>
        </div>
        <div className="text-black/60 text-lg pt-6">
          Embark on a Journey Through India's Most Enchanting Destinations
        </div>
      </div>
    );
  };

  const Link = ({
    name,
    url,
    description,
  }: {
    name: String;
    url: String;
    description: String;
  }) => {
    return (
      <div className="flex flex-col py-6 border-b relative">
        <div className="flex justify-center items-center h-8 w-8 rounded-full opacity-60 cursor-pointer hover:bg-black/5 hover:opacity-90 active:bg-black/20 active:opacity-100 absolute -right-2.5 transition-all duration-200">
          <img src={cancelIcon} alt="" />
        </div>
        <div className="flex flex-row items-center">
          <img src={linkIcon} alt="" />
          <div className="text-xl font-serif pt-1.5 pl-2">{name}</div>
        </div>
        <div className="text-sm text-black/40 pt-[-1]">{url}</div>
        <div className="text-black/60 pt-3">{description}</div>
      </div>
    );
  };

  const Footer = () => {
    return <div className="pb-[12rem]"></div>;
  };

  const Collection = () => {
    return (
      <div className="mt-8">
        <Link
          name="Jaipur, Rajasthan"
          url="https://www.example.com/jaipur"
          description="Discover the Pink City's rich heritage and vibrant culture."
        />
        <Link
          name="Jaipur, Rajasthan"
          url="https://www.example.com/jaipur"
          description="Discover the Pink City's rich heritage and vibrant culture."
        />
        <Link
          name="Jaipur, Rajasthan"
          url="https://www.example.com/jaipur"
          description="Discover the Pink City's rich heritage and vibrant culture."
        />
        <Link
          name="Jaipur, Rajasthan"
          url="https://www.example.com/jaipur"
          description="Discover the Pink City's rich heritage and vibrant culture."
        />
        <Link
          name="Jaipur, Rajasthan"
          url="https://www.example.com/jaipur"
          description="Discover the Pink City's rich heritage and vibrant culture."
        />
        <Link
          name="Jaipur, Rajasthan"
          url="https://www.example.com/jaipur"
          description="Discover the Pink City's rich heritage and vibrant culture."
        />
      </div>
    );
  };

  const DragAndDrop = () => {};

  return (
    <div className="w-[60rem] mx-auto">
      <WelcomeOverlay />
      {/* <div className="w-full h-full blur-xl"></div> */}
      <div className="w-full h-full">
        <Header mode="edit" />
        <div className="w-[40rem] mx-auto">
          <TitleAndDescription />
          <Collection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Builder;

/*
1. Think about state
2. React list dnd
*/

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
