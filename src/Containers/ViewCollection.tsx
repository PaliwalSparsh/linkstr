import { useEffect, useState } from "react";
import Header from "../Components/Header";
import TitleAndDescription from "../Components/TitleAndDescription";
import { Collection } from "../types";
import { defaultBlocks, defaultMetadata } from "./EditCollection";
import BlockList from "../Components/BlockList";
import { getLinkCollection } from "../nostr";

interface ViewCollectionProps {
  npub: string;
}

const ViewCollection = ({ npub }: ViewCollectionProps) => {
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    async function get() {
      if (npub) {
        let event = await getLinkCollection(npub);
        let parsedCollection = JSON.parse(event[0]?.content);
        setCollection(parsedCollection);
      }
    }
    get();
  }, [npub]);

  return (
    <div className="mx-auto w-[60rem]">
      <div className="h-full w-full">
        <Header mode="view" />
        <div className="mx-auto w-[40rem]">
          <TitleAndDescription
            mode="view"
            metadata={collection?.metadata ?? defaultMetadata}
          />
          <BlockList mode="view" blocks={collection?.blocks ?? defaultBlocks} />
          <div className="pb-[12rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default ViewCollection;
