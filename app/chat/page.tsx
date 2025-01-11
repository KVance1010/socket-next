"use client";
import { useState } from "react";
import { ChatForm } from "@/components/chat-form";
import { Message } from "@/components/message";

const MessageBoard = () => {
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSendingMessage = (message: string) => {
    console.log("message: " + message);
    setMessages((prev) => [...prev, { sender: "user", message: message }]);
  };
  
  if (!joined) {
    return <div className="ml-5 w-full mt-24 justify-center">Room 1</div>;
  }

  return (
    <div className="ml-5 w-full mt-24 justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Room 1</h1>
        <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-400 rounded-lg">
          {messages.map((currentMessage) => (
            <Message
              key={currentMessage.message}
              sender={currentMessage.sender}
              message={currentMessage.message}
              isOwnMessage={currentMessage.sender === "user"}
            />
          ))}
        </div>
        <ChatForm onSendMessage={handleSendingMessage} />
      </div>
    </div>
  );
};

export default MessageBoard;
