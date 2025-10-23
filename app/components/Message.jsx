"use client";
import { Box, Paper, Typography } from "@mui/material";

export default function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1.5,
        width: "100%",
        px: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          px: 2,
          maxWidth: { xs: "85%", sm: "75%" },
          backgroundColor: isUser ? "#0078ff" : "#f1f3f4",
          color: isUser ? "#fff" : "#202124",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
          lineHeight: 1.5,
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body2">{text}</Typography>
      </Paper>
    </Box>
  );
}
