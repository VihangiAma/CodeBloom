import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5"; // ⬅ close icon

const ChatBot = ({ section }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `👋 Welcome to the ${section} Section! How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true); // ⬅ show / hide state
  const bottomRef = useRef(null);

  /* ---------- static data ------------------------------------------------- */
  const supervisorMap = {
    Electrical: {
      name: "Mr. Ishara Wickramasinghe",
      role: "Electrical Supervisor",
      phone: "071‑1234567",
      email: "ishara.wickramasinghe@gmail.com",
    },
    Mechanical: {
      name: "Mr. Chamath Gunasekara",
      role: "Mechanical Supervisor",
      phone: "071‑2345678",
      email: "chamath.gunasekara@gmail.com",
    },
    BodyShop: {
      name: "Mr. Suresh Fernando",
      role: "Body Shop Supervisor",
      phone: "071‑3456789",
      email: "fernando.body@example.com",
    },
    Service: {
      name: "Ms. Dilani Rajapaksha",
      role: "Service Supervisor",
      phone: "071‑4567890",
      email: "dilani.rajapaksha@gmail.com",
    },
  };

  const commonQuestions = [
    "What are your working hours?",
    "How to book an appointment?",
    "How to check my service status?",
    "How can I contact the supervisor?",
  ];

  /* ---------- helpers ----------------------------------------------------- */
  const getBotResponse = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("appointment")) {
      return "📅 You can book appointments via the “Appointments” section of our site.";
    }
    if (lower.includes("status")) {
      return "🔍 To check the status of your service, please log in and view “Service Status”.";
    }
    if (lower.includes("working hours")) {
      return "🕒 We are open Monday–Saturday, 8 AM–6 PM.";
    }
    if (lower.includes("supervisor") || lower.includes("contact")) {
      const sup = supervisorMap[section];
      return sup
        ? `📞 Contact ${sup.name} (${sup.role})\nPhone: ${sup.phone}\nEmail: ${sup.email}`
        : "Supervisor contact information not found.";
    }
    return "Please contact the Accountant for more help. Tharindu Silva – 071 728 6020";
  };

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: trimmed },
      { sender: "bot", text: getBotResponse(trimmed) },
    ]);
    setInput("");
  };

  /* ---------- effects ----------------------------------------------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- UI ---------------------------------------------------------- */
  if (!open) return null; // don’t render when closed

  return (
    <div className="fixed bottom-5 right-5 w-80 max-w-full bg-white border rounded-xl shadow-xl z-50 text-sm flex flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2">
        <h3 className="font-semibold">Chat – {section} Section</h3>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="p-1 hover:bg-blue-700 rounded"
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* chat history */}
      <div className="h-60 overflow-y-auto px-4 py-2 space-y-1 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap p-2 rounded-md max-w-[90%] ${
              msg.sender === "bot"
                ? "bg-gray-200 text-left"
                : "bg-blue-200 ml-auto text-right"
            }`}
          >
            <span className="font-medium">
              {msg.sender === "bot" ? "Bot" : "You"}:
            </span>{" "}
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* quick questions */}
      <div className="px-4 py-2 bg-white border-t">
        <p className="font-semibold mb-1">Quick ask:</p>
        <div className="flex flex-wrap gap-2">
          {commonQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="bg-gray-200 hover:bg-gray-300 text-xs px-2 py-1 rounded"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* input area */}
      <div className="flex gap-2 px-4 py-3 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-grow border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Type your question…"
        />
        <button
          onClick={() => handleSend(input)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
