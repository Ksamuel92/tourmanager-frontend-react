import { Typography, Button } from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
const ShowDetails = (props) => {
  const { venue, date, loadin, guarantee, merch, green_room, wifi } =
    props.show;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        width="140"
        image={
          process.env.PUBLIC_URL +
          "/assets/magnus-lunay-B1CWLBWEHHI-unsplash.jpg"
        }
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h6">
          {venue} - {date} - {loadin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {green_room
            ? "There is a green room available"
            : "Looks like we're chilling in the van"}
          {wifi ? wifi : "No wifi available"}
          {guarantee ? guarantee : "Check with promoter for guarantee"}
          We made ${merch} in merch.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small"> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default ShowDetails;
