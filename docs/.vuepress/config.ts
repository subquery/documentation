import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { redirectPlugin } from "@vuepress/plugin-redirect";
import { markdownStylizePlugin } from "@vuepress/plugin-markdown-stylize";
import { markdownIncludePlugin } from "@vuepress/plugin-markdown-include";
import { getSidebar } from "./sidebar";

export default defineUserConfig({
  base: "/doc/",
  title: "SubQuery Documentation",
  description:
    "Learn how to build with SubQuery. SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project. Build your API anywhere across multiple chains in minutes with our open-source SDK.",
  head: [
    ["link", { rel: "icon", href: "/assets/img/logo.png" }],
    [
      "meta",
      {
        content: "user-scalable=no, width=device-width, initial-scale=1.0",
      },
    ],
    [
      "script",
      {},
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PF5M4WSK');`,
    ],
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "SubQuery Documentation",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!",
    },
  },
  theme: hopeTheme({
    hostname: "https://subquery.network/doc/",

    favicon: "/assets/favicons/favicon.ico",
    author: "SubQuery Team",

    locales: {
      "/": {
        sidebar: getSidebar(""),
      },
    },

    darkmode: "enable",
    logo: "/assets/img/logo.png",
    markdown: {
      linksCheck: {
        build: "error",
      },
      tabs: true,
      codeTabs: true,
    },

    navbar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "SubQuery Indexer SDK",
        link: "/indexer/welcome.md",
      },
      {
        text: "SubQuery AI Apps Framework",
        link: "/ai/welcome.md",
      },
      {
        text: "SubQuery Network",
        link: "/subquery_network/welcome.md",
      },
      {
        text: "Miscellaneous",
        link: "/miscellaneous/contributing.md",
      },
    ],

    repo: "https://github.com/subquery/documentation",
    repoLabel: "Docs GitHub",
    docsRepo: "https://github.com/subquery/documentation",
    docsDir: "docs",
    docsBranch: "master",

    lastUpdated: true,

    plugins: {
      docsearch: {
        appId: "30B5W460WL",
        apiKey: "fdae5afc6c3711a8b4f53a4801b43143",
        indexName: "subquery_academy",
      },
      /*
      pwa: {
        manifest: {
          short_name: "SubQL Docs",
        },
        favicon: "/assets/favicons/favicon.ico",
      },
      */

      seo: {
        autoDescription: true,
        twitterID: "@SubQueryNetwork",
        fallBackImage: "https://static.subquery.network/link-share.jpg",
      },
    },
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  plugins: [
    markdownStylizePlugin({
      // options
      sup: true,
      sub: true,
    }),
    markdownIncludePlugin({
      // options
      deep: true,
      useComment: true,
    }),
    registerComponentsPlugin({
      componentsDir: "./docs/.vuepress/components",
    }),

    redirectPlugin({
      config: (app) => {
        const redirects: Record<string, string> = {
          "/subquery_network/architects.html":
            "/subquery_network/architects/introduction.html",
          "/subquery_network/consumers.html":
            "/subquery_network/consumers/introduction.html",
          "/subquery_network/delegators.html":
            "/subquery_network/delegators/introduction.html",
          "/subquery_network/indexers.html":
            "/subquery_network/node_operators/indexers/introduction.html",
          "/subquery_network/token.html": "/subquery_network/token/token.html",
          "/subquery_network/introduction.html":
            "/subquery_network/introduction/introduction.html",
          "/subquery_network/design-philosophy.html":
            "/subquery_network/introduction/design-philosophy.html",
          "/subquery_network/payment-methods.html":
            "/subquery_network/introducton/payment-methods.html",
          "/subquery_network/design/era.html":
            "/subquery_network/introduction/era.html",
          "/subquery_network/design/reward-distribution.html":
            "/subquery_network/introduction/reward-distribution.html",
          "/subquery_network/kepler/welcome.html":
            "/subquery_network/introduction.html",
          "/subquery_network/kepler/ksqt.html":
            "/subquery_network/token/token.html",
          "/subquery_network/kepler/indexers/become-an-indexer.html":
            "/subquery_network/node_operators/indexers/become-an-indexer.html",
          "/subquery_network/kepler/indexers/install-indexer-locally.html":
            "/subquery_network/node_operators/indexers/install-indexer-locally.html",
          "/subquery_network/kepler/indexers/install-indexer-linux.html":
            "/subquery_network/node_operators/indexers/install-indexer-linux.html",
          "/subquery_network/kepler/indexers/index-project.html":
            "/subquery_network/node_operators/indexers/index-project.html",
          "/subquery_network/kepler/indexers/plans.html":
            "/subquery_network/node_operators/indexers/plans.html",
          "/subquery_network/kepler/indexers/troubleshooting-indexers.html":
            "/subquery_network/node_operators/indexers/troubleshooting-indexers.html",
          "/subquery_network/kepler/indexers/faqs-indexers.html":
            "/subquery_network/node_operators/indexers/faqs-indexers.html",
          "/subquery_network/kepler/indexers/ssl-configuration.html":
            "/subquery_network/node_operators/indexers/indexer-security-guide.html",
          "/subquery_network/indexers/ssl-configuration.html":
            "/subquery_network/node_operators/indexers/indexer-security-guide.html",
          "/build/manifest/terra.html": "/indexer/build/manifest/cosmos.html",
          "/build/mapping/terra.html": "/indexer/build/mapping/cosmos.html",
          "/build/quickstart/quickstart_chains/terra.html":
            "/indexer/quickstart/quickstart_chains/cosmos.html",
          "/run_publish/ipfs.html": "/indexer/miscellaneous/ipfs.html",
          "/miscellaneous/ipfs.html": "/indexer/miscellaneous/ipfs.html",
          "/miscellaneous/avalanche-eth-migration.html":
            "/indexer/miscellaneous/avalanche-eth-migration.html",
          "/faqs/faqs.html": "/indexer/miscellaneous/faqs.html",
          "glossary/glossary.html": "/subquery_network/glossary.html",
          "/run_publish/query.html": "/indexer/run_publish/query/graphql.html",
          "/run_publish/aggregate.html":
            "/indexer/run_publish/query/aggregate.html",
          "/run_publish/subscription.html":
            "/indexer/run_publish/query/subscription.html",
          "/quickstart/quickstart_chains/astar-zkatana.html":
            "/indexer/quickstart/quickstart_chains/astar-zkevm.html",
          "/quickstart/quickstart_chains/x1.html":
            "/indexer/quickstart/quickstart_chains/xlayer-testnet.html",
          "/subquery_network/publish.html":
            "/subquery_network/architects/publish.html",
          "/subquery_network/foundation.html":
            "/subquery_network/governance/foundation.html",
          "/indexer/run_publish/publish.html":
            "/indexer/run_publish/introduction.html",
  
          // Restructured SDK build redirects
          "/indexer/build/cosmos-evm.html":
            "/indexer/build/datasource-processors/cosmos-evm.html",
          "/indexer/build/substrate-evm.html":
            "/indexer/build/datasource-processors/substrate-evm.html",
          "/indexer/build/substrate-wasm.html":
            "/indexer/build/datasource-processors/substrate-wasm.html",
          "/indexer/build/dynamicdatasources.html":
            "/indexer/build/dynamic-datasources.html",
          "/indexer/build/graphql.html":
            "/indexer/build/graphql/reference.html",

          // Manifest redirects to introduction
          "/indexer/build/manifest/algorand.html":
            "/indexer/build/manifest/chain-specific/algorand.html",
          "/indexer/build/manifest/arbitrum.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/avalanche.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/bsc.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/concordium.html":
            "/indexer/build/manifest/chain-specific/concordium.html",
          "/indexer/build/manifest/cosmos.html":
            "/indexer/build/manifest/chain-specific/cosmos.html",
          "/indexer/build/manifest/flare.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/gnosis.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/near.html":
            "/indexer/build/manifest/chain-specific/near.html",
          "/indexer/build/manifest/optimism.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/polkadot.html":
            "/indexer/build/manifest/chain-specific/polkadot.html",
          "/indexer/build/manifest/polygon.html":
            "/indexer/build/manifest/chain-specific/ethereum.html",
          "/indexer/build/manifest/solana.html":
            "/indexer/build/manifest/chain-specific/solana.html",
          "/indexer/build/manifest/starknet.html":
            "/indexer/build/manifest/chain-specific/starknet.html",
          "/indexer/build/manifest/stellar.html":
            "/indexer/build/manifest/chain-specific/stellar.html",

          // Mapping redirects to new structure
          "/indexer/build/mapping/arbitrum.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
          "/indexer/build/mapping/avalanche.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
          "/indexer/build/mapping/bsc.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
          "/indexer/build/mapping/flare.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
          "/indexer/build/mapping/gnosis.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
          "/indexer/build/mapping/optimism.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
          "/indexer/build/mapping/polygon.html":
            "/indexer/build/mapping-functions/mapping/ethereum.html",
        };
        return {
          ...redirects,
          ...Object.fromEntries(
            app.pages.map(({ path }) => [
              path.replace(
                "/subquery_network/node_operators/indexers/",
                "/subquery_network/indexers/"
              ),
              path,
            ])
          ),
          ...Object.fromEntries(
            app.pages.map(({ path }) => [
              path.replace("/indexer/academy/", "/academy/"),
              path,
            ])
          ),
          ...Object.fromEntries(
            app.pages.map(({ path }) => [
              path.replace("/indexer/build/", "/build/"),
              path,
            ])
          ),
          ...Object.fromEntries(
            app.pages.map(({ path }) => [
              path.replace("/indexer/miscellaneous/", "/miscellaneous/"),
              path,
            ])
          ),
          ...Object.fromEntries(
            app.pages.map(({ path }) => [
              path.replace("/indexer/quickstart/", "/quickstart/"),
              path,
            ])
          ),
          ...Object.fromEntries(
            app.pages.map(({ path }) => [
              path.replace("/indexer/run_publish/", "/run_publish/"),
              path,
            ])
          ),
        };
      },
    }),
  ],

  shouldPrefetch: false,
});
