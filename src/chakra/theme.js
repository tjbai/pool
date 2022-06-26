import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/400.css";

export const theme = extendTheme({
  colors: {
    def: {
      100: "#ffff3f",
      200: "#dddf00",
      300: "#cee1f0",
      400: "#55a630",
      600: "#307fba",
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
