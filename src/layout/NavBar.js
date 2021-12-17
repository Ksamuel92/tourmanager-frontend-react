import { useState, useEffect, cloneElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
import { Tabs, Tab } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/authEndpoints";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
  menu: {
    backgroundColor: theme.palette.common.millenialPink,
    color: "white",
    width: 200,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = useSelector((store) => store.authReducer.token);
  const [logoutUser] = useLogoutMutation();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const menuOptions = [
    { name: "Show List", link: "/shows" },
    { name: "Create New Show", link: "/shows/new" },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/shows":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case "/shows/new":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/promoters":
        if (value !== 2) {
          setValue(2);
        }
        break;
      case "/user":
        if (value !== 3) {
          setValue(3);
        }
        break;
      default:
        break;
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
              TabIndicatorProps={{ style: { background: "#F3CFC6" } }}
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={NavLink}
                to="/"
                key={0}
              />
              {loggedIn && (
                <Tab
                  aria-owns={anchorEl ? "show-menu" : undefined}
                  aria-haspopup={anchorEl ? "true" : undefined}
                  onMouseOver={handleClick}
                  className={classes.tab}
                  label="Shows"
                  component={NavLink}
                  to="/shows"
                  key={1}
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
              {loggedIn && (
                <Tab
                  className={classes.tab}
                  label="User Profile"
                  component={NavLink}
                  to="/user"
                  key={3}
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

          <Menu
            id="show-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.menu }}
            MenuListProps={{ onMouseLeave: handleClose }}
            elevation={0}
          >
            {menuOptions.map((menuOption, index) => (
              <MenuItem
                key={index}
                component={Link}
                to={menuOption.link}
                classes={{ root: classes.menuItem }}
                selected={index === selectedIndex && value === 1}
                onClick={(event) => {
                  handleMenuItemClick(event, index);
                  setValue(1);
                  handleClose();
                }}
              >
                {menuOption.name}
              </MenuItem>
            ))}
          </Menu>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  );
};

export default NavBar;
