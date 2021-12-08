import { useState, useEffect, cloneElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
import { Tabs, Tab } from "@material-ui/core";

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
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (location.pathname === "/shows" && value !== 1) {
      setValue(1);
    } else if (location.pathname === "/promoters" && value !== 2) {
      setValue(2);
    }
  }, [value, location]);

  const handleChange = (e, value) => {
    setValue(value);
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
              <Tab
                className={classes.tab}
                label="Shows"
                component={NavLink}
                to="/shows"
              />
              <Tab
                className={classes.tab}
                label="Promoters"
                component={NavLink}
                to="/promoters"
              />
              {/* <Tab className={classes.tab} label="Schedule" component={Link}/> */}
              {/* <Tab
                className={classes.tab}
                label="User Profile"
                component={Link}
              />
              Calendar Page */}
            </Tabs>
            <Link to={"auth"} className={classes.login}>
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  );
};

export default NavBar;
