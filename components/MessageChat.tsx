function MessageChat({
  message,
  id,
}: {
  message: { message: string; senderId: number; receiverId: number };
  id: number;
}) {
  console.log(message.senderId == id);
  return (
    <li
      className={` w-full flex ${
        message.senderId == id ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`w-fit px-4 py-3 rounded-2xl bg-white text-gray-800 ${
          message.senderId == id ? "rounded-bl-sm" : "rounded-br-sm"
        } shadow-sm`}
      >
        {message.message}
      </div>
    </li>
  );
}

export default MessageChat;
