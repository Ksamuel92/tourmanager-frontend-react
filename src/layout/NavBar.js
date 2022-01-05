import { useState, useEffect, cloneElement, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
import { Tabs, Tab } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/authEndpoints";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const useStyles = makeStyles((theme) => ({
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
    color: "black",
    width: 200,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.millenialPink,
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
  const [activeTab, setActiveTab] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = useSelector((store) => store.authReducer.token);
  const [logoutUser] = useLogoutMutation();

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: "Show List", link: "/shows" },
    { name: "Create New Show", link: "/shows/new" },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        if (activeTab !== 0) {
          setActiveTab(0);
        }
        break;
      case "/shows":
        if (activeTab !== 1) {
          setActiveTab(1);
          setSelectedIndex(0);
        }
        break;
      case "/shows/new":
        if (activeTab !== 1) {
          setActiveTab(1);
          setSelectedIndex(1);
        }
        break;
      case "/promoters":
        if (activeTab !== 2) {
          setActiveTab(2);
        }
        break;
      case "/user":
        if (activeTab !== 3) {
          setActiveTab(3);
        }
        break;
      default:
        break;
    }
  }, [activeTab, location]);

  useEffect(() => {
    if (userToken) {
      setLoggedIn(true);
    } else if (userToken === null) {
      setLoggedIn(false);
    }
  }, [userToken]);

  const handleChange = (e, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const handleLogout = (e) => {
    logoutUser();
    navigate("/");
    setLoggedIn(false);
  };

  const tabs = (
    <Fragment>
      <Tabs
        value={activeTab}
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

      <Menu
        id="show-menu"
        anchorEl={anchorEl}
        open={openMenu}
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
            selected={index === selectedIndex && activeTab === 1}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              setActiveTab(1);
              handleClose();
            }}
          >
            {menuOption.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        PaperProps={{ classes: { root: classes.drawer } }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <List disablePadding>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/"
          >
            <ListItemText disableTypography>Home</ListItemText>
          </ListItem>
          {!loggedIn && (
            <ListItem
              onClick={() => setOpenDrawer(false)}
              divider
              button
              component={Link}
              to="/auth"
            >
              <ListItemText disableTypography>Login</ListItemText>
            </ListItem>
          )}
          {loggedIn && (
            <ListItem
              onClick={() => setOpenDrawer(false)}
              divider
              button
              component={Link}
              to="/shows"
            >
              <ListItemText disableTypography>Shows</ListItemText>
            </ListItem>
          )}
          {loggedIn && (
            <ListItem
              onClick={() => setOpenDrawer(false)}
              divider
              button
              component={Link}
              to="/promoters"
            >
              <ListItemText disableTypography>Promoters</ListItemText>
            </ListItem>
          )}
          {loggedIn && (
            <ListItem
              onClick={() => setOpenDrawer(false)}
              divider
              button
              component={Link}
              to="/user"
            >
              <ListItemText disableTypography>User Profile</ListItemText>
            </ListItem>
          )}
          {loggedIn && (
            <ListItem onClick={handleLogout} divider button>
              <ListItemText disableTypography>Logout</ListItemText>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon />
      </IconButton>
    </Fragment>
  );
  //TODO: ADD DRAWER FUNCTIONALITY FOR MOBILE
  return (
    <div sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TourManager
            </Typography>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  );
};

export default NavBar;
