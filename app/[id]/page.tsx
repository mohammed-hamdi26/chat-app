import ChatContainer from "@/components/ChatContainer";
import { Params } from "next/dist/server/request/params";
import { cookies } from "next/headers";

async function page({ params }: { params: Params }) {
  const param = await params;
  const id = (await cookies()).get("id")?.value;
  const chatId = param.id;

  return <ChatContainer id={Number(id)} chatId={Number(chatId)} />;
}

export default page;
