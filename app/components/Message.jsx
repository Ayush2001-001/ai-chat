"use client";
import { Box, Paper, Typography } from "@mui/material";

export default function Message({ sender, text }) {
  const align = sender === "user" ? "right" : "left";
  const bgColor = sender === "user" ? "primary.main" : "grey.300";
  const color = sender === "user" ? "white" : "black";

  return (
    <Box sx={{ display: "flex", justifyContent: align, mb: 1 }}>
      <Paper sx={{ p: 1.5, bgcolor: bgColor, color }}>
        <Typography variant="body2">{text}</Typography>
      </Paper>
    </Box>
  );
}
