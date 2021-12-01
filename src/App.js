import React from "react";

import "./App.css";

import { Container } from "@material-ui/core";
import LandingGrid from "./layout/LandingGrid";
import { Typography } from "@mui/material";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Container>
          <Typography variant="h1">TourManager</Typography>
        </Container>
        <LandingGrid />
      </Layout>
    </div>
  );
}

export default App;
