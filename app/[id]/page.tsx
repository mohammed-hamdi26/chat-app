import ChatContainer from "@/components/ChatContainer";
import { cookies } from "next/headers";

async function page({ params }: { params: { id: string } }) {
  const { id: chatId } = params;
  const id = (await cookies()).get("id")?.value;

  return <ChatContainer id={id} chatId={chatId} />;
}

export default page;
