import { useEffect, useState } from "react";
import MessageChat from "./MessageChat";
import { socket } from "@/app/socket";

function MessageContainer({ id }) {
  const [receivedMessage, setReceivedMessage] = useState<any[]>([]);
  useEffect(() => {
    socket.on("private", (data) => {
      console.log("data", data);
      setReceivedMessage((prev) => [...prev, data]);
    });
  }, []);
  return (
    <ul className="flex-1 space-y-3 p-6">
      {receivedMessage.map((message, index) => (
        <MessageChat id={id} key={index} message={message} />
      ))}
    </ul>
  );
}

export default MessageContainer;
