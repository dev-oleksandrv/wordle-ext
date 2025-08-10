import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: "Wordle EXT",
  description: "Wordle game extension with daily challenges and infinite mode.",
  version: pkg.version,
  icons: {
    48: "public/icon-48.png",
    128: "public/icon-128.png",
  },
  action: {
    default_icon: {
      48: "public/icon-48.png",
      128: "public/icon-128.png",
    },
    default_popup: "src/popup/index.html",
  },
  permissions: ["storage"],
});
