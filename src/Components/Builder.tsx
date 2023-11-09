import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";
import Header from "./Header";
import Welcome from "./Welcome";
import Collection from "./Collection";
import TitleAndDescription from "./TitleAndDescription";
import AddBlock from "./AddBlock";

// Types
export type Mode = "welcome" | "edit" | "preview";

export type BlockType = "metadata" | "link" | "headline" | "text" | "image";

export interface Metadata {
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface BlockBase {
  id: string;
  type: BlockType;
}

export interface Link extends BlockBase {
  url: string;
  title: string;
  description: string;
}

export interface Headline extends BlockBase {
  text: string;
}

export type Block = Link | Headline;

export type Blocks = Block[];

const tempLinks = ["google.com", "youtube.com"];

const welcomeMetadata: Metadata = {
  title: "My Link Collection",
  description: "This is a link collection I made with nostr.",
  author: "John Doe",
  date: new Date().toISOString().split("T")[0],
};

const welcomeBlocks: Blocks = [
  {
    id: "2",
    type: "link",
    url: "https://google.com",
    title: "Google",
    description: "Search the web",
  },
  {
    id: "3",
    type: "link",
    url: "https://youtube.com",
    title: "Youtube",
    description: "Watch videos",
  },
];

const Builder = () => {
  const [metadata, setMetadata] = useState<Metadata>(welcomeMetadata);
  const [blocks, setBlocks] = useState<Blocks>(welcomeBlocks);

  const { npub } = useParams();

  useEffect(() => {
    async function get() {
      if (npub) {
        let event = await getLinkCollection(npub);
        let parsedBlocks = JSON.parse(event[0]?.content);
        setBlocks(parsedBlocks);
      }
    }
    get();
  }, []);

  async function submitLinks() {
    const response = await createLinkCollection(tempLinks);
    console.log(response);
  }

  return (
    <div className="mx-auto w-[60rem]">
      <Welcome />
      <div className={`h-full w-full`}>
        <div className="h-full w-full">
          <Header mode="edit" />
          <div className="mx-auto w-[40rem]">
            <TitleAndDescription
              metadata={metadata}
              // is this correct ??
              onMetadataChange={(updatedMetadata) =>
                setMetadata(updatedMetadata)
              }
            />
            <Collection
              blocks={blocks}
              onBlocksChange={(updatedBlocks: Blocks) =>
                setBlocks(updatedBlocks)
              }
            />
            {/* Footer */}
            <div className="pb-[12rem]"></div>
          </div>
        </div>
      </div>
      <AddBlock onAdd={(newBlock: Block) => setBlocks([...blocks, newBlock])} />
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
