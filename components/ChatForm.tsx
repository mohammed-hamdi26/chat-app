import { socket } from "@/app/socket";

function ChatForm({ value, setValue, id, roomId }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        socket.emit("chat message", {
          message: value,
          senderId: Number(id),
          roomId: roomId,
        });
        setValue("");
      }}
      className="mt-auto flex gap-4 px-4 py-6"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send"
          aria-hidden="true"
        >
          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
          <path d="m21.854 2.147-10.94 10.939"></path>
        </svg>
      </button>
    </form>
  );
}

export default ChatForm;
