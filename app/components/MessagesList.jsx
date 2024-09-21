import { useAITeacher } from "../hooks/useAITeacher";
import { useEffect, useRef } from "react";

export const MessagesList = () => {
  const messages = useAITeacher((state) => state.messages);
  const playMessage = useAITeacher((state) => state.playMessage);
  const { currentMessage } = useAITeacher();
  const english = useAITeacher((state) => state.english);
  const classroom = useAITeacher((state) => state.classroom);

  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  console.log(messages);

  const renderEnglish = (englishText) => (
    <>
      {english && (
        <p className="text-4xl inline-block px-2 rounded-sm font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-300/90 to-white/90">
          {englishText}
        </p>
      )}
    </>
  );

  return (
    <div
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-8 bg-transparent opacity-80`}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="h-full w-full grid place-content-center text-center">
          <h2 className="text-8xl font-bold text-white/90 italic">
            Climate Sensei
            <br />
            <span className="text-7xl font-bold text-white/90 italic">
              Understanding Climate Change Topics
            </span>
          </h2>
          <h2 className="text-8xl font-bold font-jp text-red-600/90 italic">
            Saving Earth
          </h2>
        </div>
      )}
      {messages.map((message, i) => (
        <div key={i}>
          <div className="flex">
            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <span
                  className={`text-white/90 text-2xl font-bold uppercase px-3 py-1 rounded-full  ${
                    message.speech === "formal"
                      ? "bg-indigo-600"
                      : "bg-teal-600"
                  }`}
                >
                  {message.speech}
                </span>
                {renderEnglish(message.answer.english)}{" "}
                {/* Ensure this is valid */}
              </div>
            </div>
            {/* Button Logic for Playing/Stopping Message */}
          </div>
          <div className="p-5 mt-5 text-white text-4xl rounded-xl">
            {message.answer &&
            typeof message.answer === "object" &&
            message.answer.response ? (
              message.answer.response
            ) : (
              <pre>{JSON.stringify(message.answer, null, 2)}</pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
