import { useEffect } from "react";

const AiMessage = ({ data }) => {
  useEffect(() => {
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div
      id="message"
      className="w-full h-dvh border flex justify-center items-center text-center bg-blue-900 "
    >
      <p className="max-w-xl px-15 text-4xl leading-15 text-white ">{data}</p>
    </div>
  );
};
export default AiMessage;
