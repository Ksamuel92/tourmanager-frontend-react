import { Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Typography, CardContent, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

const LandingGrid = (props) => {
  return (
    <Fade in={props.fade}>
      <Box mt={2} pt={3}>
        <Grid
          spacing={5}
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ maxWidth: 480, maxHeight: 480 }}>
              <CardContent>
                <Typography variant="h6">Always there when you call</Typography>
                <Divider />
                <Typography variant="subtitle1">
                  Keep track of the details so you can put out the other fires
                  and get your band paid.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ maxWidth: 480, maxHeight: 480 }}>
              <CardContent>
                <Typography variant="h6">Always on time</Typography>
                <Divider />
                <Typography variant="subtitle1">
                  With TourManager, you'll never leave the hotel just a little
                  too late.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ maxWidth: 450 }}>
              <CardContent>
                <Typography variant="h6">Stay connected</Typography>
                <Divider />
                <Typography variant="subtitle1">
                  Have the venue's wifi information available for your clients,
                  always.
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
