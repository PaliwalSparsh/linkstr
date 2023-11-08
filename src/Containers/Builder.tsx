import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";
import linkstrLogo from "../Images/logo.svg";
import linkIcon from "../Images/link.svg";
import cancelIcon from "../Images/cancel.svg";
import background from "../Images/background.png";
import downArrowArt from "../Images/downArrowArt.png";

const Builder = () => {
  const tempLinks = ["google.com", "youtube.com"];

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

  // Each will have a edit and a preview version

  const WelcomeOverlay = () => {
    return (
      <div>
        <div className="absolute left-0 top-0 z-20 h-[38rem] w-full bg-white">
          <div className="relative mx-auto w-[60rem]">
            <img
              src={background}
              alt=""
              className="absolute -right-6 -top-[82px] w-[36rem]"
            />
            <Header mode="welcome" />
            <div className="flex flex-col">
              <div className="h1 mt-20 w-[44rem]">
                Create your perfect link collection and share it with the world.
              </div>
              <button
                className="button mt-16 h-14 w-40 rounded-2xl text-lg"
                onClick={() => setShowWelcome(false)}
              >
                Get Started
              </button>
              <div className="mt-6 pl-1 text-xs font-medium">
                <span className="text-black/40">No Login Required!</span>
                <span> Learn more</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute left-0 top-0 z-10 min-h-full w-full bg-black/40"
          onClick={() => setShowWelcome(false)}
        ></div>
      </div>
    );
  };

  type Mode = "welcome" | "edit" | "preview";

  const Header = ({ mode }: { mode: Mode }) => {
    const Logo = (
      <div className="flex flex-row items-center">
        <img src={linkstrLogo} alt="logo" className="h-8 pr-1.5" />
        <span className="pt-1 font-serif leading-none">Linkstr</span>
      </div>
    );

    const PublishButton = <button className="button h-8 px-3">Publish</button>;

    const DownArrowArt = (
      <img src={downArrowArt} alt="" className="-top-1 right-1/2 h-56" />
    );

    return (
      <div className="mt-8 flex items-center justify-between">
        {Logo}
        {mode === "preview" && DownArrowArt}
        {mode === "edit" && PublishButton}
      </div>
    );
  };

  const TitleAndDescription = () => {
    return (
      <div className="mx-auto mt-14 text-center">
        <div className="h1">Top 10 travel destinations in India</div>
        <div className="text-xs text-black/40">
          <span>curated by – </span>
          <span className="font-bold">SPARSH PALIWAL</span>
          <span className="font-bold"> • 5 Nov 2022</span>
        </div>
        <div className="pt-6 text-lg text-black/60">
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
      <div className="relative flex flex-col border-b py-6">
        <div className="action-button -right-2.5">
          <img src={cancelIcon} alt="" />
        </div>
        <div className="flex flex-row items-center">
          <img src={linkIcon} alt="" />
          <div className="pl-2 pt-1.5 font-serif text-xl">{name}</div>
        </div>
        <div className="pt-[-1] text-sm text-black/40">{url}</div>
        <div className="pt-3 text-black/60">{description}</div>
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
    <div className="mx-auto w-[60rem]">
      {showWelcome && <WelcomeOverlay />}
      <div className={`h-full w-full ${showWelcome ? "blur-xl" : ""}`}>
        <div className="h-full w-full">
          <Header mode="edit" />
          <div className="mx-auto w-[40rem]">
            <TitleAndDescription />
            <Collection />
            <Footer />
          </div>
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
