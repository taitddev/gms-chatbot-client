import { useState } from "react";
import sendImg from "../assets/send.png";
import loader from "../assets/loader.gif";
import { Chat } from "../types";

interface IChatInputProps {
  onSendMessage: (chat: Chat) => void;
  loading: boolean;
}

const ChatInput = ({ onSendMessage, loading }: IChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    onSendMessage({ sender: "client", message: value });
    setValue("");
  };

  return (
    <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4 py-4 overflow-auto relative">
      {loading ? (
        <img src={loader} className="w-8 m-auto" />
      ) : (
        <>
          <textarea
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <img
            onClick={handleSubmit}
            src={sendImg}
            width={20}
            alt="send-button"
            className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
