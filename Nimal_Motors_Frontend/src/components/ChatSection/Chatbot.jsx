import React, { useState, useEffect, useRef } from "react";

const ChatBot = ({ section }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `👋 Welcome to the ${section} Section! How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const supervisorMap = {
    Electrical: {
      name: "Mr. Ishara Wickramasinghe",
      role: "Electrical Supervisor",
      phone: "071-1234567",
      email: "ishara.wickramasinghe@gmail.com",
    },
    Mechanical: {
      name: "Mr. Chamath Gunasekara",
      role: "Mechanical Supervisor",
      phone: "071-2345678",
      email: "chamath.gunasekara@gmail.com",
    },
    BodyShop: {
      name: "suresh.fernando@gmail.com",
      role: "Body Shop Supervisor",
      phone: "071-3456789",
      email: "fernando.body@example.com",
    },
    Service: {
      name: "Ms. Dilani Rajapaksha",
      role: "Service Supervisor",
      phone: "071-4567890",
      email: "dilani.rajapaksha@gmail.com",
    },
  };

  const commonQuestions = [
    "What are your working hours?",
    "How to book an appointment?",
    "How to check my service status?",
    "How can I contact the supervisor?",
  ];

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("appointment")) {
      return "📅 You can book appointments via the 'Appointments' section of our site.";
    } else if (lower.includes("status")) {
      return "🔍 To check the status of your service, please log in and view 'Service Status'.";
    } else if (lower.includes("working hours")) {
      return "🕒 We are open Monday to Saturday from 8 AM to 6 PM.";
    } else if (lower.includes("supervisor") || lower.includes("contact")) {
      const sup = supervisorMap[section];
      if (sup) {
        return `📞 Contact ${sup.name} (${sup.role}):\nPhone: ${sup.phone}\nEmail: ${sup.email}`;
      }
      return "Supervisor contact information not found.";
    }

    return "🤔 I'm not sure about that. Please contact the supervisor for more help.";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { sender: "user", text }];
    const botResponse = getBotResponse(text);
    newMessages.push({ sender: "bot", text: botResponse });
    setMessages(newMessages);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 w-80 max-w-full bg-white border rounded-xl shadow-lg p-4 z-50 text-sm">
      <div className="h-60 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.sender === "bot"
                ? "bg-gray-100 text-left"
                : "bg-blue-100 text-right"
            }`}
          >
            <p>
              <strong>{msg.sender === "bot" ? "Bot" : "You"}:</strong>{" "}
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mb-2">
        <p className="font-semibold">Try asking:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {commonQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => handleSend(q)}
              className="bg-gray-200 hover:bg-gray-300 text-xs px-2 py-1 rounded"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-grow border p-2 rounded"
          placeholder="Type your question..."
        />
        <button
          onClick={() => handleSend(input)}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
