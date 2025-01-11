import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-end w-full p-4 bg-gray-800 text-white">
      <Link href="/chat">Chat</Link>
    </div>
  );
};
