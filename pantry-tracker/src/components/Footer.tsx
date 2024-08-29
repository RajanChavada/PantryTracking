import React from "react";
import { Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
    <Container>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Pantry Tracker
      </Typography>
    </Container>
  </footer>
  )
}
