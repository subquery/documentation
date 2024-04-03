---
footer: false
lastUpdated: false
contributors: false
editLink: false
photoSwipe: false
---

<link rel="stylesheet" href="/assets/style/homepage.css" as="style" />
 <div class="welcomeContainer">
  <div class="bannerRow">
    <div class="ct">
      <h2>SubQuery Network</h2>
      <h5>
        SubQuery is a fast, flexible, and reliable open-source data indexer
        that provides you with custom APIs for your web3 project across all
        of our supported chains.
      </h5>
    </div>
    <div class="bannerImage">
      <div class="bannerImageBg bannerImageBgRed"></div>
      <img src="/assets/img/architects.png" />
    </div>
  </div>
  <Banner
    title="Participate today as a Delegator"
    description="Anyone can participate as a Delegator and participate in the Network to earn rewards based on the work that Node Operators do. Current APR for delegators is 23%"
    buttonText="Join now"
    titleTag="h4"
    buttonLink="/academy/herocourse/welcome.html"
    backgroundUrl="/assets/img/network/join-network.png"
    style="margin-top: 0"
  ></Banner>
  <h3 style="margin-top: 140px; margin-bottom: 64px">
    One network, all your web3 data needs
  </h3>
  <div class="layout mb140" style="display: flex; gap: 24px">
    <BaseCard v-for="item in oneNetworkAllWeb3" :key="item.title">
      <div class="flexColCenter" style="gap: 24px; text-align: center">
        <img :src="item.image" height="300" />
        <h4 style="font-size: 26px">{{ item.title }}</h4>
        <h5 style="font-family: var(--font-family)">{{ item.subtitle }}</h5>
        <p
          v-for="content in item.contents"
          :key="content"
          style="font-size: 16px"
        >
          {{ content }}
        </p>
        <button class="button">{{ item.buttonText }}</button>
      </div>
    </BaseCard>
  </div>
  <h3 style="margin-bottom: 24px">Anyone can participate</h3>
  <h5
    style="
      margin-bottom: 40px;
      font-family: var(--font-family);
      max-width: 664px;
      text-align: center;
      color: var(--gray-400);
    "
  >
    There’s a role for everyone in the network, from highly technical
    developers to those with some experience and blockchain beginners. Find
    out how you can participate and be rewarded.
  </h5>
  <div
    class="layout"
    style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 96px;
      text-align: center;
    "
  >
    <div
      class="flexColCenter"
      style="padding: 16px"
      v-for="anyone in anyoneContents"
      :key="anyone.name"
    >
      <img
        :src="anyone.image"
        :alt="anyone.name"
        width="160"
        height="160"
        style="margin-bottom: 24px"
      />
      <h4>{{ anyone.name }}</h4>
      <p style="max-width: 360px; font-size: 16px">
        {{ anyone.description }}
      </p>
      <router-link :to="{ path: anyone.moreLink }">
        <button class="button">Learn more</button>
      </router-link>
    </div>
  </div>
  <Banner
    title="The SubQuery Data Node"
    :description="[
      'The SubQuery data node is a revolution in how we think about RPCs.',
      'It is a heavily forked RPC node that is perfectly optimised for querying and running in a decentralised environment. Performance of web3 dApps is no longer limited by slow RPC endpoints.',
    ]"
    buttonText="Run one today"
    titleTag="h4"
    buttonLink="/academy/herocourse/welcome.html"
    backgroundUrl="https://subquery.network/images/subqlDataNode.png"
    style="background-size: 300px; background-position: right"
  ></Banner>
  <Banner
    title="The SQT Token"
    :description="[
      'The SubQuery Token (SQT) is a utility token that powers the SubQuery Network. It is central to the efficient operation of a decentralised network of node operators.',
      'You can read about the tokenomics and access SQT on a number of exchanges.',
    ]"
    buttonText="Learn about SQT"
    titleTag="h4"
    buttonLink="/academy/herocourse/welcome.html"
    backgroundUrl="/assets/img/network/sqt.png"
    style="
      justify-content: flex-end;
      background-size: 300px;
      background-position: left;
    "
  ></Banner>
  <div class="advancedFeatures layout mt80">
    <h4>Get Started with the Network Today</h4>
    <p>Our decentralised network is live and vibrant</p>
    <div class="grid3column" style="gap: 24px">
      <router-link
        v-for="item in advancedFeatures"
        :key="item.title"
        :to="{ path: item.link }"
        style="text-decoration: none"
      >
        <BaseCard>
          <h5 class="fontText">{{ item.title }}</h5>
          <p class="fontMedium" style="margin-top: 16px; margin-bottom: 0">
            {{ item.desc }}
          </p>
        </BaseCard>
      </router-link>
    </div>
  </div>
  <Banner
    title="SubQuery’s Indexer SDK"
    :description="[
      'SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains. ',
      'Build your own custom API for over 160 chains today by following our quick start guides, then host it your way',
    ]"
    buttonText="Learn more about our Indexer SDK"
    titleTag="h4"
    buttonLink="/academy/herocourse/welcome.html"
    backgroundUrl="https://subquery.network/images/indexerConcept.png"
    style="
      background-size: 389px;
      background-position: right;
    "
  ></Banner>
  <NeedHelp></NeedHelp>
  <Footer></Footer>
