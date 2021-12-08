import { createTheme } from "@material-ui/core/styles";

const millenialPink = "#F3CFC6";
const quartz = "#51414F";

const theme = createTheme({
  palette: {
    common: {
      millenialPink,
      quartz,
    },
    primary: {
      main: millenialPink,
    },
    secondary: {
      main: quartz,
    },
  },
});

export default theme;
