const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "SubQuery Academy",
  head: [
    ['link', { rel: 'icon', href: 'public/assets/img/logo.png' }],
    ['link', { rel: 'icon', href: 'public/assets/favicons/favicon.ico', type: 'image/x-icon' }],
    ['link', { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: 'public/assets/favicons/apple-touch-icon.png'}],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'public/assets/favicons/favicon-32x32.png'}],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'public/assets/favicons/favicon-16x16.png'}],
    ['link', { rel: 'manifest', href: 'public/assets/manifest.json'}]
  ],
  locales: {
    "/": {
      lang: "en-UK",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!",
    },
    "/de/": {
      lang: "de",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    // "/id/": {
    //   lang: "id",
    //   title: "SubQuery Academy",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    "/ru/": {
      lang: "ru",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    // "/th/": {
    //   lang: "th",
    //   title: "SubQuery Academy",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    // "/tr/": {
    //   lang: "tr",
    //   title: "SubQuery Academy",
    //   description:
    //     "Explore and transform your chain data to build intuitive dApps faster!.",
    // },
    "/uk/": {
      lang: "uk",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/vi/": {
      lang: "vi",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    /*
    "/es/": {
      lang: "es",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    */
    /*
    "/it/": {
      lang: "it",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/ja/": {
      lang: "ja",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    "/ko/": {
      lang: "ko",
      title: "SubQuery Academy",
      description:
        "Explore and transform your chain data to build intuitive dApps faster!.",
    },
    */
  },
  themeConfig: {
    algolia: {
      appId: "30B5W460WL",
      apiKey: "7f75a78b4f95cebe82c0ced1ff75235e",
      indexName: "subquery",
    },
    cleanUrl: false,
    contributor: false,
    hostname: "https://academy.subquery.network",
    lastUpdated: true,
    locales: {
      "/": getSidebar("", "English"),
      "/zh/": getSidebar("/zh", "Chinese"),
      "/de/": getSidebar("/de", "German"),
      "/vi/": getSidebar("/vi", "Vietnamese"),
      "/ru/": getSidebar("/ru", "Russian"),
      "/uk/": getSidebar("/uk", "Ukranian"),
    },
    logo: "/assets/img/logo.png",
    logoLink: "https://subquery.network",
    markdown: {
      extractHeaders: ["h2", "h3"],
    },
    mdEnhance: {
      codegroup: true,
    },
    nav: [
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
    plugins: [
      [
        "@vuepress/plugin-google-analytics",
        {
          id: "G-MY90N76MNK",
        },
        "fulltext-search",
        '@vuepress/pwa'
      ],
    ],
    pwa: true,
    sidebarDepth: 2,
    themeColor: false,
  },
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

function getSidebar(locale, language) {
  return {
    selectLanguageName: language,
    sidebar: [
      {
        title: "Welcome",
        path: `${locale === "" ? "/" : locale}`,
        collapsable: true,
      },
      {
        title: "Quick Start",
        path: `${locale}/quickstart/quickstart`,
        collapsable: true,
        children: [
          `${locale}/quickstart/quickstart.md`,
          {
            title: "2. Specific Chains",
            collapsable: true,
            children: [
              `${locale}/quickstart/quickstart_chains/polkadot.md`,
              `${locale}/quickstart/quickstart_chains/avalanche.md`,
              `${locale}/quickstart/quickstart_chains/cosmos.md`,
              `${locale}/quickstart/quickstart_chains/terra.md`,
              `${locale}/quickstart/quickstart_chains/algorand.md`,
            ],
          },
          `${locale}/quickstart/whats-next.md`,
        ],
      },
      {
        title: "Build",
        path: `${locale}/build/introduction`,
        collapsable: true,
        children: [
          `${locale}/build/introduction.md`,
          `${locale}/build/install.md`,
          {
            title: "Manfest File",
            collapsable: true,
            children: [
              `${locale}/build/manifest/polkadot.md`,
              `${locale}/build/manifest/avalanche.md`,
              `${locale}/build/manifest/cosmos.md`,
              `${locale}/build/manifest/algorand.md`,
              `${locale}/build/manifest/terra.md`,
            ],
          },
          `${locale}/build/graphql.md`,
          {
            title: "Mapping",
            collapsable: true,
            children: [
              `${locale}/build/mapping/polkadot.md`,
              `${locale}/build/mapping/avalanche.md`,
              `${locale}/build/mapping/cosmos.md`,
              `${locale}/build/mapping/algorand.md`,
              `${locale}/build/mapping/terra.md`,
            ],
          },
          `${locale}/build/substrate-evm.md`,
          `${locale}/build/cosmos-evm.md`,
          `${locale}/build/dynamicdatasources.md`,
          `${locale}/build/graph-migration.md`,
        ],
      },
      {
        title: "Run & Publish",
        path: `${locale}/run_publish/publish`,
        collapsable: true,
        children: [
          `${locale}/run_publish/run.md`,
          `${locale}/run_publish/publish.md`,
          `${locale}/run_publish/upgrade.md`,
          `${locale}/run_publish/connect.md`,
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
        title: "SubQuery Network",
        path: `${locale}/subquery_network/introduction`,
        collapsable: true,
        children: [
          `${locale}/subquery_network/introduction.md`,
          `${locale}/subquery_network/token.md`,
          `${locale}/subquery_network/consumers.md`,
          `${locale}/subquery_network/indexers.md`,
          `${locale}/subquery_network/delegators.md`,
          `${locale}/subquery_network/payment-methods.md`,
          `${locale}/subquery_network/foundation.md`,
          `${locale}/subquery_network/terminology.md`,
          `${locale}/subquery_network/design-philosophy.md`,
          {
            title: "Frontier Testnet",
            path: `${locale}/subquery_network/testnet/welcome`,
            collapsable: true,
            children: [
              `${locale}/subquery_network/testnet/welcome.md`,
              {
                title: "Indexers",
                path: `${locale}/subquery_network/testnet/indexers/become-an-indexer`,
                collapsable: true,
                children: [
                  `${locale}/subquery_network/testnet/indexers/become-an-indexer.md`,
                  `${locale}/subquery_network/testnet/indexers/install-indexer-locally.md`,
                  `${locale}/subquery_network/testnet/indexers/install-indexer-linux.md`,
                  `${locale}/subquery_network/testnet/indexers/install-indexer-aws.md`,
                  `${locale}/subquery_network/testnet/indexers/index-project.md`,
                  `${locale}/subquery_network/testnet/indexers/ssh-in-aws.md`,
                  `${locale}/subquery_network/testnet/indexers/troubleshooting-indexers.md`,
                  `${locale}/subquery_network/testnet/indexers/faqs-indexers.md`,
                ],
              },
              {
                title: "Delegators",
                path: `${locale}/subquery_network/testnet/delegators/become-delegator`,
                collapsable: true,
                children: [
                  `${locale}/subquery_network/testnet/delegators/become-delegator.md`,
                ],
              },
              {
                title: "Consumer",
                path: `${locale}/subquery_network/testnet/consumers/become-consumer`,
                collapsable: true,
                children: [
                  `${locale}/subquery_network/testnet/consumers/become-consumer.md`,
                ],
              },
              {
                title: "Metamask",
                path: `${locale}/subquery_network/testnet/metamask/connect-metamask`,
                collapsable: true,
                children: [
                  `${locale}/subquery_network/testnet/metamask/connect-metamask.md`,
                  `${locale}/subquery_network/testnet/metamask/request-token.md`,
                ],
              },
              {
                title: "Season 3 Challenges",
                path: `${locale}/subquery_network/testnet/season3-challenges/season3`,
                collapsable: true,
                children: [
                  `${locale}/subquery_network/testnet/season3-challenges/season3.md`,
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Courses",
        path: `${locale}/academy/herocourse/welcome`,
        collapsable: true,
        children: [
          {
            title: "Hero Course",
            path: `${locale}/academy/herocourse/welcome`,
            collapsable: true,
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
            title: "Tutorials & Examples",
            path: `${locale}/academy/tutorials_examples/introduction`,
            collapsable: true,
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
        title: "Miscellaneous",
        path: `${locale}/miscellaneous/contributing`,
        collapsable: true,
        children: [
          `${locale}/miscellaneous/contributing.md`,
          `${locale}/miscellaneous/social_media.md`,
          `${locale}/miscellaneous/branding.md`,
          `${locale}/miscellaneous/ambassadors.md`,
        ],
      },
      {
        title: "FAQs",
        path: `${locale}/faqs/faqs`,
        collapsable: true,
        children: [`${locale}/faqs/faqs.md`],
      },
      {
        title: "Glossary",
        path: `${locale}/glossary/glossary`,
        collapsable: true,
        children: [`${locale}/glossary/glossary.md`],
      },
    ],
  };
}
