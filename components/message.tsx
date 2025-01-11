interface MessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

export const Message = ({ sender, message, isOwnMessage }: MessageProps) => {
  const isSystemMessage = sender === "system";
  return (
    <div
      className={`flex ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } items-center mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isSystemMessage
            ? "bg-gray-500 text-red-500"
            : isOwnMessage
            ? "bg-green-400 text-black"
            : "bg-blue-400 text-black"
        }`}
      ></div>
      {!isOwnMessage && <p className="">{sender}</p>}
      <p className={`text-sm text-white`}>{message}</p>
    </div>
  );
};
