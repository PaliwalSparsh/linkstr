import linkstrLogo from "../Images/logo.svg";
import downArrowArt from "../Images/downArrowArt.png";
import { Mode } from "./Builder";

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

export default Header;
