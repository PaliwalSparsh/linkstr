import { useEffect, useState } from "react";
import { getFormTemplate } from "@formstr/sdk";
import downArrowArt from "../Images/downArrowArt.png";
import TitleAndDescription from "../Components/TitleAndDescription";
import { Collection } from "../types";
import { defaultNodes, defaultMetadata } from "./CollectionBuilder";
import AllNodes from "../Components/AllNodes";
import { Logo } from "../Components/Header";
import Loader from "./Loader";

interface CollectionViewerProps {
  npub: string;
}

const CollectionViewer = ({ npub }: CollectionViewerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    async function get() {
      let template = await getFormTemplate(npub);
      setCollection(template.metadata as any);
      setIsLoading(false);
    }
    get();
  }, [npub]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="h-full w-full">
        <div className="relative h-16">
          <img
            src={downArrowArt}
            alt=""
            className="absolute -top-12 left-1/2 h-36 -translate-x-1/2"
          />
        </div>
        <div className="mx-auto w-full md:w-[40rem]">
          <TitleAndDescription
            mode="view"
            metadata={collection?.metadata ?? defaultMetadata}
          />
          <AllNodes mode="view" nodes={collection?.nodes ?? defaultNodes} />
          <div className="flex flex-row items-center justify-center pb-12 pt-32">
            <Logo />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionViewer;
