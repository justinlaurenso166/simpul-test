"use client";

import { dummyChatData, modalType, showButton } from "@/app/store/store";
import { Button } from "@nextui-org/react";
import cuid from "cuid";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const colors = {
    purple: { name: "text-chats-purple-normal", background: "bg-chats-purple-light" },
    orange: { name: "text-chats-orange-normal", background: "bg-chats-orange-light" },
    green: { name: "text-chats-green-normal", background: "bg-chats-green-light" },
    gray: { name: "text-chats-gray-normal", background: "bg-[#F8F8F8]" },
};

export default function ChatView({ chat, onBack }) {
    // State management hooks
    const [chats, setChats] = useAtom(dummyChatData);
    const [messages, setMessages] = useState(chat.messages);
    const [newMessage, setNewMessage] = useState("");
    const [editMode, setEditMode] = useState(null);
    const [, setShowButtons] = useAtom(showButton);
    const [, setType] = useAtom(modalType);
    const chatEndRef = useRef(null);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const optionsMenuRefs = useRef([]);

    // Constants
    const participantColorMap = useMemo(() => {
        const map = new Map();
        chat.participants.forEach((participant) => {
            map.set(participant.name, colors[participant.color] || colors.gray);
        });
        return map;
    }, [chat.participants]);

    // Functions

    // Truncate message to a specified length
    function truncateMessage(message, maxLength) {
        return message.length > maxLength
            ? message.substring(0, maxLength) + "..."
            : message;
    }

    // Handle sending a new or edited message
    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const youParticipant = chat.participants.find(participant => participant.name.trim().toLowerCase() === "you");
        const senderId = youParticipant ? youParticipant.id : cuid();

        const newMsg = {
            senderId: senderId,
            sender: "You",
            message: newMessage,
            time: new Date(),
        };

        if (editMode !== null) {
            const updatedMessages = [...messages];
            updatedMessages[editMode] = { ...updatedMessages[editMode], message: newMessage };
            setMessages(updatedMessages);
            setEditMode(null); // Clear edit mode
        } else {
            setMessages([...messages, newMsg]);
            simulateAutoResponses(newMsg);
        }

        setNewMessage("");
    };

    // Close all modal and reset state
    const closeAll = () => {
        setType(RESET);
        setShowButtons(RESET);
        onBack();
    };

    // Get participant color based on sender's name
    const getParticipantColor = (senderName) => {
        return participantColorMap.get(senderName) || colors.gray;
    };

    // Simulate automatic responses from other participants
    const simulateAutoResponses = () => {
        const otherParticipants = chat.participants.filter(participant => participant.name !== "You");

        otherParticipants.forEach((participant, index) => {
            setTimeout(() => {
                const response = {
                    senderId: participant.id,
                    sender: participant.name,
                    message: `This is an automated response from ${participant.name}`,
                    time: new Date(),
                };
                setMessages((prevMessages) => [...prevMessages, response]);
            }, (index + 1) * 2000);
        });
    };

    // Handle message editing
    const handleEditMessage = (index, event) => {
        event.stopPropagation();
        setNewMessage(messages[index].message); // Pre-fill the input with the message content
        setEditMode(index);
        setOpenMenuIndex(null);
    };

    // Handle message deletion
    const handleDeleteMessage = (index, event) => {
        event.stopPropagation();
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
        setOpenMenuIndex(null);
    };

    // Toggle options menu visibility
    const toggleOptionsMenu = (index, event) => {
        event.stopPropagation();
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    // Format time for display
    const formatTime = (time) => {
        const date = new Date(time);  // Convert to Date object
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    // useEffect Hooks

    // Close options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsMenuRefs.current.every(ref => ref && !ref.contains(event.target))) {
                setOpenMenuIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Scroll to the bottom of chat when new messages arrive
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Update the chat data in state when messages change
    useEffect(() => {
        const updatedChats = chats.map(c => c.id === chat.id ? { ...c, messages } : c);

        if (JSON.stringify(updatedChats) !== JSON.stringify(chats)) {
            setChats(updatedChats);
        }
    }, [messages, chat.id]);

    if (!chat) return <div>Select a chat to view</div>;

    return (
        <div className="flex flex-col h-full text-sm relative">
            <div className="grid grid-cols-12 gap-5 py-4 px-5 border-b border-[#828282]">
                <div className="col-span-11 flex gap-5 items-center">
                    <button className="bg-transparent m-0 p-0" onClick={onBack}>
                        <Image
                            src={'/icon/arrow_back.svg'}
                            width={16}
                            height={16}
                            alt="arrow back"
                            priority={true}
                        />
                    </button>
                    <div>
                        <p className="text-base font-bold text-primary-blue">
                            {truncateMessage(chat.name, 55)}
                        </p>
                        {chat.groupChat && (
                            <span className="text-xs font-medium">
                                {chat.participant} Participants
                            </span>
                        )}
                    </div>
                </div>
                <div className="col-span-1 flex items-center">
                    <Button isIconOnly className="bg-transparent" onClick={closeAll}>
                        <Image
                            src={'/icon/close.svg'}
                            width={14}
                            height={14}
                            alt="close"
                            priority={true}
                        />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex-1 px-5 py-4 overflow-y-auto max-h-[480px]">
                    {messages.map((message, index) => {
                        const color = getParticipantColor(message.sender);
                        const currentDate = new Date(message.time);
                        const previousMessage = messages[index - 1];
                        const previousDate = previousMessage
                            ? new Date(previousMessage.time).toLocaleDateString()
                            : null;

                        const isToday = new Date().toLocaleDateString() === currentDate.toLocaleDateString();
                        const formattedDate = isToday
                            ? `Today ${currentDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`
                            : currentDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

                        return (
                            <div key={index}>
                                {/* Show Date */}
                                {previousDate !== currentDate.toLocaleDateString() && (
                                    <div className="flex items-center justify-center my-3 gap-4">
                                        <div className="flex-1 h-[1.5px] rounded-full bg-primary-gray-dark"></div>
                                        <div className="text-primary-gray-dark font-semibold">
                                            {formattedDate}
                                        </div>
                                        <div className="flex-1 h-[1.5px] rounded-full bg-primary-gray-dark"></div>
                                    </div>
                                )}

                                <div
                                    className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'} relative`}
                                >
                                    <p className={`font-semibold ${color.name}`}>
                                        {message.sender}
                                    </p>
                                    <div className={`flex gap-2 ${message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <p className={`${color.background} text-black p-2 rounded-md inline-block mt-1 max-w-[75%] text-left`}>
                                            {message.message}
                                            <span className="block text-xs text-gray-500 mt-1.5 text-left">
                                                {formatTime(message.time)}
                                            </span>
                                        </p>

                                        {chat.groupChat && (
                                            <div className="relative mt-2.5" ref={el => optionsMenuRefs.current[index] = el}>
                                                <span
                                                    className="hover:cursor-pointer"
                                                    onClick={(event) => toggleOptionsMenu(index, event)}
                                                >
                                                    <Image
                                                        src={'/icon/more.svg'}
                                                        width={12}
                                                        height={3}
                                                        alt="more"
                                                        priority={true}
                                                    />
                                                </span>

                                                {openMenuIndex === index && (
                                                    <div
                                                        className="absolute -right-[105px] top-0 mt-4 bg-white border border-[#BDBDBD] rounded-md z-50 w-[120px]"
                                                    >
                                                        {message.sender === 'You' ? (
                                                            <>
                                                                <button
                                                                    className="block px-4 py-2 text-primary-blue rounded-md w-full text-left"
                                                                    onClick={(e) => handleEditMessage(index, e)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <hr className="border border-[#BDBDBD]" />
                                                                <button
                                                                    className="block px-4 py-2 text-indicator-red rounded-md w-full text-left"
                                                                    onClick={(e) => handleDeleteMessage(index, e)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className="block px-4 py-2 text-primary-blue rounded-md w-full text-left"
                                                                >
                                                                    Share
                                                                </button>
                                                                <hr className="border border-[#BDBDBD]" />
                                                                <button
                                                                    className="block px-4 py-2 text-primary-blue rounded-md w-full text-left"
                                                                >
                                                                    Reply
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef}></div>
                </div>

                {!chat.groupChat && (
                    <div className="flex bg-stickers-E9F3FF text-primary-gray-dark mx-4 rounded-md py-3 px-4 gap-4 items-center">
                        <ClipLoader
                            loading={true}
                            size={25}
                            color="#2F80ED"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            speedMultiplier={0.5}
                        />
                        <p className="font-semibold">Please wait while we connect you with one of our team ...</p>
                    </div>
                )}

                <div className="flex gap-5 py-4 px-5">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 py-2 px-3 border rounded-md border-[#828282] focus:outline-none placeholder:text-[#333333] placeholder:font-medium"
                    />
                    <Button
                        className=" bg-primary-blue text-white rounded-md"
                        onClick={handleSendMessage}>
                        {editMode !== null ? "Update" : "Send"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
