import { useState } from "react";

import { useMutation } from "react-query";
import { fetchResponse } from "./api";

import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { Chat } from "./types";

function App() {
  const [chat, setChat] = useState<Chat[]>([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "server", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const handleSendMessage = async (chat: Chat) => {
    await Promise.resolve(
      setChat((prev) => [...prev, { sender: "client", message: chat.message }])
    );
    mutation.mutate();
  };

  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
      {/* Gradients */}
      <div className="primary-gradient"></div>
      <div className="secondary-gradient"></div>

      {/* Header */}
      <header className="uppercase font-bold  text-2xl text-center mb-3">
        GMS Chatbot
      </header>
      <main
        className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md
      "
      >
        <ChatBody chat={chat} />
      </main>

      {/* Input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput
          onSendMessage={handleSendMessage}
          loading={mutation.isLoading}
        />
      </div>
    </div>
  );
}

export default App;
