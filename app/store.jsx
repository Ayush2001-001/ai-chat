import { create } from 'zustand';

const useChatStore = create((set) => ({
  messages: [
    { role: "assistant", text: "Hello. Streaming demo active using MUI." },
  ],
  sending: false,
  addMessage: (msg) =>
    set((s) => ({
      messages: [...s.messages, msg],
    })),
  updateLast: (updater) =>
    set((s) => {
      const last = s.messages[s.messages.length - 1];
      if (!last) return {};
      const newText =
        typeof updater === "function" ? updater(last.text) : updater;
      const updated = [...s.messages];
      updated[updated.length - 1] = { ...last, text: newText };
      return { messages: updated };
    }),
  clear: () => set({ messages: [] }),
  setSending: (v) => set({ sending: v }),
}));

export default useChatStore;
