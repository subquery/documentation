import { defineUserConfig, SidebarConfig, SidebarConfigArray } from "vuepress";
import { defaultTheme } from "vuepress";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { pwaPlugin } from "vuepress-plugin-pwa2";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { seoPlugin } from "vuepress-plugin-seo2";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  plugins: [
    googleAnalyticsPlugin({
      id: "G-MY90N76MNK",
    }),
    pwaPlugin({
      manifest: {
        short_name: "SubQL Docs",
      },
      favicon: "https://academy.subquery.network/assets/favicons/favicon.ico",
    }),
    mdEnhancePlugin({
      linkCheck: true,
      codetabs: true,
    }), // TODO remove legacy mode //https://vuepress-theme-hope.github.io/v2/md-enhance/migration.html
    sitemapPlugin({
      hostname: "https://blog.subquery.network",
    }),
    seoPlugin({
      hostname: "https://blog.subquery.network",
      author: "SubQuery Team",
      autoDescription: true,
      twitterID: "@SubQueryNetwork",
    }),
    docsearchPlugin({
      appId: "30B5W460WL",
      apiKey: "7f75a78b4f95cebe82c0ced1ff75235e",
      indexName: "subquery",
    }),
  ],
  title: "SubQuery Academy (Documentation)",
  description:
    "Learn how to build with SubQuery. SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project. Build your API anywhere across multiple chains in minutes with our open-source SDK.",
  head: [
    ["link", { rel: "icon", href: "/assets/img/logo.png" }],
    [
      "link",
      {
        rel: "icon",
        href: "assets/favicons/favicon.ico",
        type: "image/x-icon",
      },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "assets/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "assets/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "assets/favicons/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "assets/manifest.json" }],
  ],
  locales: {
    "/": {
      lang: "en-UK",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!",
    },
    "/de/": {
      lang: "de",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    // "/id/": {
    //   lang: "id",
    //   title: "SubQuery Academy (Documentation)",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    "/ru/": {
      lang: "ru",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
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
    "/uk/": {
      lang: "uk",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/vi/": {
      lang: "vi",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    /*
      "/es/": {
        lang: "es",
        title: "SubQuery Academy (Documentation)",
        description:
          "Explore and transform your chain data to build intuitive dApps faster!.",
      },
      */
    /*
      "/it/": {
        lang: "it",
        title: "SubQuery Academy (Documentation)",
        description:
          "Explore and transform your chain data to build intuitive dApps faster!.",
      },
      "/ja/": {
        lang: "ja",
        title: "SubQuery Academy (Documentation)",
        description:
          "Explore and transform your chain data to build intuitive dApps faster!.",
      },
      "/ko/": {
        lang: "ko",
        title: "SubQuery Academy (Documentation)",
        description:
          "Explore and transform your chain data to build intuitive dApps faster!.",
      },
      */
  },
  theme: defaultTheme({
    lastUpdated: true,
    locales: {
      "/": {
        sidebar: getSidebar(""),
      },
      "/zh/": {
        selectLanguageName: "Chinese",
        sidebar: getSidebar("/zh"),
      },
      "/vi/": {
        selectLanguageName: "Vietnamese",
        sidebar: getSidebar("/vi"),
      },
      "/ru/": {
        selectLanguageName: "Russian",
        sidebar: getSidebar("/ru"),
      },
      "/uk/": {
        selectLanguageName: "Ukranian",
        sidebar: getSidebar("/uk"),
      },
    },
    logo: "/assets/img/logo.png",
    navbar: [
      {
        text: "Explorer",
        link: "https://explorer.subquery.network/",
        target: "_blank",
        rel: "",
      },
      {
        text: "Projects",
        link: "https://project.subquery.network/",
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
    sidebarDepth: 2,
    docsRepo: "https://github.com/subquery/documentation",
    docsDir: "docs",
    docsBranch: "master",
  }),
});

chainWebpack: (config) => {
  /** Webpack rule to handle some non-image assets that we'll use */
  config.module
    .rule("files")
    .test(/\.(pdf|zip|ait|log|txt)$/)
    .use("file-loader")
    .loader("file-loader")
    .options({
      name: `[path][name].[ext]`,
      limit: 10000,
      esModule: false,
    });
  /** Explicitly setting esModule:false
   * to avoid this issue https://github.com/vuejs/vue-loader/issues/1612
   */
  config.module.rule("images").use("url-loader").options({
    limit: 10000,
    esModule: false,
  });
};

function getSidebar(locale: string): SidebarConfigArray {
  return [
    {
      text: "Welcome",
      link: `${locale === "" ? "/" : locale}`,
    },
    {
      text: "Quick Start",
      link: `${locale}/quickstart/quickstart`,
      collapsible: true,
      children: [
        `${locale}/quickstart/quickstart.md`,
        {
          text: "2. Specific Chains",
          children: [
            `${locale}/quickstart/quickstart_chains/polkadot.md`,
            `${locale}/quickstart/quickstart_chains/polkadot-humanode.md`,
            `${locale}/quickstart/quickstart_chains/cosmos.md`,
            `${locale}/quickstart/quickstart_chains/cosmos-cronos.md`,
            `${locale}/quickstart/quickstart_chains/cosmos-thorchain.md`,
            `${locale}/quickstart/quickstart_chains/algorand.md`,
            `${locale}/quickstart/quickstart_chains/avalanche.md`,
            `${locale}/quickstart/quickstart_chains/flare.md`,
            `${locale}/quickstart/quickstart_chains/terra.md`,
          ],
        },
        `${locale}/quickstart/whats-next.md`,
      ],
    },
    {
      text: "Build",
      link: `${locale}/build/introduction`,
      collapsible: true,
      children: [
        `${locale}/build/introduction.md`,
        `${locale}/build/install.md`,
        {
          text: "Manifest File",
          children: [
            `${locale}/build/manifest/polkadot.md`,
            `${locale}/build/manifest/cosmos.md`,
            `${locale}/build/manifest/avalanche.md`,
            `${locale}/build/manifest/algorand.md`,
            `${locale}/build/manifest/flare.md`,
            `${locale}/build/manifest/terra.md`,
          ],
        },
        `${locale}/build/graphql.md`,
        {
          text: "Mapping",
          children: [
            `${locale}/build/mapping/polkadot.md`,
            `${locale}/build/mapping/cosmos.md`,
            `${locale}/build/mapping/avalanche.md`,
            `${locale}/build/mapping/algorand.md`,
            `${locale}/build/mapping/flare.md`,
            `${locale}/build/mapping/terra.md`,
            `${locale}/build/mapping/store.md`,
          ],
        },
        `${locale}/build/multi-chain.md`,
        `${locale}/build/substrate-evm.md`,
        `${locale}/build/substrate-wasm.md`,
        `${locale}/build/cosmos-evm.md`,
        `${locale}/build/dynamicdatasources.md`,
        `${locale}/build/graph-migration.md`,
        `${locale}/build/optimisation.md`,
      ],
    },
    {
      text: "Run & Publish",
      link: `${locale}/run_publish/publish`,
      collapsible: true,
      children: [
        `${locale}/run_publish/run.md`,
        `${locale}/run_publish/publish.md`,
        `${locale}/run_publish/cli.md`,
        `${locale}/run_publish/query.md`,
        `${locale}/run_publish/graphql.md`,
        `${locale}/run_publish/ipfs.md`,
        `${locale}/run_publish/aggregate.md`,
        `${locale}/run_publish/subscription.md`,
        `${locale}/run_publish/historical.md`,
        `${locale}/run_publish/references.md`,
      ],
    },
    {
      text: "SubQuery Network",
      link: `${locale}/subquery_network/introduction`,
      collapsible: true,
      children: [
        `${locale}/subquery_network/introduction.md`,
        `${locale}/subquery_network/token.md`,
        `${locale}/subquery_network/consumers.md`,
        `${locale}/subquery_network/indexers.md`,
        `${locale}/subquery_network/delegators.md`,
        `${locale}/subquery_network/architects.md`,
        `${locale}/subquery_network/payment-methods.md`,
        `${locale}/subquery_network/foundation.md`,
        `${locale}/subquery_network/design-philosophy.md`,
        {
          text: "Kepler Network",
          link: `${locale}/subquery_network/kepler/welcome`,
          children: [
            `${locale}/subquery_network/kepler/welcome.md`,
            {
              text: "Indexers",
              link: `${locale}/subquery_network/kepler/indexers/become-an-indexer`,
              children: [
                `${locale}/subquery_network/kepler/indexers/become-an-indexer.md`,
                `${locale}/subquery_network/kepler/indexers/install-indexer-locally.md`,
                `${locale}/subquery_network/kepler/indexers/install-indexer-linux.md`,
                `${locale}/subquery_network/kepler/indexers/install-indexer-aws.md`,
                `${locale}/subquery_network/kepler/indexers/index-project.md`,
                `${locale}/subquery_network/kepler/indexers/ssh-in-aws.md`,
                `${locale}/subquery_network/kepler/indexers/troubleshooting-indexers.md`,
                `${locale}/subquery_network/kepler/indexers/faqs-indexers.md`,
              ],
            },
            `${locale}/subquery_network/kepler/delegators.md`,
            `${locale}/subquery_network/kepler/consumers.md`,
            {
              text: "Metamask",
              link: `${locale}/subquery_network/kepler/metamask/connect-metamask`,
              children: [
                `${locale}/subquery_network/kepler/metamask/connect-metamask.md`,
              ],
            },
          ],
        },
      ],
    },
    {
      text: "Courses",
      link: `${locale}/academy/herocourse/welcome`,
      collapsible: true,
      children: [
        {
          text: "Hero Course",
          link: `${locale}/academy/herocourse/welcome`,
          children: [
            `${locale}/academy/herocourse/welcome.md`,
            `${locale}/academy/herocourse/module1.md`,
            `${locale}/academy/herocourse/module2.md`,
            `${locale}/academy/herocourse/module3.md`,
            `${locale}/academy/herocourse/module4.md`,
            `${locale}/academy/herocourse/module5.md`,
            `${locale}/academy/herocourse/module6.md`,
          ],
        },
        {
          text: "Tutorials & Examples",
          link: `${locale}/academy/tutorials_examples/introduction`,
          children: [
            `${locale}/academy/tutorials_examples/introduction.md`,
            `${locale}/academy/tutorials_examples/block-height.md`,
            `${locale}/academy/tutorials_examples/batch-size.md`,
            `${locale}/academy/tutorials_examples/run-indexer.md`,
            `${locale}/academy/tutorials_examples/dictionary.md`,
            `${locale}/academy/tutorials_examples/debug-projects.md`,
            `${locale}/academy/tutorials_examples/delete-projects.md`,
            `${locale}/academy/tutorials_examples/terminology.md`,
          ],
        },
        `${locale}/academy/subquery101/subquery101.md`,
      ],
    },
    {
      text: "Miscellaneous",
      link: `${locale}/miscellaneous/contributing`,
      collapsible: true,
      children: [
        `${locale}/miscellaneous/contributing.md`,
        `${locale}/miscellaneous/social_media.md`,
        `${locale}/miscellaneous/branding.md`,
        `${locale}/miscellaneous/ambassadors.md`,
      ],
    },
    {
      text: "FAQs",
      link: `${locale}/faqs/faqs.md`,
    },
    {
      text: "Glossary",
      link: `${locale}/glossary/glossary.md`,
    },
  ];
}
