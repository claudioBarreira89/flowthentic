import { createTheme } from "@rneui/themed";

const theme = createTheme({
  components: {
    Button: {
      raised: true,
    },
  },
});

export const colors = {
  primary: "#32ddb0",
  secondaryLighter: "#4c9ec7",
  secondary: "#068dd1",
  background: "#062134",
  backgroundDarker: "#04121b",
};

export default theme;
