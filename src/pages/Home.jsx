import PitchForm from "../components/PitchForm";
import ArrowsLogo from "../assets/images/arrows.svg";

const Home = () => {
  return (
    <div className="flex flex-col justify-center h-dvh bg-blue-950">
      <div className="flex flex-col items-center">
        <img
          src={ArrowsLogo}
          alt="Logo"
          className=" logo mb-7 max-w-12 w-full text-white"
        />
        <span className="font-secondary text-5xl text-blue-500">ELEVATOR</span>
        <span className="mb-15 font-secondary text-4xl text-amber-500 ">
          Pitch
        </span>
      </div>

      <div className="w-full bg-blue-950 flex flex-col justify-center items-center">
        <PitchForm />
      </div>
    </div>
  );
};
export default Home;
