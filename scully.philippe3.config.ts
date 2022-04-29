import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";

/** this loads the default render plugin, remove when switching to something else. */

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "philippe3",
  spsModulePath: "YOUR OWN MODULE PATH HERE",
  outDir: "./dist/static",
  routes: {
    "/blog/:slug": {
      type: "contentFolder",
      slug: {
        folder: "./blog",
      },
    },
  },
};
