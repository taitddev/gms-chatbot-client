import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Chat } from "../types";

interface IChatBodyProps {
  chat: Chat[];
}

const ChatBody = ({ chat }: IChatBodyProps) => {
  const aiStyle =
    "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";

  const parent = useRef(null);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  // Only for aut animations
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  // For scrolling bottom
  useEffect(() => {
    bottomRef.current &&
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
              message.sender === "server" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              <span>{message.message}</span>
            </pre>
          </div>
        );
      })}

      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;
