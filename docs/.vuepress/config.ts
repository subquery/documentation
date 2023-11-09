import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { redirectPlugin } from "vuepress-plugin-redirect";
import { getSidebar } from "./sidebar";

export default defineUserConfig({
  title: "SubQuery Academy (Documentation)",
  description:
    "Learn how to build with SubQuery. SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project. Build your API anywhere across multiple chains in minutes with our open-source SDK.",
  head: [
    ["link", { rel: "icon", href: "/assets/img/logo.png" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "/assets/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/favicons/favicon-16x16.png",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!",
    },

    // "/zh/": {
    //   lang: "zh-CN",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/es/": {
    //   lang: "es",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/de/": {
    //   lang: "de-AT",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/id/": {
    //   lang: "id",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/it/": {
    //   lang: "it",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/ja/": {
    //   lang: "ja",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/ko/": {
    //   lang: "ko",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/ru/": {
    //   lang: "ru",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/th/": {
    //   lang: "th",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/tr/": {
    //   lang: "tr",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/uk/": {
    //   lang: "uk",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/vi/": {
    //   lang: "vi",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
  },
  theme: hopeTheme({
    hostname: "https://academy.subquery.network",

    favicon: "/assets/favicons/favicon.ico",
    author: "SubQuery Team",

    locales: {
      "/": {
        sidebar: getSidebar(""),
      },

      // "/de/": {
      //   sidebar: getSidebar("/de"),
      // },
      // "/tr/": {
      //   sidebar: getSidebar("/tr"),
      // },
      // "/zh/": {
      //   sidebar: getSidebar("/zh"),
      // },
      // "/vi/": {
      //   sidebar: getSidebar("/vi"),
      // },
      // "/ru/": {
      //   sidebar: getSidebar("/ru"),
      // },
      // "/uk/": {
      //   sidebar: getSidebar("/uk"),
      // },
      // "/es/": {
      //   sidebar: getSidebar("/es"),
      // },
      // "/ja/": {
      //   sidebar: getSidebar("/js"),
      // },
      // "/ko/": {
      //   sidebar: getSidebar("/ko"),
      // },

      // "/id/": {
      //   sidebar: getSidebar("/id"),
      // },
      // "/it/": {
      //   sidebar: getSidebar("/it"),
      // },
      // "/th/": {
      //   sidebar: getSidebar("/th"),
      // },
    },

    darkmode: "enable",
    logo: "/assets/img/logo.png",

    navbar: [
      {
        text: "Explorer",
        link: "https://explorer.subquery.network/",
        target: "_blank",
        rel: "",
      },
      {
        text: "Managed Service",
        link: "https://managedservice.subquery.network/",
        target: "_blank",
        rel: "",
      },
      { text: "Documentation", link: "/" },
      {
        text: "GitHub",
        link: "https://github.com/subquery/subql",
        target: "_blank",
        rel: "",
      },
    ],

    repo: "https://github.com/subquery/documentation",
    repoLabel: "Docs GitHub",
    docsRepo: "https://github.com/subquery/documentation",
    docsDir: "docs",
    docsBranch: "master",

    lastUpdated: true,

    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
        codetabs: true,
        checkLinks: {
          // only check links in dev mode
          status: "dev",
        },
      },

      pwa: {
        manifest: {
          short_name: "SubQL Docs",
        },
        favicon: "/assets/favicons/favicon.ico",
      },

      seo: {
        autoDescription: true,
        twitterID: "@SubQueryNetwork",
        fallBackImage: "https://static.subquery.network/link-share.jpg",
      },
    },
  }),

  plugins: [
    docsearchPlugin({
      appId: "30B5W460WL",
      apiKey: "fdae5afc6c3711a8b4f53a4801b43143",
      indexName: "subquery_academy",
    }),
    googleAnalyticsPlugin({
      id: "G-MY90N76MNK",
    }),
    redirectPlugin({
      config: {
        "/subquery_network/architects.html":
          "/subquery_network/architects/introduction.html",
        "/subquery_network/consumers.html":
          "/subquery_network/consumers/introduction.html",
        "/subquery_network/delegators.html":
          "/subquery_network/delegators/introduction.html",
        "/subquery_network/indexers.html":
          "/subquery_network/indexers/introduction.html",
        "/subquery_network/token.html": "/subquery_network/token/token.html",
        "/subquery_network/design-philosophy.html":
          "/subquery_network/design/design-philosophy.html",
        "/subquery_network/payment-methods.html":
          "/subquery_network/design/payment-methods.html",
        "/subquery_network/kepler/welcome.html":
          "/subquery_network/introduction.html",
        "/subquery_network/kepler/ksqt.html":
          "/subquery_network/token/token.html",
        "/subquery_network/kepler/indexers/become-an-indexer.html":
          "/subquery_network/indexers/become-an-indexer.html",
        "/subquery_network/kepler/indexers/install-indexer-locally.html":
          "/subquery_network/indexers/install-indexer-locally.html",
        "/subquery_network/kepler/indexers/install-indexer-linux.html":
          "/subquery_network/indexers/install-indexer-linux.html",
        "/subquery_network/kepler/indexers/index-project.html":
          "/subquery_network/indexers/index-project.html",
        "/subquery_network/kepler/indexers/dictionary-restore.html":
          "/subquery_network/indexers/dictionary-restore.html",
        "/subquery_network/kepler/indexers/plans.html":
          "/subquery_network/indexers/plans.html",
        "/subquery_network/kepler/indexers/troubleshooting-indexers.html":
          "/subquery_network/indexers/troubleshooting-indexers.html",
        "/subquery_network/kepler/indexers/faqs-indexers.html":
          "/subquery_network/indexers/faqs-indexers.html",
        "/subquery_network/kepler/indexers/ssl-configuration.html":
          "/subquery_network/indexers/indexer-security-guide.html",
        "/subquery_network/indexers/ssl-configuration.html":
          "/subquery_network/indexers/indexer-security-guide.html",
        "/build/manifest/terra.html": "/build/manifest/cosmos.html",
        "/build/mapping/terra.html": "/build/mapping/cosmos.html",
        "/build/quickstart/quickstart_chains/terra.html":
          "/build/quickstart/quickstart_chains/cosmos.html",
        "/run_publish/ipfs.html": "/miscellaneous/ipfs.html",
      },
    }),
  ],

  shouldPrefetch: false,
});