</div>
   
<component is="script" src="/assets/js/welcome.js" />

<script setup>
import {ref} from 'vue'
const oneNetworkAllWeb3 = ref([
  {
    image: "https://subquery.network/images/indexerConcept.png",
    title: 'Decentralised Data Indexers',
    subtitle: 'Fast, reliable, decentralised, and customised APIs for your web3 project',
    contents: [
      "SubQuery APIs make your dApp lighting quick. By providing a indexed data layer, your dApps get richer data faster to allow you to build intuitive and immersive experiences for your users.",
      "Easy to build, test, deploy, and run, SubQuery’s Data Indexer makes dApp development a breeze."
    ],
    buttonText: 'Learn more',
    buttonLink: ''
  },
  {
    image: "https://subquery.network/images/rpcConcept.png",
    title: 'Decentralised RPC Endpoints',
    subtitle: 'Faster, cheaper, and globally decentralised RPCs that supercharge your dApp',
    contents: [
      "The SubQuery Data Node is a heavily optimised RPC endpoint that unlocks new breakthroughs in performance and scalability to power the next generation of web3 projects.",
      "With similar RPC endpoints and helpful SDKs to manage network connections, supercharging your dApp takes only a second."
    ],
    buttonText: 'Learn more',
    buttonLink: ''
  }
])

const anyoneContents = ref([
  {
    name: "DApp Users",
    description:
      "DApp Users will ask the SubQuery Network for specific indexed data and RPC endpoints for their dApps or tools, and exchange an advertised amount of SQT for each request.",
    image: "https://subquery.network/robots/consumer/consumer.png",
    moreLink:
      "/subquery_network/consumers.html",
  },
  {
    name: "Delegators",
    description:
      "Delegators will participate in the Network by supporting their favourite Data Indexers and RPC Providers to earn rewards based on the work those indexers do.",
    image: "https://subquery.network/robots/delegator/delegator.png",

    moreLink:
      "/subquery_network/delegators.html",
  },
  {
    name: "Data Indexers",
    description:
      "Data Indexers will run and maintain high quality SubQuery projects in their own infrastructure and will be rewarded in SQT for the requests that they serve.",
    image: "https://subquery.network/robots/indexer/indexer.png",

    moreLink: "/subquery_network/indexers.html",
  },
  {
    name: "RPC Providers",
    description:
      "RPC Providers run the optimised SubQuery Data Node and are rewarded in SQT for providing reliable, scalable, and affordable RPC services to the network.",
    image: "https://subquery.network/robots/rpc/rpc.svg",

    moreLink:
      "/subquery_network/architects.html",
  },
])

const advancedFeatures = ref([
  {
    title: 'Delegate to the SubQuery Network',
    desc: 'Anyone can participate as a Delegator and participate in the Network to earn rewards based on the work that Node Operators do.',
    link: '/build/substrate-evm.html'
  },
  {
    title: 'The SQT Token',
    desc: 'The SubQuery Token (SQT) is a utility token that powers the SubQuery Network. Learn how to get SQT and the tokenomics of it.',
    link: '/build/multi-chain.html'

  },
  {
    title: 'Join as a Node Operators',
    desc: 'More technical users are able to join the network as a Node Operators and start indexing and syncing various projects.',
    link: '/build/optimisation.html'

  },
  {
    title: 'Publish your Project to the Network',
    desc: 'If you’ve built a SubQuery project, you can publish it to the network and benefit from decentralised infrastructure hosting today.',
    link: '/build/query.html'
  },
  {
    title: 'View Economic Model',
    desc: 'Take a deep dive into the economic models of the SubQuery Network, including how rewards are calculated and distributed.',
    link: '/build/historical.html'
  },
  {
    title: 'View Network Parameters',
    desc: 'See the latest network statistics and parameters in the network so you can easily calculate return and decide on where to stake your SQT.',
    link: '/build/optimisation.html'

  }
])

</script>
