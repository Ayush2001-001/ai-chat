"use client";
import { useState } from "react";
import { PiArrowUpThin, PiCpu } from "react-icons/pi";
import { BsPaperclip } from "react-icons/bs";

export default function InputBox({ onSend }) {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const isDisabled = input.trim() === "";

  const handleSend = () => {
    if (!isDisabled) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="relative rounded-xl border border-gray-200 px-3 py-3 flex items-start bg-white"
        style={{ height: 130, boxSizing: "border-box" }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Send a message..."
          className="w-full h-full text-sm text-gray-800 resize-none outline-none bg-transparent placeholder-gray-400"
          maxLength={5000}
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-3">
          <button
            type="button"
            aria-label="attach"
            className="p-1 text-gray-700 hover:text-black"
          >
            <BsPaperclip size={20} />
          </button>

          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="p-1 text-gray-700 hover:text-black flex items-center gap-1"
            >
              <PiCpu size={20} />
              <span className="hidden md:inline text-xs ml-1">Grok Vision</span>
              <svg
                className="w-3 h-3 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.25 7L10 11.75 14.75 7z" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute left-0 bottom-10 w-56 bg-white shadow-lg rounded-md z-50 overflow-hidden">
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50">
                  <div className="font-medium">Grok Vision</div>
                  <div className="text-xs text-gray-500">
                    Advanced multimodal model with vision and text capabilities
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50">
                  <div className="font-medium">Grok Reasoning</div>
                  <div className="text-xs text-gray-500">
                    Uses advanced chain-of-thought reasoning for complex
                    problems
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={isDisabled}
          aria-label="send"
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center transition
            ${
              isDisabled
                ? "bg-transparent text-gray-400"
                : "bg-gray-900 text-white hover:bg-black"
            }`}
        >
          <PiArrowUpThin size={20} />
        </button>
      </div>
    </div>
  );
}
