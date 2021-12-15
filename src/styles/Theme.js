import { createTheme } from "@material-ui/core/styles";

const millenialPink = "#F3CFC6";
const lightBlue = "#C6EAF3";

const theme = createTheme({
  palette: {
    common: {
      millenialPink,
      lightBlue,
    },
    primary: {
      main: millenialPink,
    },
    secondary: {
      main: lightBlue,
    },
  },
});

export default theme;
