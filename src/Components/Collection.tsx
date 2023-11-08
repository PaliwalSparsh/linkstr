import linkIcon from "../Images/link.svg";
import cancelIcon from "../Images/cancel.svg";

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

const Collection = () => {
  return (
    <div className="mt-8">
      {mockData.map((link) => (
        <Link name={link.name} url={link.url} description={link.description} />
      ))}
    </div>
  );
};

export default Collection;
