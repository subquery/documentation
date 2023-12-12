import { sidebar } from "vuepress-theme-hope";

export const getSidebar = (locale: string) =>
  sidebar([
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
          text: "2. Edit your Project",
          collapsible: true,
          children: [
            {
              text: "EVM Networks",
              collapsible: true,
              children: [
                {
                  text: "Arbitrum",
                  link: `${locale}/quickstart/quickstart_chains/arbitrum.md`,
                },
                {
                  text: "Astar zKatana",
                  link: `${locale}/quickstart/quickstart_chains/astar-zkatana.md`,
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
                  text: "Boba",
                  collapsible: true,
                  children: [
                    {
                      text: "Boba (ETH)",
                      link: `${locale}/quickstart/quickstart_chains/boba-eth.md`,
                    },
                    {
                      text: "Boba (BNB)",
                      link: `${locale}/quickstart/quickstart_chains/boba-bnb.md`,
                    },
                  ],
                },
                {
                  text: "BNB Smart Chain (BSC)",
                  collapsible: true,
                  children: [
                    {
                      link: `${locale}/quickstart/quickstart_chains/bsc.md`,
                      text: "Mobox Pools",
                    },
                    {
                      link: `${locale}/quickstart/quickstart_chains/bsc-pancakeswap-v3.md`,
                      text: "PancakeSwap",
                    },
                  ],
                },
                {
                  text: "Celo",
                  link: `${locale}/quickstart/quickstart_chains/celo.md`,
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
                      text: "Ethereum BAYC (Simple)",
                      link: `${locale}/quickstart/quickstart_chains/ethereum-bayc.md`,
                    },
                    {
                      text: "Ethereum Chainlink (Medium)",
                      link: `${locale}/quickstart/quickstart_chains/ethereum-chainlink.md`,
                    },
                    {
                      text: "Ethereum Opensea (Medium)",
                      link: `${locale}/quickstart/quickstart_chains/ethereum-opensea.md`,
                    },
                    {
                      text: "Ethereum Uniswap (Complex)",
                      link: `${locale}/quickstart/quickstart_chains/ethereum-uniswap.md`,
                    },
                    {
                      text: "Ethereum ENS (Complex)",
                      link: `${locale}/quickstart/quickstart_chains/ethereum-ens.md`,
                    },
                  ],
                },
                {
                  text: "Fantom",
                  link: `${locale}/quickstart/quickstart_chains/fantom.md`,
                },
                {
                  text: "Flare",
                  link: `${locale}/quickstart/quickstart_chains/flare.md`,
                },
                {
                  text: "Heco Chain",
                  link: `${locale}/quickstart/quickstart_chains/heco.md`,
                },
                {
                  text: "Gnosis",
                  link: `${locale}/quickstart/quickstart_chains/gnosis.md`,
                },
                {
                  text: "Harmony",
                  link: `${locale}/quickstart/quickstart_chains/harmony.md`,
                },
                {
                  text: "Immutable (Testnet)",
                  link: `${locale}/quickstart/quickstart_chains/immutable-testnet.md`,
                },
                {
                  text: "Klaytn",
                  link: `${locale}/quickstart/quickstart_chains/klaytn.md`,
                },
                {
                  text: "Mantle",
                  link: `${locale}/quickstart/quickstart_chains/mantle.md`,
                },
                {
                  text: "Meter",
                  link: `${locale}/quickstart/quickstart_chains/meter.md`,
                },
                {
                  text: "Metis",
                  link: `${locale}/quickstart/quickstart_chains/metis.md`,
                },
                {
                  text: "Optimism",
                  link: `${locale}/quickstart/quickstart_chains/optimism.md`,
                },
                {
                  text: "Polygon",
                  collapsible: true,
                  children: [
                    {
                      text: "Polygon Mainnet",
                      link: `${locale}/quickstart/quickstart_chains/polygon.md`,
                    },
                    {
                      text: "Polygon Lens",
                      link: `${locale}/quickstart/quickstart_chains/polygon-lens.md`,
                    },
                    {
                      text: "Polygon zkEVM",
                      link: `${locale}/quickstart/quickstart_chains/polygon-zkevm.md`,
                    },
                  ],
                },
                {
                  text: "Scroll",
                  collapsible: true,
                  children: [
                    {
                      text: "Scroll Mainnet",
                      link: `${locale}/quickstart/quickstart_chains/scroll.md`,
                    },
                    {
                      text: "Scroll Sepolia",
                      link: `${locale}/quickstart/quickstart_chains/scroll-sepolia.md`,
                    },
                  ],
                },
                {
                  text: "Skale",
                  link: `${locale}/quickstart/quickstart_chains/skale.md`,
                },
                {
                  text: "ZkSync Era",
                  link: `${locale}/quickstart/quickstart_chains/zksync-era.md`,
                },
                {
                  text: "And more EVM networks",
                  link: `${locale}/quickstart/quickstart_chains/evm.md`,
                },
              ],
            },
            {
              text: "Algorand",
              link: `${locale}/quickstart/quickstart_chains/algorand.md`,
            },

            {
              text: "Concordium",
              link: `${locale}/quickstart/quickstart_chains/concordium.md`,
            },
            {
              text: "Cosmos",
              collapsible: true,
              children: [
                {
                  text: "Agoric",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-agoric.md`,
                },
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
                  text: "Dymension",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-dymension.md`,
                },
                {
                  text: "Juno",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-juno.md`,
                },
                {
                  text: "Neutron",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-neutron.md`,
                },
                {
                  text: "Osmosis",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-osmosis.md`,
                },
                {
                  text: "Sei",
                  link: `${locale}/quickstart/quickstart_chains/cosmos-sei.md`,
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
              text: "Multi-Chain",
              collapsible: true,
              children: [
                {
                  text: "Galxe NFTs",
                  link: `${locale}/quickstart/quickstart_multichain/galxe-nft.md`,
                },
                {
                  text: "Polygon Plasma Bridge",
                  link: `${locale}/quickstart/quickstart_multichain/polygon-plasma-bridge.md`,
                },
                {
                  text: "Snapshot",
                  link: `${locale}/quickstart/quickstart_multichain/snapshot.md`,
                },
                {
                  text: "Safe",
                  link: `${locale}/quickstart/quickstart_multichain/safe.md`,
                },
                {
                  text: "IBC transfers",
                  link: `${locale}/quickstart/quickstart_multichain/ibc-transfers.md`,
                },
              ],
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
                {
                  text: "Ref Finance",
                  link: `${locale}/quickstart/quickstart_chains/near-ref-finance.md`,
                },
              ],
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
              text: "Stellar & Soroban",
              link: `${locale}/quickstart/quickstart_chains/stellar.md`,
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
            `${locale}/build/manifest/concordium.md`,
            `${locale}/build/manifest/cosmos.md`,
            `${locale}/build/manifest/ethereum.md`,
            `${locale}/build/manifest/flare.md`,
            `${locale}/build/manifest/gnosis.md`,
            `${locale}/build/manifest/near.md`,
            `${locale}/build/manifest/optimism.md`,
            `${locale}/build/manifest/polkadot.md`,
            `${locale}/build/manifest/polygon.md`,
            `${locale}/build/manifest/stellar.md`,
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
            `${locale}/build/mapping/concordium.md`,
            `${locale}/build/mapping/cosmos.md`,
            `${locale}/build/mapping/ethereum.md`,
            `${locale}/build/mapping/flare.md`,
            `${locale}/build/mapping/gnosis.md`,
            `${locale}/build/mapping/near.md`,
            `${locale}/build/mapping/optimism.md`,
            `${locale}/build/mapping/polkadot.md`,
            `${locale}/build/mapping/polygon.md`,
            `${locale}/build/mapping/stellar.md`,
            `${locale}/build/mapping/cache.md`,
            `${locale}/build/mapping/store.md`,
          ],
        },
        `${locale}/build/testing.md`,
        `${locale}/build/graph-migration.md`,
        `${locale}/build/project-upgrades.md`,
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
        `${locale}/run_publish/optimisation.md`,
        {
          text: "Monitoring",
          link: `${locale}/run_publish/monitor.md`,
        },
        `${locale}/run_publish/cli.md`,
        {
          text: "Querying using GraphQL",
          link: `${locale}/run_publish/query.md`,
        },
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
          text: "Node Operators",
          link: `${locale}/subquery_network/node_operators/introduction.md`,
          collapsible: true,
          children: [
            {
              text: "Introduction to Node Operators",
              link: `${locale}/subquery_network/node_operators/introduction.md`,
            },
            {
              text: "Data Indexers",
              link: `${locale}/subquery_network/node_operators/indexers/introduction.md`,
              collapsible: true,
              children: [
                `${locale}/subquery_network/node_operators/indexers/introduction.md`,
                `${locale}/subquery_network/node_operators/indexers/rewards.md`,
                {
                  text: "Becoming an Indexer",
                  link: `${locale}/subquery_network/node_operators/indexers/become-an-indexer.md`,
                  collapsible: true,
                  children: [
                    `${locale}/subquery_network/node_operators/indexers/become-an-indexer.md`,
                    `${locale}/subquery_network/node_operators/indexers/install-indexer-locally.md`,
                    `${locale}/subquery_network/node_operators/indexers/install-indexer-linux.md`,
                    `${locale}/subquery_network/node_operators/indexers/separated-db.md`,
                    `${locale}/subquery_network/node_operators/indexers/indexer-security-guide.md`,
                    `${locale}/subquery_network/node_operators/indexers/index-project.md`,
                    `${locale}/subquery_network/node_operators/indexers/dictionary-restore.md`,
                    `${locale}/subquery_network/node_operators/indexers/troubleshooting-indexers.md`,
                  ],
                },
                `${locale}/subquery_network/node_operators/indexers/plans.md`,
                `${locale}/subquery_network/node_operators/indexers/faq.md`,
              ],
            },
            {
              text: "RPC Providers",
              link: `${locale}/subquery_network/node_operators/rpc_providers/introduction.md`,
            },
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
        {
          text: "Publish your Project",
          link: `${locale}/subquery_network/publish.md`,
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
        `${locale}/miscellaneous/ipfs.md`,
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
  ]);
