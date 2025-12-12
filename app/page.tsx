"use client";

import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useCookies } from "next-client-cookies";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<string[]>([]);
  const cookies = useCookies();
  const id = cookies.get("id");
  console.log(id);

  console.log(receivedMessage);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.emit("register", id);

    socket.on("chat message", (msg) => {
      setReceivedMessage((prev) => [...prev, msg]);
    });

    // socket.on("disconnect", onDisconnect);

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
    <div className=" flex justify-center items-center h-screen bg-gray-500">
      <div>
        <h1 className="text-3xl text-white font-bold">Welcome To Chat App</h1>
        <p className="text-center">
          {isConnected ? (
            <span className="text-green-500">Connected</span>
          ) : (
            <span className="text-red-500">Disconnected</span>
          )}
        </p>
      </div>
    </div>
  );
}
