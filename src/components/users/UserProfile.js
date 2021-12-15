import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { Typography, Box } from "@material-ui/core";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

import { Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
const UserProfile = () => {
  const { user } = useSelector((store) => store.authReducer);

  return (
    <Fragment>
      <Typography variant="h4" color="common.white" align="center">
        User Profile
      </Typography>

      <Box mt={"15px"} align="center">
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>{user.name}</ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>{user.email} </ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
};

export default UserProfile;
