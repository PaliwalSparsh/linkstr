import linkstrLogo from "../Images/logo.svg";
import { ViewMode } from "../types";
interface HeaderProps {
  mode?: ViewMode;
  showPublishButton?: boolean;
  onPublish?: () => void;
}

const Header = ({
  onPublish = () => {},
  showPublishButton = false,
}: HeaderProps) => {
  const Logo = (
    <div className="flex flex-row items-center">
      <img src={linkstrLogo} alt="logo" className="h-8 pr-1.5" />
      <span className="pt-1 font-serif leading-none">Linkstr</span>
    </div>
  );

  return (
    <div className="mt-8 flex items-center justify-between">
      {Logo}
      {showPublishButton && (
        <button className="button h-8 px-3" onClick={onPublish}>
          Publish
        </button>
      )}
    </div>
  );
};

export default Header;
