"use client"
import Chat from "./components/Chat";
import { Container } from "@mui/material";

export default function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      <Chat/>
    </Container>
  );
}
