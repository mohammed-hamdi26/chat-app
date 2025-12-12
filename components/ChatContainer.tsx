"use client";
import { useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import MessageContainer from "./MessageContainer";
import { socket } from "@/app/socket";

function ChatContainer({ id, chatId }) {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const roomId = id > chatId ? `${id}-${chatId}` : `${chatId}-${id}`;
  const [isOnline, setIsOnline] = useState(false);
  console.log(roomId);
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      // setTransport(socket.io.engine.transport.name);

      // socket.io.engine.on("upgrade", (transport) => {
      //   setTransport(transport.name);
      // });
    }

    function onDisconnect() {
      setIsConnected(false);
      // setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.emit("joinRoom", roomId);
    socket.on("userStatusUpdate", (data) => {
      console.log("data", data);
    });

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.off("receive-message", (data) => {
      //   console.log("data", data);
      //   setReceivedMessage([...receivedMessage, data]);
      // });
    };
  }, []);
  return (
    <div className="w-full flex flex-col flex-1 h-full">
      {/* <div className="px-4 py-6 shadow-2xl w-full">
        <h3>Sarah Wilson</h3>
        <p className="text-sm text-slate-400">Online</p>
      </div> */}
      <MessageContainer id={id} />
      <ChatForm id={id} roomId={roomId} value={message} setValue={setMessage} />
    </div>
  );
}

export default ChatContainer;
