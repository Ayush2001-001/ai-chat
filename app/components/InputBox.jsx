"use client";
import { useState } from "react";
import { TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function InputBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Paper sx={{ display: "flex", p: 1, mt: 1 }}>
      <TextField
        fullWidth
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        variant="standard"
      />
      <IconButton onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
