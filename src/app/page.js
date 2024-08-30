"use client"

import QuicksButton from "./components/QuicksButton";
import { useAtom } from "jotai";
import { loadingData, modalType, showButton } from "./store/store";
import { useEffect, useState } from "react";
import { RESET } from "jotai/utils";
import Loading from "./components/loading/Loading";
import ChatList from "./components/chats/ChatList";
import ChatView from "./components/chats/ChatView";
import TaskList from "./components/tasks/TaskList";

export default function Home() {
  const [type, setType] = useAtom(modalType);
  const [, setShowButtons] = useAtom(showButton);
  const [loading] = useAtom(loadingData);
  const [selectedChat, setSelectedChat] = useState(null); // State to track selected chat

  useEffect(() => {
    setType(RESET);
    setShowButtons(RESET);
  }, []);

  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col gap-5 items-end fixed right-6 bottom-6">
        {/* Show popup */}
        {
          type !== "" && (
            type === 'inbox' ? (
              <div className="max-w-[637px] min-w-[637px] h-[637px] bg-white rounded-md">
                {/* Loading */}
                {
                  loading ? (
                    <Loading text={"Loading Chat ..."} loading={loading} />
                  ) : (
                    selectedChat ? (
                      <ChatView
                        chat={selectedChat}
                        onBack={() => setSelectedChat(null)}
                      />
                    ) : (
                      <ChatList
                        onSelectChat={
                          (chat) => setSelectedChat(chat)
                        }
                      />
                    )
                  )
                }
              </div>
            ) : (
              <div className="max-w-[637px] min-w-[637px] h-[637px] bg-white rounded-md">
                {/* Loading */}
                {
                  loading ? (
                    <Loading text={"Loading Task List ..."} loading={loading} />
                  ) : (
                    <TaskList />
                  )
                }
              </div>
            )
          )
        }

        <QuicksButton onClose={() => setSelectedChat(null)} />
      </div>
    </main>
  );
}
