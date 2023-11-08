import linkIcon from "../Images/link.svg";
import cancelIcon from "../Images/cancel.svg";
import handleIcon from "../Images/handle.svg";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";

const mockData = [
  {
    name: "Jaipur, Rajasthan",
    url: "https://www.example.com/jaipur",
    description: "Discover the Pink City's rich heritage and vibrant culture.",
  },
  {
    name: "Kerala Backwaters, Kerala",
    url: "https://www.example.com/kerala",
    description: "Explore the serene backwaters of Kerala.",
  },
  {
    name: "Hampi, Karnataka",
    url: "https://www.example.com/hampi",
    description: "Visit the ancient ruins of the Vijayanagara Empire.",
  },
  {
    name: "Leh, Ladakh",
    url: "https://www.example.com/leh",
    description: "Experience the breathtaking beauty of the Himalayas.",
  },
  {
    name: "Goa",
    url: "https://www.example.com/goa",
    description: "Relax on the sandy beaches of Goa.",
  },
];

const Link = ({
  data,
}: {
  data: {
    name: String;
    url: String;
    description: String;
  };
}) => {
  const controls = useDragControls();
  const { name, url, description } = data;

  return (
    <Reorder.Item
      value={data}
      dragListener={false}
      dragControls={controls}
      className="relative flex w-full flex-col border-b bg-white pb-6"
    >
      <div className="action-button absolute -right-2.5">
        <img src={cancelIcon} alt="" />
      </div>

      <div className="flex flex-row items-center">
        <img
          src={handleIcon}
          alt="handle used for reordering list elements"
          className="action-button__no-bg cursor-grab pr-2 active:cursor-grabbing"
          onPointerDown={(e) => {
            controls.start(e);
            e.preventDefault();
          }}
        />

        <img src={linkIcon} alt="" />
        <div className="pl-2 pt-1.5 font-serif text-xl">{name}</div>
      </div>
      <div className="pt-[-1] text-sm text-black/40">{url}</div>
      <div className="pt-3 text-black/60">{description}</div>
    </Reorder.Item>
  );
};

const Collection = () => {
  const [links, setLinks] = useState(mockData);

  return (
    <Reorder.Group
      axis="y"
      onReorder={setLinks}
      values={links}
      className="mt-14 flex flex-col gap-6"
    >
      {links.map((link) => (
        <Link data={link} key={link.url} />
      ))}
    </Reorder.Group>
  );
};

export default Collection;
