import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";

/** Full variable Bricolage (wght 200–800, wdth 75–100, opsz 12–96): wdth/wght are animated. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jb",
  display: "swap",
});
