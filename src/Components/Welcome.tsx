import Header from "./Header";
import background from "../Images/background.png";

const Welcome = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div>
      <div className="absolute left-0 top-0 z-20 h-[38rem] w-full bg-white">
        <div className="relative mx-auto w-[60rem]">
          <img
            src={background}
            alt=""
            className="absolute -right-6 -top-[82px] w-[36rem]"
          />
          <Header mode="welcome" />
          <div className="flex flex-col">
            <div className="h1 mt-20 w-[44rem]">
              Create your perfect link collection and share it with the world.
            </div>
            <button
              className="button mt-16 h-14 w-40 rounded-2xl text-lg"
              onClick={onGetStarted}
            >
              Get Started
            </button>
            <div className="mt-6 pl-1 text-xs font-medium">
              <span className="text-black/40">No Login Required!</span>
              <span> Learn more</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute left-0 top-0 z-10 min-h-full w-full bg-black/40"
        onClick={onGetStarted}
      ></div>
    </div>
  );
};

export default Welcome;
