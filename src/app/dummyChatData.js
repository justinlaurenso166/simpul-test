import cuid from "cuid";

// Static IDs for participants
const participantIds = {
    "You": cuid(),
    "Mary Hilda": cuid(),
    "Obaidullah Amarkhil": cuid(),
    "Ellen": cuid(),
    "Bob": cuid(),
    "Elizabeth": cuid(),
    "FastVisa Support": cuid()
};

export const chats = [
    {
        id: cuid(),
        name: "109220-Naturalization",
        date: new Date("2024-08-23T10:00:00"),
        groupChat: true,
        participant: 3,
        participants: [
            { id: participantIds["You"], name: "You", color: "purple" },
            { id: participantIds["Mary Hilda"], name: "Mary Hilda", color: "orange" },
            { id: participantIds["Obaidullah Amarkhil"], name: "Obaidullah Amarkhil", color: "green" },
        ],
        messages: [
            {
                senderId: participantIds["You"],
                sender: "You",
                message: "No worries. It will be completed ASAP. I’ve asked him yesterday.",
                time: new Date("2024-08-23T09:45:00"),
            },
            {
                senderId: participantIds["Mary Hilda"],
                sender: "Mary Hilda",
                message: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
                time: new Date("2024-08-23T09:55:00"),
            },
            {
                senderId: participantIds["You"],
                sender: "You",
                message: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
                time: new Date("2024-08-23T10:05:00"),
            },
            {
                senderId: participantIds["Mary Hilda"],
                sender: "Mary Hilda",
                message: "Sure thing, Claren",
                time: new Date("2024-08-23T09:55:00"),
            },
            {
                senderId: participantIds["Obaidullah Amarkhil"],
                sender: "Obaidullah Amarkhil",
                message: "Morning. I’ll try to do them. Thanks",
                time: new Date("2024-08-23T10:05:00"),
            },
        ],
    },
    {
        id: cuid(),
        name: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
        date: new Date("2024-08-23T12:30:00"),
        groupChat: true,
        participant: 3,
        participants: [
            { id: participantIds["Ellen"], name: "Ellen", color: "orange" },
            { id: participantIds["You"], name: "You", color: "purple" },
            { id: participantIds["Bob"], name: "Bob", color: "green" },
        ],
        messages: [
            {
                senderId: participantIds["Ellen"],
                sender: "Ellen",
                message: "Hey, please read.",
                time: new Date("2024-08-23T12:15:00"),
            },
            {
                senderId: participantIds["You"],
                sender: "You",
                message: "I will read it later.",
                time: new Date("2024-08-23T12:25:00"),
            },
            {
                senderId: participantIds["Bob"],
                sender: "Bob",
                message: "Already read it.",
                time: new Date("2024-08-23T12:35:00"),
            },
        ],
    },
    {
        id: cuid(),
        name: "8405-Diana SALAZAR MUNGUIA",
        date: new Date("2024-08-23T11:30:00"),
        groupChat: true,
        participant: 3,
        participants: [
            { id: participantIds["Obaidullah Amarkhil"], name: "Obaidullah Amarkhil", color: "orange" },
            { id: participantIds["Elizabeth"], name: "Elizabeth", color: "green" },
            { id: participantIds["You"], name: "You", color: "purple" },
        ],
        messages: [
            {
                senderId: participantIds["Obaidullah Amarkhil"],
                sender: "Obaidullah Amarkhil",
                message: "I understand your initial concerns...",
                time: new Date("2024-08-23T12:05:00"),
            },
            {
                senderId: participantIds["Elizabeth"],
                sender: "Elizabeth",
                message: "Thank you for understanding.",
                time: new Date("2024-08-23T12:15:00"),
            },
            {
                senderId: participantIds["You"],
                sender: "You",
                message: "We should proceed.",
                time: new Date("2024-08-23T12:25:00"),
            },
        ],
    },
    {
        id: cuid(),
        name: "FastVisa Support",
        date: new Date("2024-08-23T15:30:00"),
        groupChat: false,
        participant: 0,
        participants: [
            { id: participantIds["FastVisa Support"], name: "FastVisa Support" },
            { id: participantIds["You"], name: "You", color: "purple" },
        ],
        messages: [
            {
                senderId: participantIds["FastVisa Support"],
                sender: "FastVisa Support",
                message: "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
                time: new Date("2024-08-23T12:00:00"),
            },
            {
                senderId: participantIds["You"],
                sender: "You",
                message: "Hi, I need help with something can you help me ?",
                time: new Date("2024-08-23T12:05:00"),
            },
        ],
    },
];
