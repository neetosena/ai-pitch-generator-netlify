import { useEffect } from "react";
import { breakDataToParagraph } from "../utils/utilities";

const AiMessage = ({ data }) => {
  const convertDataToArr = breakDataToParagraph(data);

  useEffect(() => {
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div
      id="message"
      className="w-full h-dvh border flex justify-center items-center text-center bg-blue-900 "
    >
      <div className="max-w-xl px-15 text-base leading-10 text-white ">
        {convertDataToArr.length > 1 ? (
          <div>
            {convertDataToArr.map((item, i) => {
              return (
                <p key={i} className="pt-2.5">
                  {item}
                </p>
              );
            })}
          </div>
        ) : (
          <p>{convertDataToArr}</p>
        )}
      </div>
    </div>
  );
};
export default AiMessage;
