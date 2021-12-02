import { Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Typography, CardContent } from "@mui/material";

const LandingGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5">A Better Way To Tour</Typography>
            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              volutpat feugiat mauris, eget malesuada quam rutrum vel. Sed
              interdum sit amet orci at aliquam.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5">Stay Connected</Typography>
            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              volutpat feugiat mauris, eget malesuada quam rutrum vel. Sed
              interdum sit amet orci at aliquam.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5">Always On Time</Typography>
            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              volutpat feugiat mauris, eget malesuada quam rutrum vel. Sed
              interdum sit amet orci at aliquam.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LandingGrid;
