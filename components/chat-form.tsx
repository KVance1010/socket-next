"use client";
import { useState } from "react";

export const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message?.trim() !== "") {
      onSendMessage(message);
    }
  };
  
  return (
    <form className="flex gap-2 mt-4" onSubmit={handleSubmitMessage}>
      <input
        type="text"
        className="flex-1 px-4 border-2 rounded-lg focus:border-green-500 focus:outline-none text-black"
        placeholder="type message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 rounded-lg bg-green-600">
        Send
      </button>
    </form>
  );
};
