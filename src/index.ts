// import { DocusaurusContext } from "@docusaurus/types";
import path from "path";
import merge from "lodash.merge";

import { ContentLoadedActions, ThemeContext } from "./types";
import { defaultThemeData } from "./data";

import { THEME_NAME } from "./constants";

export default function ifoodDocusaurus(context: ThemeContext) {
  const {
    siteConfig: { ifood },
  } = context;
  const themeData = merge(defaultThemeData, ifood || {});

  return {
    name: THEME_NAME,
    getThemePath() {
      return path.resolve(__dirname, "theme");
    },
    getClientModules() {
      return [path.resolve(__dirname, "./style.css")];
    },
    translateThemeConfig({
      themeConfig,
      ifood,
    }: {
      themeConfig: any;
      ifood: any;
    }) {
      const config = {
        navbar: {
          logo: {
            alt: 'iFood logo',
            src: 'default',
          }
        },
      }
      return merge(themeConfig, config);
    },
    contentLoaded({ actions }: { actions: ContentLoadedActions }) {
      const { setGlobalData } = actions;
      setGlobalData(themeData);
    },
  };
}
