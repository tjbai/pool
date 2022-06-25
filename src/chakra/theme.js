import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/400.css";

export const theme = extendTheme({
  colors: {
    def: {
      100: "#ffff3f",
      200: "#dddf00",
      300: "#bfd200",
      400: "#55a630",
      600: "#a98467",
      800: "#184e77",
      900: "#153852",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      bg: "gray.200",
    }),
  },
  components: {},
});
