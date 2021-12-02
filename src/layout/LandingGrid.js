import { Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Typography, CardContent, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const LandingGrid = () => {
  return (
    <Box m={0} pt={3}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Card variant="outlined">
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
          <Card variant="outlined">
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
          <Card variant="outlined">
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
    </Box>
  );
};

export default LandingGrid;
