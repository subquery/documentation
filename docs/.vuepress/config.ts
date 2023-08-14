import { defineUserConfig } from "vuepress";
import { hopeTheme, SidebarOptions } from "vuepress-theme-hope";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { seoPlugin } from "vuepress-plugin-seo2";
import { redirectPlugin } from "vuepress-plugin-redirect";

const hostname = "https://academy.subquery.network";

export default defineUserConfig({
  plugins: [
    googleAnalyticsPlugin({
      id: "G-MY90N76MNK",
    }),
    seoPlugin({
      hostname,
      author: {
        name: "SubQuery Team",
      },
      autoDescription: true,
      twitterID: "@SubQueryNetwork",
      fallBackImage: "https://static.subquery.network/link-share.jpg",
    }),
    sitemapPlugin({
      hostname,
    }),
    docsearchPlugin({
      appId: "30B5W460WL",
      apiKey: "fdae5afc6c3711a8b4f53a4801b43143",
      indexName: "subquery_academy",
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
          "/subquery_network/indexers/ssl-configuration.html",
      },
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
        href: "/assets/favicons/favicon.ico",
        type: "image/x-icon",
      },
    ],
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
    ["link", { rel: "manifest", href: "/assets/manifest.json" }],
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/es/": {
      lang: "es",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/de/": {
      lang: "de-AT",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    /*
    "/id/": {
       lang: "id",
       title: "SubQuery Academy (Documentation)",
       description:
         "Explore and transform your chain data to build intuitive dApps faster!.",
     },
     "/it/": {
       lang: "it",
       title: "SubQuery Academy (Documentation)",
       description:
         "Explore and transform your chain data to build intuitive dApps faster!.",
     },
     */
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
    "/ru/": {
      lang: "ru",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    /*
    "/th/": {
       lang: "th",
       title: "SubQuery Academy (Documentation)",
       description:
         "Explore and transform your chain data to build intuitive dApps faster!.",
     },
     */
    "/tr/": {
      lang: "tr",
      title: "SubQuery Academy (Documentation)",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
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
  },
  theme: hopeTheme({
    hostname,
    favicon: "/assets/favicons/favicon.ico",
    author: "SubQuery Team",
    lastUpdated: true,
    locales: {
      "/": {
        sidebar: getSidebar(""),
      },
      "/de/": {
        sidebar: getSidebar("/de"),
      },
      "/tr/": {
        sidebar: getSidebar("/tr"),
      },
      "/zh/": {
        sidebar: getSidebar("/zh"),
      },
      "/vi/": {
        sidebar: getSidebar("/vi"),
      },
      "/ru/": {
        sidebar: getSidebar("/ru"),
      },
      "/uk/": {
        sidebar: getSidebar("/uk"),
      },
      "/es/": {
        sidebar: getSidebar("/es"),
      },
      "/ja/": {
        sidebar: getSidebar("/js"),
      },
      "/ko/": {
        sidebar: getSidebar("/ko"),
      },
      /*
      "/id/": {
        sidebar: getSidebar("/id"),
      },
      "/it/": {
        sidebar: getSidebar("/it"),
      },
      "/th/": {
        sidebar: getSidebar("/th"),
      },
      */
    },
    logo: "/assets/img/logo.png",
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
    },
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

function getSidebar(locale: string): SidebarOptions {
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
          collapsible: true,
          children: [
            {
              text: "Algorand",
              link: `${locale}/quickstart/quickstart_chains/algorand.md`,
            },
            {
              text: "Arbitrum",
              link: `${locale}/quickstart/quickstart_chains/arbitrum.md`,
            },
            {
              text: "Avalanche",
              collapsible: true,
              children: [
                {
                  text: "Avalanche (Pangolin Rewards)",
                  link: `${locale}/quickstart/quickstart_chains/avalanche.md`,
                },
                {
                  text: "Avalanche (Crabada NFTs)",
                  link: `${locale}/quickstart/quickstart_chains/avalanche-crabada.md`,
                },
              ],
            },
            {
              text: "Base",
              collapsible: true,
              children: [
                {
                  text: "Base (Mainnet)",
                  link: `${locale}/quickstart/quickstart_chains/base.md`,
                },
                {
                  text: "Base (Goerli Testnet)",
                  link: `${locale}/quickstart/quickstart_chains/base-goerli.md`,
                },
              ],
            },
            {
              text: "BNB Smart Chain (BSC)",
              link: `${locale}/quickstart/quickstart_chains/bsc.md`,
            },
            {
              text: "Cosmos",
              collapsible: true,
              children: [
                {
                  text: "Akash",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-akash.md`,
                },
                {
                  text: "Archway",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-archway.md`,
                },
                {
                  text: "Cronos (EVM)",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-cronos.md`,
                },
                {
                  text: "Juno",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-juno.md`,
                },
                {
                  text: "Sei",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-sei.md`,
                },
                {
                  text: "Terra",
                  link: `${locale}/quickstart/quickstart_chains/terra.md`,
                },
                {
                  text: "Thorchain",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-thorchain.md`,
                },
                {
                  text: "And more Cosmos zones",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-other.md`,
                },
              ],
            },
            {
              text: "Ethereum",
              collapsible: true,
              children: [
                {
                  text: "Ethereum Gravatar (Simple)",
                  link: `${locale}/quickstart/quickstart_chains/ethereum-gravatar.md`,
                },
                {
                  text: "Ethereum ENS (Complex)",
                  link: `${locale}/quickstart/quickstart_chains/ethereum-ens.md`,
                },
              ],
            },
            {
              text: "Flare",
              link: `${locale}/quickstart/quickstart_chains/flare.md`,
            },
            {
              text: "Gnosis",
              link: `${locale}/quickstart/quickstart_chains/gnosis.md`,
            },
            {
              text: "NEAR",
              collapsible: true,
              children: [
                {
                  text: "NEAR",
                  link: `${locale}/quickstart/quickstart_chains/near.md`,
                },
                {
                  text: "Aurora (EVM)",
                  link: `${locale}/quickstart/quickstart_chains/near-aurora.md`,
                },
              ],
            },
            {
              text: "Optimism",
              link: `${locale}/quickstart/quickstart_chains/optimism.md`,
            },
            {
              text: "Polkadot/Substrate",
              collapsible: true,
              children: [
                {
                  text: "Astar (WASM)",
                  link: `${locale}/quickstart/quickstart_chains/polkadot-astar.md`,
                },
                {
                  text: "Moonbeam (EVM)",
                  link: `${locale}/quickstart/quickstart_chains/polkadot-moonbeam.md`,
                },
                {
                  text: "Humanode",
                  link: `${locale}/quickstart/quickstart_chains/polkadot-humanode.md`,
                },
                {
                  text: "Kilt",
                  link: `${locale}/quickstart/quickstart_chains/polkadot-kilt.md`,
                },
                {
                  text: "Polkadot/Substrate",
                  link: `${locale}/quickstart/quickstart_chains/polkadot.md`,
                },
                {
                  text: "And more Polkadot chains",
                  link: `${locale}/quickstart/quickstart_chains/polkadot-other.md`,
                },
              ],
            },
            {
              text: "Polygon",
              link: `${locale}/quickstart/quickstart_chains/polygon.md`,
            },
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
          collapsible: true,
          children: [
            `${locale}/build/manifest/avalanche.md`,
            `${locale}/build/manifest/algorand.md`,
            `${locale}/build/manifest/arbitrum.md`,
            `${locale}/build/manifest/bsc.md`,
            `${locale}/build/manifest/cosmos.md`,
            `${locale}/build/manifest/ethereum.md`,
            `${locale}/build/manifest/flare.md`,
            `${locale}/build/manifest/gnosis.md`,
            `${locale}/build/manifest/near.md`,
            `${locale}/build/manifest/optimism.md`,
            `${locale}/build/manifest/polkadot.md`,
            `${locale}/build/manifest/polygon.md`,
            `${locale}/build/manifest/terra.md`,
          ],
        },
        `${locale}/build/graphql.md`,
        {
          text: "Mapping",
          collapsible: true,
          children: [
            `${locale}/build/mapping/avalanche.md`,
            `${locale}/build/mapping/algorand.md`,
            `${locale}/build/mapping/arbitrum.md`,
            `${locale}/build/mapping/bsc.md`,
            `${locale}/build/mapping/cosmos.md`,
            `${locale}/build/mapping/ethereum.md`,
            `${locale}/build/mapping/flare.md`,
            `${locale}/build/mapping/gnosis.md`,
            `${locale}/build/mapping/near.md`,
            `${locale}/build/mapping/optimism.md`,
            `${locale}/build/mapping/polkadot.md`,
            `${locale}/build/mapping/polygon.md`,
            `${locale}/build/mapping/terra.md`,
            `${locale}/build/mapping/store.md`,
          ],
        },
        `${locale}/build/testing.md`,
        `${locale}/build/graph-migration.md`,
        `${locale}/build/multi-chain.md`,
        `${locale}/build/dynamicdatasources.md`,
        `${locale}/build/substrate-evm.md`,
        `${locale}/build/substrate-wasm.md`,
        `${locale}/build/cosmos-evm.md`,
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
        `${locale}/run_publish/monitor.md`,
        `${locale}/run_publish/cli.md`,
        `${locale}/run_publish/query.md`,
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
        {
          text: "The SubQuery Tokens",
          link: `${locale}/subquery_network/token/token.md`,
          collapsible: true,
          children: [
            `${locale}/subquery_network/token/token.md`,
            `${locale}/subquery_network/token/tokenomics.md`,
            `${locale}/subquery_network/token/swap.md`,
          ],
        },
        {
          text: "Consumers",
          link: `${locale}/subquery_network/consumers/introduction.md`,
          collapsible: true,
          children: [
            `${locale}/subquery_network/consumers/introduction.md`,
            `${locale}/subquery_network/consumers/playground.md`,
            `${locale}/subquery_network/consumers/faq.md`,
          ],
        },
        {
          text: "Delegators",
          link: `${locale}/subquery_network/delegators/introduction.md`,
          collapsible: true,
          children: [
            `${locale}/subquery_network/delegators/introduction.md`,
            `${locale}/subquery_network/delegators/rewards.md`,
            `${locale}/subquery_network/delegators/delegating.md`,
          ],
        },
        {
          text: "Indexers",
          link: `${locale}/subquery_network/indexers/introduction.md`,
          collapsible: true,
          children: [
            `${locale}/subquery_network/indexers/introduction.md`,
            `${locale}/subquery_network/indexers/rewards.md`,
            {
              text: "Becoming an Indexer",
              link: `${locale}/subquery_network/indexers/become-an-indexer.md`,
              collapsible: true,
              children: [
                `${locale}/subquery_network/indexers/become-an-indexer.md`,
                `${locale}/subquery_network/indexers/install-indexer-locally.md`,
                `${locale}/subquery_network/indexers/install-indexer-linux.md`,
                `${locale}/subquery_network/indexers/index-project.md`,
                `${locale}/subquery_network/indexers/dictionary-restore.md`,
                `${locale}/subquery_network/indexers/troubleshooting-indexers.md`,
                `${locale}/subquery_network/indexers/ssl-configuration.md`,
              ],
            },
            `${locale}/subquery_network/indexers/plans.md`,
            `${locale}/subquery_network/indexers/faqs-indexers.md`,
          ],
        },
        `${locale}/subquery_network/architects/introduction.md`,
        `${locale}/subquery_network/foundation.md`,
        {
          text: "Design Philosophy",
          link: `${locale}/subquery_network/design/design-philosophy.md`,
          collapsible: true,
          children: [
            `${locale}/subquery_network/design/design-philosophy.md`,
            `${locale}/subquery_network/design/payment-methods.md`,
          ],
        },
        `${locale}/subquery_network/community.md`,
      ],
    },
    {
      text: "Courses",
      link: `${locale}/academy/academy.md`,
      collapsible: true,
      children: [
        {
          text: "Hero Course",
          link: `${locale}/academy/herocourse/welcome`,
          collapsible: true,
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
          text: "SubQuery Moonbeam Course",
          link: `${locale}/academy/moonbeam_course/welcome`,
          collapsible: true,
          children: [
            `${locale}/academy/moonbeam_course/welcome.md`,
            `${locale}/academy/moonbeam_course/lesson1.md`,
            `${locale}/academy/moonbeam_course/lesson2.md`,
            `${locale}/academy/moonbeam_course/lesson3.md`,
            `${locale}/academy/moonbeam_course/lesson4.md`,
            `${locale}/academy/moonbeam_course/lesson5.md`,
            `${locale}/academy/moonbeam_course/lesson6.md`,
          ],
        },
        {
          text: "Tutorials & Examples",
          link: `${locale}/academy/tutorials_examples/introduction`,
          collapsible: true,
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
        `${locale}/miscellaneous/avalanche-eth-migration.md`,
        `${locale}/miscellaneous/vulnerability-reporting.md`,
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
