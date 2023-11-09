import { useParams } from "react-router-dom";
import { createLinkCollection, getLinkCollection } from "../nostr";
import { useEffect, useState } from "react";
import Header from "./Header";
import Welcome from "./Welcome";
import BlockList from "./BlockList";
import TitleAndDescription from "./TitleAndDescription";
import AddBlock from "./AddBlock";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";

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

export type Collection = {
  metadata: Metadata;
  blocks: Blocks;
};

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
  const [publishUrl, setPublishUrl] = useState<string>("");

  const { npub } = useParams();
  console.log(npub);

  useEffect(() => {
    async function get() {
      if (npub) {
        let event = await getLinkCollection(npub);
        let parsedCollection = JSON.parse(event[0]?.content);
        let parsedMetadata = parsedCollection.metadata;
        let parsedBlocks = parsedCollection.blocks;
        setMetadata(parsedMetadata);
        setBlocks(parsedBlocks);
      }
    }
    get();
  }, []);

  async function handlePublish() {
    const collection: Collection = {
      metadata: metadata,
      blocks: blocks,
    };
    const [pk, sk] = await createLinkCollection(collection);
    setPublishUrl(`${window.location.host}/#/${pk}`);
    setMetadata(welcomeMetadata);
    setBlocks(welcomeBlocks);
  }

  return (
    <div className="mx-auto w-[60rem]">
      <Welcome />
      {publishUrl !== "" && (
        <div className="text-md z-20 mx-auto mt-40 w-60 break-all font-bold text-black/60 backdrop-blur-3xl">
          {publishUrl}
        </div>
      )}
      <div
        className={`h-full w-full ${
          publishUrl === "" ? "blur-none" : "blur-3xl"
        }`}
      >
        <div className="h-full w-full">
          <Header mode="edit" onPublish={handlePublish} />
          <div className="mx-auto w-[40rem]">
            <TitleAndDescription
              metadata={metadata}
              // is this correct ??
              onMetadataChange={(updatedMetadata) =>
                setMetadata(updatedMetadata)
              }
            />
            <BlockList
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
