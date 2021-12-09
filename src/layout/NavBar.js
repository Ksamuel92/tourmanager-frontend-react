import { useState, useEffect, cloneElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
import { Tabs, Tab } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/authEndpoints";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  tab: {
    minWidth: 10,
    marginLeft: "25px",
  },
  login: {
    margin: "1rem",
    textDecoration: "none",
    color: "white",
    fontFamily: theme.typography.fontFamily,
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const NavBar = () => {
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = useSelector((store) => store.authReducer.token);
  const [logoutUser] = useLogoutMutation();

  useEffect(() => {
    if (location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (location.pathname === "/shows" && value !== 1) {
      setValue(1);
    } else if (location.pathname === "/promoters" && value !== 2) {
      setValue(2);
    }
  }, [value, location]);

  useEffect(() => {
    if (userToken) {
      setLoggedIn(true);
    } else if (userToken === null) {
      setLoggedIn(false);
    }
  }, [userToken]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleLogout = async (e) => {
    try {
      const response = await logoutUser().unwrap();
      if (response.status === 200) {
        navigate("/");
        setLoggedIn(false);
      }
    } catch (err) {
      console.log(err); //handle error
    }
  };
  return (
    <div sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TourManager
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{ marginLeft: "auto" }}
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={NavLink}
                to="/"
              />
              {loggedIn && (
                <Tab
                  className={classes.tab}
                  label="Shows"
                  component={NavLink}
                  to="/shows"
                />
              )}
              {loggedIn && (
                <Tab
                  className={classes.tab}
                  label="Promoters"
                  component={NavLink}
                  to="/promoters"
                  key={2}
                />
              )}
            </Tabs>
            {loggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to={"auth"} className={classes.login}>
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  );
};

export default NavBar;
