"use client";

import { socket } from "@/app/socket";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const users = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
}));
function SideChats() {
  const cookies = useCookies();
  const idUser = cookies.get("id");
  const [userStatus, setUserStatus] = useState<
    { id: number; online: boolean }[]
  >([]);
  useEffect(() => {
    socket.on("userStatusUpdate", (data) => {
      setUserStatus(data);
    });
    return () => {
      socket.off("userStatusUpdate");
    };
  }, []);
  console.log("user", idUser);
  return (
    <nav>
      <ul className="border-r min-h-full w-80 bg-white">
        {users.map(
          (user) =>
            user.id !== Number(idUser) && (
              <li
                className="px-4 py-6 flex justify-between items-center hover:bg-[#eff6ff]"
                key={user.id}
              >
                <Link
                  href={`/${user.id}`}
                  className={"flex items-center gap-4 w-full"}
                >
                  {user.name}
                  {userStatus[user.id]?.online && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}

export default SideChats;
