// "use client";
// import { useState, useEffect } from "react";
// import socket from "@/lib/socketConnection";
// import { ChatForm } from "@/components/chat-form";
// import { Message } from "@/components/message";

// const MessageBoard = () => {
//   const [messages, setMessages] = useState<
//     { sender: string; message: string }[]
//   >([]);

//   const [room, setRoom] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [userName, setUserName] = useState("");

//   const handleSendingMessage = (message: string) => {
//     console.log("message: " + message);
//     setMessages((prev) => [...prev, { sender: "user", message: message }]);
//   };
  
//   if (!joined) {
//     return <div className="ml-5 w-full mt-24 justify-center">Room 1</div>;
//   }

//   return (
//     <div className="ml-5 w-full mt-24 justify-center">
//       <div className="w-full max-w-3xl mx-auto">
//         <h1 className="mb-4 text-2xl font-bold">Room 1</h1>
//         <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-400 rounded-lg">
//           {messages.map((currentMessage) => (
//             <Message
//               key={currentMessage.message}
//               sender={currentMessage.sender}
//               message={currentMessage.message}
//               isOwnMessage={currentMessage.sender === "user"}
//             />
//           ))}
//         </div>
//         <ChatForm onSendMessage={handleSendingMessage} />
//       </div>
//     </div>
//   );
// };

// export default MessageBoard;

"use client";
import { useState, useEffect, FormEvent } from "react";
import socket from "@/lib/socketConnection";

export default function LiveChat({ chatRoomId = 1 }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  useEffect(() => {
    if (chatRoomId) {
      socket.emit("joinChat", chatRoomId);
    }
  }, [chatRoomId]);

  useEffect(() => {
    const handleReceivedMessage = (message: string) => {
      console.log("Received message from Socket.IO:", message);
      setChatLog((prev: string[]) => [...prev, message]);
    };

    socket.on("messageReceived", handleReceivedMessage);

    return () => {
      socket.off("messageReceived", handleReceivedMessage);
    };
  }, []);

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log("Sending message:", message);
      if (chatRoomId) {
        socket.emit("sendMessageToChatRoom", chatRoomId, message);
      } else {
        console.error("No chatRoomId provided. Cannot send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section>
      <h2>Live Chat</h2>
      {chatLog.map((chatMessage, index) => (
        <div className="text-white" key={`chat ${index}`}>{chatMessage}</div>
      ))}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          className="text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
