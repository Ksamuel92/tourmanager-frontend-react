import { Fragment } from "react";
import { useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const UserProfile = () => {
  const { user } = useSelector((store) => store.authReducer);

  return (
    <Fragment>
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
