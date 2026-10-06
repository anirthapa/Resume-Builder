import { Font } from "@react-pdf/renderer";
import inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff?url";
import inter700 from "@fontsource/inter/files/inter-latin-700-normal.woff?url";
import dmsans400 from "@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff?url";
import dmsans700 from "@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff?url";
import roboto400 from "@fontsource/roboto/files/roboto-latin-400-normal.woff?url";
import roboto700 from "@fontsource/roboto/files/roboto-latin-700-normal.woff?url";
import outfit400 from "@fontsource/outfit/files/outfit-latin-400-normal.woff?url";
import outfit700 from "@fontsource/outfit/files/outfit-latin-700-normal.woff?url";
import merriweather400 from "@fontsource/merriweather/files/merriweather-latin-400-normal.woff?url";
import merriweather700 from "@fontsource/merriweather/files/merriweather-latin-700-normal.woff?url";
import playfair400 from "@fontsource/playfair-display/files/playfair-display-latin-400-normal.woff?url";
import playfair700 from "@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff?url";
import jetbrains400 from "./assets/JetBrainsMono-Regular.ttf?url";
import jetbrains700 from "./assets/JetBrainsMono-Bold.ttf?url";

export function registerPdfFonts() {
  Font.register({
    family: "rf-inter",
    fonts: [
      { src: inter400, fontWeight: 400 },
      { src: inter700, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "rf-dmsans",
    fonts: [
      { src: dmsans400, fontWeight: 400 },
      { src: dmsans700, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "rf-roboto",
    fonts: [
      { src: roboto400, fontWeight: 400 },
      { src: roboto700, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "rf-outfit",
    fonts: [
      { src: outfit400, fontWeight: 400 },
      { src: outfit700, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "rf-merriweather",
    fonts: [
      { src: merriweather400, fontWeight: 400 },
      { src: merriweather700, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "rf-playfair",
    fonts: [
      { src: playfair400, fontWeight: 400 },
      { src: playfair700, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "rf-jetbrains",
    fonts: [
      { src: jetbrains400, fontWeight: 400 },
      { src: jetbrains700, fontWeight: 700 },
    ],
  });
}
