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
        display: "flex",
        justifyContent: "center",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          width: { xs: "95vw", sm: "90vw", md: "80vw", lg: "70vw", xl: "60vw" },
          minWidth: "400px",
          maxWidth: "180vh",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: messages.length === 0 ? "center" : "flex-start",
            pt: { xs: 2, sm: 4 },
            pb: { xs: 12, sm: 14 },
            width: "100%",
          }}
        >
          {messages.length === 0 && (
            <Box textAlign="center" mb={4} px={{ xs: 2, sm: 4 }}>
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
              <Box
                sx={{
                  display: "grid",
                  gap: 1.5,
                  mt: 4,
                  width: "100%",
                  maxWidth: 600,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  mx: "auto",
                }}
              ></Box>
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
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 1, sm: 2 },
            bgcolor: "#fff",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <InputBox onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
}
