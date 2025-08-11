import { useEffect } from "react";
import { breakDataToParagraph } from "../utils/utilities";

const AiMessage = ({ data }) => {
  const convertDataToArr = breakDataToParagraph(data);
  console.log(convertDataToArr);

  useEffect(() => {
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div
      id="message"
      className="w-full h-dvh border flex justify-center items-center text-center bg-blue-900 "
    >
      <div className="max-w-xl px-15 text-base leading-10 text-white lg:text-2xl lg:max-w-2xl">
        {convertDataToArr.length > 1 ? (
          <div>
            {convertDataToArr.map((item, i) => {
              return (
                <p
                  key={i}
                  className={`pt-3.5 ${
                    i === 0 ? "font-semibold text-1xl" : "font-normal"
                  }`}
                >
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
