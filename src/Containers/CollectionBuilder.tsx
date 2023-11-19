import { createForm } from "@formstr/sdk";
import { useState } from "react";
import { Header } from "../Components/Header";
import AllNodes from "../Components/AllNodes";
import TitleAndDescription from "../Components/TitleAndDescription";
import AddNode from "../Components/AddNode";
import { Node, Nodes, Collection, Metadata } from "../types";
import WelcomeOverlay from "./WelcomeOverlay";
import SuccessOverlay from "./SuccessOverlay";

export const defaultMetadata: Metadata = {
  title: "My Link Collection",
  description: "This is a link collection I made with nostr.",
  author: "John Doe",
  date: new Date().toISOString().split("T")[0],
};

export const defaultNodes: Nodes = [
  {
    id: "2",
    kind: "link",
    url: "https://google.com",
    title: "Google",
    description: "Search the web",
  },
  {
    id: "3",
    kind: "link",
    url: "https://youtube.com",
    title: "Youtube",
    description: "Watch videos",
  },
];

const CollectionBuilder = () => {
  const [metadata, setMetadata] = useState<Metadata>(defaultMetadata);
  const [nodes, setNodes] = useState<Nodes>(defaultNodes);
  const [publishUrl, setPublishUrl] = useState<string>("");

  async function handlePublish() {
    const collection: Collection = {
      metadata: metadata,
      nodes: nodes,
    };
    const response = await createForm({name: metadata.title, schemaVersion: "v1", metadata: collection, description: metadata.description})
    setPublishUrl(`${window.location.host}/#/${response[0]}`);
    setMetadata(defaultMetadata);
    setNodes(defaultNodes);
  }

  const isCollectionPublished = publishUrl !== "";

  return (
    <>
      <WelcomeOverlay />
      {isCollectionPublished && <SuccessOverlay publishUrl={publishUrl} />}
      <div className="h-full w-full">
        <div className="h-full w-full">
          <Header
            mode="edit"
            showPublishButton={true}
            onPublish={handlePublish}
          />
          <div className="mx-auto w-full md:w-[40rem]">
            <TitleAndDescription
              mode="edit"
              metadata={metadata}
              // is this correct ??
              onMetadataChange={(updatedMetadata) =>
                setMetadata(updatedMetadata)
              }
            />
            <AllNodes
              mode="edit"
              nodes={nodes}
              onNodesChange={(updatedNodes: Nodes) => setNodes(updatedNodes)}
            />
            <div className="pb-[12rem]" />
          </div>
        </div>
      </div>
      <AddNode onAdd={(newNode: Node) => setNodes([...nodes, newNode])} />
    </>
  );
};

export default CollectionBuilder;
