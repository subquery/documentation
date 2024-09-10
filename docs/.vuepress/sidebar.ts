import { sidebar } from "vuepress-theme-hope";

export const getSidebar = (locale: string) =>
  sidebar({
    "/": [
      {
        text: "Welcome",
        link: `${locale === "" ? "/" : locale}`,
      },
    ],
    "/indexer/": [
      {
        text: "Welcome",
        link: `${locale}/indexer/welcome.md`,
      },
      {
        text: "Quick Start",
        link: `${locale}/indexer/quickstart/quickstart`,
        collapsible: true,
        children: [
          `${locale}/indexer/quickstart/quickstart.md`,
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
                    link: `${locale}/indexer/quickstart/quickstart_chains/arbitrum.md`,
                  },
                  {
                    text: "Astar zkEVM",
                    link: `${locale}/indexer/quickstart/quickstart_chains/astar-zkevm.md`,
                  },
                  {
                    text: "Avalanche",
                    collapsible: true,
                    children: [
                      {
                        text: "Avalanche (Pangolin Rewards)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/avalanche.md`,
                      },
                      {
                        text: "Avalanche (Crabada NFTs)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/avalanche-crabada.md`,
                      },
                    ],
                  },
                  {
                    text: "Base",
                    collapsible: true,
                    children: [
                      {
                        text: "Base (Mainnet)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/base.md`,
                      },
                      {
                        text: "Base (Sepolia Testnet)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/base-sepolia.md`,
                      },
                    ],
                  },
                  {
                    text: "BEVM",
                    link: `${locale}/indexer/quickstart/quickstart_chains/bevm.md`,
                  },
                  {
                    text: "BNB Smart Chain (BSC)",
                    collapsible: true,
                    children: [
                      {
                        link: `${locale}/indexer/quickstart/quickstart_chains/bsc.md`,
                        text: "Mobox Pools",
                      },
                      {
                        link: `${locale}/indexer/quickstart/quickstart_chains/bsc-pancakeswap-v3.md`,
                        text: "PancakeSwap",
                      },
                    ],
                  },
                  {
                    text: "Boba",
                    collapsible: true,
                    children: [
                      {
                        text: "Boba (ETH)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/boba-eth.md`,
                      },
                      {
                        text: "Boba (BNB)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/boba-bnb.md`,
                      },
                    ],
                  },
                  {
                    text: "Botanix",
                    link: `${locale}/indexer/quickstart/quickstart_chains/botanix.md`,
                  },
                  {
                    text: "Celo",
                    link: `${locale}/indexer/quickstart/quickstart_chains/celo.md`,
                  },
                  {
                    text: "Ethereum",
                    collapsible: true,
                    children: [
                      {
                        text: "Ethereum Gravatar (Simple)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethereum-gravatar.md`,
                      },
                      {
                        text: "Ethereum BAYC (Simple)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethereum-bayc.md`,
                      },
                      {
                        text: "Ethereum Chainlink (Medium)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethereum-chainlink.md`,
                      },
                      {
                        text: "Ethereum Opensea (Medium)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethereum-opensea.md`,
                      },
                      {
                        text: "Ethereum Uniswap (Complex)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethereum-uniswap.md`,
                      },
                      {
                        text: "Ethereum ENS (Complex)",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethereum-ens.md`,
                      },
                      {
                        text: "Ethscriptions",
                        link: `${locale}/indexer/quickstart/quickstart_chains/ethsriptions.md`,
                      },
                    ],
                  },
                  {
                    text: "Fantom",
                    link: `${locale}/indexer/quickstart/quickstart_chains/fantom.md`,
                  },
                  {
                    text: "Flare",
                    link: `${locale}/indexer/quickstart/quickstart_chains/flare.md`,
                  },
                  {
                    text: "Heco Chain",
                    link: `${locale}/indexer/quickstart/quickstart_chains/heco.md`,
                  },
                  {
                    text: "Gnosis",
                    link: `${locale}/indexer/quickstart/quickstart_chains/gnosis.md`,
                  },
                  {
                    text: "Harmony",
                    link: `${locale}/indexer/quickstart/quickstart_chains/harmony.md`,
                  },
                  {
                    text: "Immutable (Testnet)",
                    link: `${locale}/indexer/quickstart/quickstart_chains/immutable-testnet.md`,
                  },
                  {
                    text: "Iotex",
                    link: `${locale}/indexer/quickstart/quickstart_chains/iotex.md`,
                  },
                  {
                    text: "Klaytn",
                    link: `${locale}/indexer/quickstart/quickstart_chains/klaytn.md`,
                  },
                  {
                    text: "Mantle",
                    link: `${locale}/indexer/quickstart/quickstart_chains/mantle.md`,
                  },
                  {
                    text: "Meter",
                    link: `${locale}/indexer/quickstart/quickstart_chains/meter.md`,
                  },
                  {
                    text: "Metis",
                    link: `${locale}/indexer/quickstart/quickstart_chains/metis.md`,
                  },
                  {
                    text: "Optimism",
                    link: `${locale}/indexer/quickstart/quickstart_chains/optimism.md`,
                  },
                  {
                    text: "Polygon",
                    collapsible: true,
                    children: [
                      {
                        text: "Polygon Mainnet",
                        link: `${locale}/indexer/quickstart/quickstart_chains/polygon.md`,
                      },
                      {
                        text: "Polygon Lens",
                        link: `${locale}/indexer/quickstart/quickstart_chains/polygon-lens.md`,
                      },
                      {
                        text: "Polygon zkEVM",
                        link: `${locale}/indexer/quickstart/quickstart_chains/polygon-zkevm.md`,
                      },
                    ],
                  },
                  {
                    text: "Scroll",
                    collapsible: true,
                    children: [
                      {
                        text: "Scroll Mainnet",
                        link: `${locale}/indexer/quickstart/quickstart_chains/scroll.md`,
                      },
                      {
                        text: "Scroll Sepolia",
                        link: `${locale}/indexer/quickstart/quickstart_chains/scroll-sepolia.md`,
                      },
                    ],
                  },
                  {
                    text: "Skale",
                    link: `${locale}/indexer/quickstart/quickstart_chains/skale.md`,
                  },
                  {
                    text: "ZkSync Era",
                    link: `${locale}/indexer/quickstart/quickstart_chains/zksync-era.md`,
                  },
                  {
                    text: "X Layer",
                    link: `${locale}/indexer/quickstart/quickstart_chains/xlayer-testnet.md`,
                  },
                  {
                    text: "XDC Apothem",
                    link: `${locale}/indexer/quickstart/quickstart_chains/xdc-apothem.md`,
                  },
                  {
                    text: "ZetaChain",
                    link: `${locale}/indexer/quickstart/quickstart_chains/zetachain.md`,
                  },
                  {
                    text: "And more EVM networks",
                    link: `${locale}/indexer/quickstart/quickstart_chains/evm.md`,
                  },
                ],
              },
              {
                text: "Algorand",
                link: `${locale}/indexer/quickstart/quickstart_chains/algorand.md`,
              },
              {
                text: "Concordium",
                link: `${locale}/indexer/quickstart/quickstart_chains/concordium.md`,
              },
              {
                text: "Cosmos",
                collapsible: true,
                children: [
                  {
                    text: "Agoric",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-agoric.md`,
                  },
                  {
                    text: "Akash",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-akash.md`,
                  },
                  {
                    text: "Archway",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-archway.md`,
                  },
                  {
                    text: "Coreum",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-coreum.md`,
                  },
                  {
                    text: "Cronos (EVM)",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-cronos.md`,
                  },
                  {
                    text: "Dymension",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-dymension.md`,
                  },
                  {
                    text: "Juno",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-juno.md`,
                  },
                  {
                    text: "Neutron",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-neutron.md`,
                  },
                  {
                    text: "Osmosis",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-osmosis.md`,
                  },
                  {
                    text: "Sei",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-sei.md`,
                  },
                  {
                    text: "Thorchain",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-thorchain.md`,
                  },
                  {
                    text: "And more Cosmos zones",
                    link: `${locale}/indexer/quickstart/quickstart_chains/cosmos-other.md`,
                  },
                ],
              },
              {
                text: "Multi-Chain",
                collapsible: true,
                children: [
                  {
                    text: "Galxe NFTs",
                    link: `${locale}/indexer/quickstart/quickstart_multichain/galxe-nft.md`,
                  },
                  {
                    text: "Polygon Plasma Bridge",
                    link: `${locale}/indexer/quickstart/quickstart_multichain/polygon-plasma-bridge.md`,
                  },
                  {
                    text: "Snapshot",
                    link: `${locale}/indexer/quickstart/quickstart_multichain/snapshot.md`,
                  },
                  {
                    text: "Safe",
                    link: `${locale}/indexer/quickstart/quickstart_multichain/safe.md`,
                  },
                  {
                    text: "IBC transfers",
                    link: `${locale}/indexer/quickstart/quickstart_multichain/ibc-transfers.md`,
                  },
                  {
                    text: "Kava Multi-Chain (EVM & Cosmos)",
                    link: `${locale}/indexer/quickstart/quickstart_multichain/kava-multi-chain.md`,
                  },
                ],
              },
              {
                text: "NEAR",
                collapsible: true,
                children: [
                  {
                    text: "NEAR",
                    link: `${locale}/indexer/quickstart/quickstart_chains/near.md`,
                  },
                  {
                    text: "Aurora (EVM)",
                    link: `${locale}/indexer/quickstart/quickstart_chains/near-aurora.md`,
                  },
                  {
                    text: "Ref Finance",
                    link: `${locale}/indexer/quickstart/quickstart_chains/near-ref-finance.md`,
                  },
                ],
              },
              {
                text: "Polkadot/Substrate",
                collapsible: true,
                children: [
                  {
                    text: "Astar (WASM)",
                    link: `${locale}/indexer/quickstart/quickstart_chains/polkadot-astar.md`,
                  },
                  {
                    text: "Moonbeam (EVM)",
                    link: `${locale}/indexer/quickstart/quickstart_chains/polkadot-moonbeam.md`,
                  },
                  {
                    text: "Humanode",
                    link: `${locale}/indexer/quickstart/quickstart_chains/polkadot-humanode.md`,
                  },
                  {
                    text: "Kilt",
                    link: `${locale}/indexer/quickstart/quickstart_chains/polkadot-kilt.md`,
                  },
                  {
                    text: "Polkadot/Substrate",
                    link: `${locale}/indexer/quickstart/quickstart_chains/polkadot.md`,
                  },
                  {
                    text: "And more Polkadot chains",
                    link: `${locale}/indexer/quickstart/quickstart_chains/polkadot-other.md`,
                  },
                ],
              },
              {
                text: "Stellar & Soroban",
                collapsible: true,
                children: [
                  {
                    text: "Combined Example",
                    link: `${locale}/indexer/quickstart/quickstart_chains/stellar.md`,
                  },
                  {
                    text: "Soroban Contracts",
                    link: `${locale}/indexer/quickstart/quickstart_chains/stellar-soroban.md`,
                  },
                ],
              },
            ],
          },
          `${locale}/indexer/quickstart/whats-next.md`,
        ],
      },
      {
        text: "Build",
        link: `${locale}/indexer/build/introduction`,
        collapsible: true,
        children: [
          `${locale}/indexer/build/introduction.md`,
          `${locale}/indexer/build/install.md`,
          {
            text: "Manifest File",
            collapsible: true,
            children: [
              `${locale}/indexer/build/manifest/avalanche.md`,
              `${locale}/indexer/build/manifest/algorand.md`,
              `${locale}/indexer/build/manifest/arbitrum.md`,
              `${locale}/indexer/build/manifest/bsc.md`,
              `${locale}/indexer/build/manifest/concordium.md`,
              `${locale}/indexer/build/manifest/cosmos.md`,
              `${locale}/indexer/build/manifest/ethereum.md`,
              `${locale}/indexer/build/manifest/flare.md`,
              `${locale}/indexer/build/manifest/gnosis.md`,
              `${locale}/indexer/build/manifest/near.md`,
              `${locale}/indexer/build/manifest/optimism.md`,
              `${locale}/indexer/build/manifest/polkadot.md`,
              `${locale}/indexer/build/manifest/polygon.md`,
              `${locale}/indexer/build/manifest/stellar.md`,
            ],
          },
          `${locale}/indexer/build/graphql.md`,
          {
            text: "Mapping",
            collapsible: true,
            children: [
              `${locale}/indexer/build/mapping/avalanche.md`,
              `${locale}/indexer/build/mapping/algorand.md`,
              `${locale}/indexer/build/mapping/arbitrum.md`,
              `${locale}/indexer/build/mapping/bsc.md`,
              `${locale}/indexer/build/mapping/concordium.md`,
              `${locale}/indexer/build/mapping/cosmos.md`,
              `${locale}/indexer/build/mapping/ethereum.md`,
              `${locale}/indexer/build/mapping/flare.md`,
              `${locale}/indexer/build/mapping/gnosis.md`,
              `${locale}/indexer/build/mapping/near.md`,
              `${locale}/indexer/build/mapping/optimism.md`,
              `${locale}/indexer/build/mapping/polkadot.md`,
              `${locale}/indexer/build/mapping/polygon.md`,
              `${locale}/indexer/build/mapping/stellar.md`,
              `${locale}/indexer/build/mapping/cache.md`,
              `${locale}/indexer/build/mapping/store.md`,
            ],
          },
          `${locale}/indexer/build/testing.md`,
          `${locale}/indexer/build/graph-migration.md`,
          `${locale}/indexer/build/project-upgrades.md`,
          `${locale}/indexer/build/multi-chain.md`,
          `${locale}/indexer/build/dynamicdatasources.md`,
          `${locale}/indexer/build/substrate-evm.md`,
          `${locale}/indexer/build/substrate-wasm.md`,
          `${locale}/indexer/build/cosmos-evm.md`,
          `${locale}/indexer/build/optimisation.md`,
        ],
      },
      {
        text: "Run & Publish",
        link: `${locale}/indexer/run_publish/publish`,
        collapsible: true,
        children: [
          `${locale}/indexer/run_publish/run.md`,
          `${locale}/indexer/run_publish/publish.md`,
          `${locale}/indexer/run_publish/optimisation.md`,
          {
            text: "Monitoring",
            link: `${locale}/indexer/run_publish/monitor.md`,
          },
          `${locale}/indexer/run_publish/cli.md`,
          {
            text: "Query and Access Data",
            link: `${locale}/indexer/run_publish/query/query.md`,
            collapsible: true,
            children: [
              `${locale}/indexer/run_publish/query/query.md`,
              {
                text: "GraphQL",
                children: [
                  `${locale}/indexer/run_publish/query/graphql.md`,
                  `${locale}/indexer/run_publish/query/aggregate.md`,
                  `${locale}/indexer/run_publish/query/subscription.md`,
                ],
              },
              {
                text: "Other Tools",
                children: [
                  `${locale}/indexer/run_publish/query/other_tools/metabase.md`,
                  `${locale}/indexer/run_publish/query/other_tools/bigquery.md`,
                ],
              },
            ],
          },
          `${locale}/indexer/run_publish/historical.md`,
          `${locale}/indexer/run_publish/references.md`,
        ],
      },
      {
        text: "Courses",
        link: `${locale}/indexer/academy/academy.md`,
        collapsible: true,
        children: [
          {
            text: "Hero Course",
            link: `${locale}/indexer/academy/herocourse/welcome`,
            collapsible: true,
            children: [
              `${locale}/indexer/academy/herocourse/welcome.md`,
              `${locale}/indexer/academy/herocourse/module1.md`,
              `${locale}/indexer/academy/herocourse/module2.md`,
              `${locale}/indexer/academy/herocourse/module3.md`,
              `${locale}/indexer/academy/herocourse/module4.md`,
              `${locale}/indexer/academy/herocourse/module5.md`,
              `${locale}/indexer/academy/herocourse/module6.md`,
            ],
          },
          {
            text: "SubQuery Moonbeam Course",
            link: `${locale}/indexer/academy/moonbeam_course/welcome`,
            collapsible: true,
            children: [
              `${locale}/indexer/academy/moonbeam_course/welcome.md`,
              `${locale}/indexer/academy/moonbeam_course/lesson1.md`,
              `${locale}/indexer/academy/moonbeam_course/lesson2.md`,
              `${locale}/indexer/academy/moonbeam_course/lesson3.md`,
              `${locale}/indexer/academy/moonbeam_course/lesson4.md`,
              `${locale}/indexer/academy/moonbeam_course/lesson5.md`,
              `${locale}/indexer/academy/moonbeam_course/lesson6.md`,
            ],
          },
          {
            text: "Tutorials & Examples",
            link: `${locale}/indexer/academy/tutorials_examples/introduction`,
            collapsible: true,
            children: [
              `${locale}/indexer/academy/tutorials_examples/introduction.md`,
              `${locale}/indexer/academy/tutorials_examples/block-height.md`,
              `${locale}/indexer/academy/tutorials_examples/batch-size.md`,
              `${locale}/indexer/academy/tutorials_examples/run-indexer.md`,
              `${locale}/indexer/academy/tutorials_examples/dictionary.md`,
              `${locale}/indexer/academy/tutorials_examples/debug-projects.md`,
              `${locale}/indexer/academy/tutorials_examples/delete-projects.md`,
              `${locale}/indexer/academy/tutorials_examples/terminology.md`,
            ],
          },
          `${locale}/indexer/academy/subquery101/subquery101.md`,
        ],
      },
      {
        text: "Miscellaneous",
        link: `${locale}/indexer/miscellaneous/faq.md`,
        collapsible: true,
        children: [
          `${locale}/indexer/miscellaneous/faq.md`,
          `${locale}/indexer/miscellaneous/ipfs.md`,
          `${locale}/indexer/miscellaneous/avalanche-eth-migration.md`,
        ],
      },
    ],
    "/subquery_network/": [
      {
        text: "Welcome",
        link: `${locale}/subquery_network/welcome.md`,
      },
      {
        text: "Introduction",
        link: `${locale}/subquery_network/introduction/reward-distribution.md`,
        collapsible: true,
        children: [
          `${locale}/subquery_network/introduction/reward-distribution.md`,
          `${locale}/subquery_network/introduction/design-philosophy.md`,
          `${locale}/subquery_network/introduction/era.md`,
          `${locale}/subquery_network/introduction/payment-methods.md`,
          `${locale}/subquery_network/introduction/proof-of-index.md`,
        ],
      },
      {
        text: "The SubQuery Tokens",
        link: `${locale}/subquery_network/token/token.md`,
        collapsible: true,
        children: [
          `${locale}/subquery_network/token/token.md`,
          `${locale}/subquery_network/token/tokenomics.md`,
          `${locale}/subquery_network/token/bridge.md`,
          `${locale}/subquery_network/token/swap.md`,
          `${locale}/subquery_network/token/claim.md`,
        ],
      },
      {
        text: "Consumers",
        link: `${locale}/subquery_network/consumers/introduction.md`,
        collapsible: true,
        children: [
          `${locale}/subquery_network/consumers/introduction.md`,
          `${locale}/subquery_network/consumers/plan.md`,
          `${locale}/subquery_network/consumers/boosting.md`,
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
        text: "Node Operators / Indexers",
        link: `${locale}/subquery_network/node_operators/introduction.md`,
        collapsible: true,
        children: [
          {
            text: "Introduction to Node Operators",
            link: `${locale}/subquery_network/node_operators/introduction.md`,
          },
          `${locale}/subquery_network/node_operators/rewards.md`,
          {
            text: "Becoming a Node Operator",
            link: `${locale}/subquery_network/node_operators/setup/becoming-a-node-operator.md`,
            collapsible: true,
            children: [
              `${locale}/subquery_network/node_operators/setup/becoming-a-node-operator.md`,
              `${locale}/subquery_network/node_operators/setup/install-local-docker.md`,
              `${locale}/subquery_network/node_operators/setup/install-linux.md`,
              `${locale}/subquery_network/node_operators/setup/security-guide.md`,
              `${locale}/subquery_network/node_operators/setup/separated-db.md`,
              `${locale}/subquery_network/node_operators/setup/troubleshooting.md`,
              `${locale}/subquery_network/node_operators/setup/faq.md`,
            ],
          },
          {
            text: "Data Indexers",
            link: `${locale}/subquery_network/node_operators/indexers/introduction.md`,
            collapsible: true,
            children: [
              `${locale}/subquery_network/node_operators/indexers/introduction.md`,
              `${locale}/subquery_network/node_operators/indexers/index-project.md`,
              `${locale}/subquery_network/node_operators/indexers/connect-subgraph.md`,
              `${locale}/subquery_network/node_operators/indexers/migrate-deployment.md`,
            ],
          },
          {
            text: "RPC Providers",
            link: `${locale}/subquery_network/node_operators/rpc_providers/introduction.md`,
            collapsible: true,
            children: [
              `${locale}/subquery_network/node_operators/rpc_providers/introduction.md`,
              `${locale}/subquery_network/node_operators/rpc_providers/connect-node.md`,
            ],
          },
          `${locale}/subquery_network/node_operators/stake.md`,
          `${locale}/subquery_network/node_operators/plans.md`,
          `${locale}/subquery_network/node_operators/maximise-apy.md`,
        ],
      },
      {
        text: "Publish your Project",
        link: `${locale}/subquery_network/architects/publish.md`,
        collapsible: true,
        children: [
          `${locale}/subquery_network/architects/publish.md`,
          `${locale}/subquery_network/architects/publish-subgraph.md`,
          `${locale}/subquery_network/architects/introduction.md`,
        ],
      },
      {
        text: "SubQuery Data Node",
        link: `${locale}/subquery_network/data_node/introduction.md`,
        collapsible: true,
        children: [
          `${locale}/subquery_network/data_node/introduction.md`,
          `${locale}/subquery_network/data_node/run.md`,
          `${locale}/subquery_network/data_node/rpc.md`,
          `${locale}/subquery_network/data_node/sharding.md`,
        ],
      },
      `${locale}/subquery_network/parameters.md`,
      {
        text: "SubQuery Governance",
        link: `${locale}/subquery_network/governance/introduction.md`,
        collapsible: true,
        children: [
          `${locale}/subquery_network/governance/introduction.md`,
          `${locale}/subquery_network/governance/foundation.md`,
          `${locale}/subquery_network/governance/governance-process.md`,
          `${locale}/subquery_network/governance/treasury-management.md`,
        ],
      },
      `${locale}/subquery_network/faq.md`,
      `${locale}/subquery_network/fair-use.md`,
      `${locale}/subquery_network/community.md`,
      `${locale}/subquery_network/glossary.md`,
    ],
    "/miscellaneous/": [
      `${locale}/miscellaneous/contributing.md`,
      `${locale}/miscellaneous/social_media.md`,
      `${locale}/miscellaneous/branding.md`,
      `${locale}/miscellaneous/ambassadors.md`,
      `${locale}/miscellaneous/vulnerability-reporting.md`,
      {
        text: "Glossary",
        link: `${locale}/glossary/glossary.md`,
      },
    ],
  });
