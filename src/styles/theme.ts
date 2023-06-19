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
  secondary: "#068dd1",
  background: "#062134",
};

export default theme;
