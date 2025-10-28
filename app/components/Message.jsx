"use client";

export default function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div
      className={`w-full mb-3 px-2 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`py-2 px-4 max-w-[85%] sm:max-w-[75%] break-words leading-6 text-sm sm:text-base shadow-sm
          ${
            isUser
              ? "bg-blue-600 text-white rounded-[18px_18px_4px_18px]"
              : "bg-white text-gray-900 rounded-[18px_18px_18px_4px] border border-gray-100"
          }`}
        style={{ wordBreak: "break-word" }}
      >
        {text}
      </div>
    </div>
  );
}
