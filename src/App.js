import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./styles/Theme";
import "./App.css";
import Shows from "./pages/Shows";
import NewShowForm from "./components/shows/NewShowForm";
import Promoters from "./pages/Promoters";
import PromoterList from "./components/promoters/PromoterList";
import Auth from "./pages/Auth";
import UserProfile from "./components/users/UserProfile";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LandingPage from "./pages/LandingPage";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useSelector } from "react-redux";
import ErrorBoundary from "./layout/ErrorBoundary";
import ShowsList from "./components/shows/ShowsList";

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
  const userToken = useSelector((store) => store.authReducer.token);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <CssBaseline />
        <div className={classes.root}>
          <Layout>
            <main>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="shows"
                    element={userToken ? <Shows /> : <Auth />}
                  >
                    <Route
                      index
                      element={userToken ? <ShowsList /> : <Auth />}
                    />
                    <Route
                      path="/shows/new"
                      element={userToken ? <NewShowForm /> : <Auth />}
                    />
                  </Route>
                  <Route
                    path="promoters"
                    element={userToken ? <Promoters /> : <Auth />}
                  >
                    <Route
                      index
                      element={userToken ? <PromoterList /> : <Auth />}
                    />
                  </Route>
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/user"
                    element={userToken ? <UserProfile /> : <Auth />}
                  />
                </Routes>
              </ErrorBoundary>
            </main>
          </Layout>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
