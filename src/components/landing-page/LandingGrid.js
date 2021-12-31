import {
  Grid,
  Card,
  Typography,
  CardContent,
  Box,
  Divider,
  Fade,
} from "@mui/material";

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
                <Typography variant="overline" gutterBottom>Always there when you call</Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Keep track of the details so you can put out the other fires
                  and get your band paid.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ maxWidth: 480, maxHeight: 480 }}>
              <CardContent>
                <Typography variant="overline" gutterBottom>Always on time</Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  With TourManager, you'll never leave the hotel just a little
                  too late.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ maxWidth: 450 }}>
              <CardContent>
                <Typography variant="overline" gutterBottom>Stay connected</Typography>
                
                <Typography variant="subtitle2" gutterBottom>
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
