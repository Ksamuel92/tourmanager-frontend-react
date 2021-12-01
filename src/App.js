import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import LandingGrid from "./layout/LandingGrid";
import { Typography } from "@mui/material";
import Layout from "./layout/Layout";
import Shows from "./pages/Shows";

function App() {
  return (
    <div className="App">
      <Layout>
        <Container>
          <Typography variant="h1">TourManager</Typography>
        </Container>
        <LandingGrid />
        <Shows />
      </Layout>
    </div>
  );
}

export default App;
