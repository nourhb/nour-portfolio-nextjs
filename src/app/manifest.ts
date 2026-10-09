import type { MetadataRoute } from "next";
import { homeDescription, person } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} | Full-Stack Engineer`,
    short_name: "Nour",
    description: homeDescription(),
    start_url: "/",
    display: "standalone",
    background_color: "#07051a",
    theme_color: "#07051a",
    icons: [{ src: "/icon.png", sizes: "32x32", type: "image/png" }],
  };
}
