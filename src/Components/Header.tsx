import linkstrLogo from "../Images/logo.svg";
import downArrowArt from "../Images/downArrowArt.png";
import { ViewMode } from "../types";
interface HeaderProps {
  mode?: ViewMode;
  showPublishButton?: boolean;
  onPublish?: () => void;
}

const Header = ({
  mode = "view",
  onPublish = () => {},
  showPublishButton = false,
}: HeaderProps) => {
  const Logo = (
    <div className="flex flex-row items-center">
      <img src={linkstrLogo} alt="logo" className="h-8 pr-1.5" />
      <span className="pt-1 font-serif leading-none">Linkstr</span>
    </div>
  );

  const PublishButton = (
    <button className="button h-8 px-3" onClick={onPublish}>
      Publish
    </button>
  );

  let body = (
    <>
      {Logo}
      {showPublishButton && PublishButton}
    </>
  );

  if (mode === "view") {
    body = <img src={downArrowArt} alt="" className="-top-1 right-1/2 h-56" />;
  }

  return <div className="mt-8 flex items-center justify-between">{body}</div>;
};

export default Header;
