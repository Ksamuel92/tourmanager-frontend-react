import React from "react";
import "./App.css";
import Shows from "./pages/Shows";
import ShowDetails from "./components/shows/ShowDetails";
import NewShowForm from "./components/shows/NewShowForm";
import Promoters from "./pages/Promoters";
import PromoterDetails from "./components/promoters/PromoterDetails";
import NewPromoterForm from "./components/promoters/NewPromoterForm";
import SignUpForm from "./components/users/SignUpForm";
import { Routes, Route } from "react-router-dom";

import LandingGrid from "./layout/LandingGrid";
import LandingHeader from "./layout/LandingHeader";

import Layout from "./layout/Layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <LandingHeader />
        <SignUpForm />
        <main>
          <Routes>
            <Route path="/" element={<LandingHeader />}>
              <Route path="shows" element={<Shows />}>
                <Route path=":id" element={<ShowDetails />} />
                <Route path="new" element={<NewShowForm />} />
              </Route>
              <Route path="promoters" element={<Promoters />}>
                <Route path=":slug" element={<PromoterDetails />} />
                <Route path="new" element={<NewPromoterForm />} />
              </Route>
            </Route>
          </Routes>
          <Shows />
          <LandingGrid />
        </main>
      </Layout>
    </div>
  );
}

export default App;
