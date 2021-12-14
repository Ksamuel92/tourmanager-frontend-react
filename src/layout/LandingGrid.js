import { Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Typography, CardContent, Box } from "@mui/material";
import Fade from "@mui/material/Fade";

const LandingGrid = (props) => {
  return (
    <Fade in={props.fade}>
      <Box mt={2} pt={3}>
        <Grid
          spacing={0}
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Card variant="outlined" sx={{ maxWidth: 480 }} ml={2}>
              <CardContent>
                <Typography variant="h5">A Better Way To Tour</Typography>
                <Typography variant="subtitle1">
                  Keep track of the details so you can put out the other fires
                  and get your band paid.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card variant="outlined" sx={{ maxWidth: 480 }}>
              <CardContent>
                <Typography variant="h5">Stay Organized</Typography>
                <Typography variant="subtitle1">
                  Always have the venue's wifi information at the ready for your
                  desperate, desperate band.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card variant="outlined" sx={{ maxWidth: 480 }}>
              <CardContent>
                <Typography variant="h5">Always On Time</Typography>
                <Typography variant="subtitle1">
                  With TourManager, you'll never leave the hotel just a little
                  too late.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default LandingGrid;
