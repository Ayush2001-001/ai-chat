"use client";
import { useState, useRef, useEffect } from "react";
import InputBox from "./InputBox";
import Message from "./Message";
import { PiSidebarSimpleBold } from "react-icons/pi";

const options = [
  {
    question: "What are the advantages of using Next.js?",
    answer:
      "A: Next.js provides server-side rendering, static site generation, API routes, and automatic code splitting, making React apps faster and SEO-friendly.",
  },
  {
    question: "Write code to demonstrate Dijkstra's algorithm",
    answer:
      "A: Here's a simple JavaScript implementation of Dijkstra's algorithm: ...",
  },
  {
    question: "Help me write an essay about Silicon Valley",
    answer:
      "A: Silicon Valley is a region in California known for tech innovation, startups, and major tech companies like Apple, Google, and Facebook...",
  },
  {
    question: "What is the weather in San Francisco?",
    answer:
      "A: Currently, San Francisco has mild temperatures, usually between 15°C and 22°C with occasional fog.",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const streamReply = (fullText) => {
    setTyping(true);
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
    let i = 0;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          text: fullText.slice(0, i + 1),
        };
        return newMessages;
      });
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 30);
  };

  const handleSend = (input) => {
    if (!input.trim()) return;

    setClickedOnce(true);
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const found = options.find((o) => o.question === input);
    const reply = found ? found.answer : null;

    if (reply) {
      streamReply(reply);
    } else {
      setTyping(true);
      fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
        .then((res) => res.json())
        .then((data) => {
          streamReply(data.reply);
        })
        .catch(() => {
          streamReply("Error: API not found");
        });
    }
  };

  const handleOptionClick = (option) => {
    if (!clickedOnce) {
      handleSend(option.question);
      setClickedOnce(true);
    }
  };

  return (
    <div className="h-screen w-full bg-white relative overflow-hidden">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-3 left-3 z-[1300] bg-white/90 p-2 rounded-xl shadow hover:bg-gray-100 transition"
        aria-label="open sidebar"
      >
        <PiSidebarSimpleBold size={20} />
      </button>

      <div
        className={`fixed inset-0 z-[1200] pointer-events-none transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[260px] bg-gray-100 p-4 shadow transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
        </div>
      </div>

      <div className="mx-auto px-4" style={{ maxWidth: "1100px" }}>
        <div className="w-full" style={{ height: "95vh" }}>
          <div className="pt-12 pb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Hello there!</h1>
            <p className="text-gray-500 mt-1">How can I help you today?</p>
          </div>

          {!clickedOnce && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="w-full text-left px-6 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center"
                >
                  <span className="mx-auto text-sm">{opt.question}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col rounded-xl border border-transparent overflow-hidden" style={{ height: "55vh" }}>
            <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin" >
              <div className="max-w-full mx-auto">
                {messages.length === 0 && (
                  <div className="text-start mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Hello there!</h2>
                    <p className="text-gray-500 mt-1">How can I help you today?</p>
                  </div>
                )}

                <div className="w-full">
                  {messages.map((msg, i) => (
                    <Message key={i} sender={msg.sender} text={msg.text} />
                  ))}

                  typing && (
                    <div className="flex justify-start w-full mb-3">
                      <div className="flex items-center p-2 px-3 rounded-2xl bg-gray-100">
                        <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-600">...</span>
                      </div>
                    </div>
                  )

                  <div ref={chatEndRef} />
                </div>
              </div>
            </div>

            {!clickedOnce && (
              <div className="grid grid-cols-2 gap-2 p-4">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOptionClick(opt)}
                    className="px-2 py-2 rounded-lg bg-gray-100 text-center hover:bg-gray-200 cursor-pointer transition"
                  >
                    <p className="text-sm">{opt.question}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 py-4 border-t border-gray-200 bg-white">
              <InputBox onSend={handleSend} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
