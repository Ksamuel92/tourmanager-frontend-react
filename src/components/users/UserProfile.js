import { Fragment } from "react";
import { useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  CardContent,
  Card,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const UserProfile = () => {
  const { user } = useSelector((store) => store.authReducer);

  return (
    <Fragment>
      <Typography variant="h3" align="center" mt="15px">
        User Profile
      </Typography>
      <Grid container sx={{ justifyContent: "center" }} mt="60px">
        <Grid item>
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UserProfile;
