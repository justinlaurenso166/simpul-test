"use client";

import { dummyChatData } from "@/app/store/store";
import { useAtom } from "jotai";
import Image from "next/image";

export default function ChatList({ onSelectChat }) {
    const [chats] = useAtom(dummyChatData);

    function formatDate(date) {
        const formattedDate = new Date(date); // Ensure date is in Date object format
        return formattedDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Use 24-hour format
        }).split(",").join("");
    }

    function truncateMessage(message, maxLength) {
        return message.length > maxLength
            ? message.substring(0, maxLength) + "..."
            : message;
    }

    return (
        <div>
            <ul className="max-h-[580px] overflow-y-auto px-8 py-6">
                {chats.map((chat, index) => {
                    const lastMessageObj = chat.messages[chat.messages.length - 1];
                    const lastMessageUser = lastMessageObj.sender;
                    const lastMessage = lastMessageObj.message;

                    return (
                        <li
                            key={chat.id}
                            onClick={() => onSelectChat(chat)}
                            className={`cursor-pointer ${index < chats.length - 1 ? 'border-b border-[#828282]' : ''
                                }`}
                        >
                            <div className="flex gap-3 py-[22px]">
                                <div className="flex-0">
                                    <Image
                                        src={'/icon/Group 1603.svg'}
                                        width={51}
                                        height={34}
                                        alt="chat profile"
                                        priority={true}
                                    />
                                </div>
                                <div className="flex-1 text-sm">
                                    <div className="flex gap-3">
                                        <p className="flex-0 text-primary-blue font-bold max-w-[70%]">
                                            {chat.name}
                                        </p>
                                        <p className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-primary-gray-dark">
                                            {formatDate(lastMessageObj.time)}
                                        </p>
                                    </div>
                                    {chat.groupChat && (
                                        <p className="text-primary-gray-dark font-bold">
                                            {lastMessageUser}:
                                        </p>
                                    )}
                                    <p className="text-primary-gray-dark">
                                        {truncateMessage(lastMessage, 75)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
