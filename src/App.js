import React from "react";
import "./App.css";

import LandingGrid from "./layout/LandingGrid";
import LandingHeader from "./layout/LandingHeader";

import Layout from "./layout/Layout";
import Shows from "./pages/Shows";
import Promoters from "./pages/Promoters";
function App() {
  return (
    <div className="App">
      <Layout>
        <LandingHeader />
        <LandingGrid />
        <Shows />
        <Promoters />
      </Layout>
    </div>
  );
}

export default App;
