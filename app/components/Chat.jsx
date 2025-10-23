"use client";
import { useState, useRef, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import InputBox from "./InputBox";
import Message from "./Message";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async (input) => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    try {
      setTyping(true);

      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
        setTyping(false);
      }, 1000);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error: API not found" },
        ]);
        setTyping(false);
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
        overflow: "hidden", 
      }}
    >
      <Box
        sx={{
          width: {
            xs: "95vw",
            sm: "90vw",
            md: "85vw",
            lg: "180vh", 
          },
          maxWidth: "100%",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden", 
            px: { xs: 2, sm: 4 },
            py: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            justifyContent: messages.length === 0 ? "center" : "flex-start",
            alignItems: "center",
            bgcolor: "#fafafa",
          }}
        >
          {messages.length === 0 && (
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ mb: 1, fontSize: { xs: "1.3rem", sm: "1.8rem" } }}
              >
                Hello there!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                How can I help you today?
              </Typography>
            </Box>
          )}

          <Box sx={{ width: "100%", maxWidth: "100%" }}>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender} text={msg.text} />
            ))}

            {typing && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    px: 2,
                    borderRadius: 4,
                    bgcolor: "#f1f3f4",
                    maxWidth: "35%",
                  }}
                >
                  <CircularProgress size={18} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ...
                  </Typography>
                </Box>
              </Box>
            )}
            <div ref={chatEndRef} />
          </Box>
        </Box>

        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            py: { xs: 1.5, sm: 2 },
            borderTop: "1px solid #e0e0e0",
            bgcolor: "#fff",
          }}
        >
          <InputBox onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
}
