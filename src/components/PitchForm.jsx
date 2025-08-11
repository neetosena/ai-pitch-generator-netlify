import React, { useEffect, useState } from "react";
import useFetch from "../assets/hooks/useFetch";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import AiMessage from "./AiMessage";
import ArrowsLogo from "../assets/images/arrows.svg";

import party from "party-js";

const customId = 1;

const PitchForm = () => {
  const [prompt, setPrompt] = useState({
    name: "",
    role: "",
    skills: "",
    goal: "",
  });
  const [isDone, setIsDone] = useState(false);
  const { isLoading, data } = useFetch({ ...prompt, isDone, setIsDone });

  const notify = () => {
    toast("Please fill in all fields", {
      toastId: customId,
      position: "top-center",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(prompt).every(
      (val) => val.trim() !== ""
    );

    if (allFieldsFilled) {
      setIsDone(true);
      party.confetti(e.target);
    } else {
      notify();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPrompt((prevPrompt) => {
      return {
        ...prevPrompt,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (data) {
      setPrompt({
        name: "",
        role: "",
        skills: "",
        goal: "",
      });
    }
  }, [data]);

  return (
    <div className="w-full">
      <div className="w-full min-h-dvh h-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center  bg-blue-950">
          <div className="flex flex-col items-center">
            <img
              src={ArrowsLogo}
              alt="Logo"
              className="logo mb-7 max-w-12 w-full text-white"
            />
            <span className="font-secondary text-5xl text-blue-500">
              ELEVATOR
            </span>
            <span className="mb-4 font-secondary text-4xl text-amber-500 lg:mb-15 ">
              Pitch
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-xs pb-11 w-full px-5 flex flex-col gap-5 md:max-w-xl"
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={prompt.name}
            className="input stretch-elements"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleChange}
            value={prompt.role}
            className="input stretch-elements"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills/Tech"
            onChange={handleChange}
            value={prompt.skills}
            className="input stretch-elements"
          />
          <input
            type="text"
            name="goal"
            placeholder="Career Goal"
            onChange={handleChange}
            value={prompt.goal}
            className="input stretch-elements"
          />
          <button type="submit" className="btn btn-primary stretch-elements">
            {isLoading ? "Generating..." : "Send"}
          </button>
        </form>
      </div>
      <ToastContainer />
      {data && <AiMessage data={data} isDone={isDone} />}
    </div>
  );
};
export default PitchForm;
