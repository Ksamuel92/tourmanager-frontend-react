import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./styles/Theme";
import "./App.css";
import Shows from "./pages/Shows";
import NewShowForm from "./components/shows/NewShowForm";
import Promoters from "./pages/Promoters";
import PromoterDetails from "./components/promoters/PromoterDetails";
import NewPromoterForm from "./components/promoters/NewPromoterForm";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LandingPage from "./pages/LandingPage";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <CssBaseline />
        <div className={classes.root}>
          <Layout>
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route Route path="shows" element={<Shows />}>
                  <Route path="new" element={<NewShowForm />} />
                </Route>
                <Route path="promoters" element={<Promoters />}>
                  <Route path=":slug" element={<PromoterDetails />} />
                  <Route path="new" element={<NewPromoterForm />} />
                </Route>
                <Route path="/auth" element={<Auth />} />
                <Route path="/user" />
              </Routes>
            </main>
          </Layout>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
