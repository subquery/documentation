---
footer: false
sidebar: false
lastUpdated: false
contributors: false
editLink: false
photoSwipe: false
---

<link rel="stylesheet" href="/doc/assets/style/homepage.css" as="style" />
<div class="welcomeContainer">
  <div class="banner">
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="/assets/img/welcomeBanner.png" />
    </div>
    <div class="flexColCenter" style="position: relative;gap: 24px;">
      <Typography tag="h1" center maxWidth="787">
        Learn how to build with SubQuery
      </Typography>
      <Typography tag="h4" center maxWidth="687" family="body">
        SubQuery is a fast, flexible, and reliable open-source data
        decentralised infrastructure network, providing both RPC and indexed
        data to consumers around the world.
      </Typography>
      <Typography tag="h4" center maxWidth="687" family="body">
        The SubQuery Data Indexer is a open-source data indexer that provides
        you with custom APIs for your web3 project across all of our supported
        chains.
      </Typography>
      <Typography tag="h4" center maxWidth="687" family="body">
        SubQuery AI Apps framework makes building decentralised AI Applications 
        fast and easy.
      </Typography>
    </div>
  </div>
  <div class="layout flex mt80 gp24 flexColMobile">
    <BaseCard>
      <router-link
        class="flexCol gp24"
        :to="{ path: '/indexer/welcome.html' }"
      >
        <div class="flexCenter gp16">
          <img src="/assets/img/home/indexer-sdk.png" />
          <Typography tag="h4" family="body">Indexer SDK</Typography>
        </div>
        <Typography tag="h3">Build with SubQuery's Indexer SDK</Typography>
        <Typography tag="h5" type="secondary"
          >SubQuery is a fast, flexible, and reliable open-source data indexer
          that provides you with custom APIs for your web3 project across all
          of our supported chains.
        </Typography>
        <div>
          <Button class="mt40">Learn more</Button>
        </div>
      </router-link>
    </BaseCard>
    <BaseCard>
      <router-link
        class="flexCol gp24"
        :to="{ path: '/ai/welcome.html' }"
      >
        <div class="flexCenter gp16">
          <img src="/assets/img/home/indexer-sdk.png" />
          <Typography tag="h4" family="body">AI Apps Framework</Typography>
        </div>
        <Typography tag="h3">Agentic AI with SubQuery's AI Apps</Typography>
        <Typography tag="h5" type="secondary"
          >The AI App Framework allows you to build, deploy, and run agentic production AI apps on the SubQuery Network in a trusted and decentralised environment.</Typography>
        <div>
          <Button class="mt40">Learn more</Button>
        </div>
      </router-link>
    </BaseCard>
    <BaseCard>
      <router-link
        class="flexCol gp24"
        :to="{ path: '/subquery_network/welcome.html' }"
      >
        <div class="flexCenter gp16">
          <img src="/assets/img/home/subquery-network.png" />
          <Typography tag="h4" family="body">SubQuery Network</Typography>
        </div>
        <Typography tag="h3"
          >Decentralised Infra on the SubQuery Network</Typography
        >
        <Typography tag="h5" type="secondary">
          Our decentralised infrastructure network revolutionises the web3
          landscape, providing both RPC and indexed data to consumers around
          the world.</Typography
        >
        <div>
          <Button class="mt40">Learn more</Button>
        </div>
      </router-link>
    </BaseCard>

  </div>
  <div class="layout mt140">
    <Typography tag="h3"> Our Most Popular Guides </Typography>
    <div class="grid3column mt24 gp24 flexColMobile">
      <BaseCard
        v-for="guide in polularGuides"
        :key="guide.title"
        style="padding: 20px"
      >
        <component
          class="flexCol gp24"
          :is="guide.path.startsWith('https') ? 'a' : 'router-link'"
          :href="guide.path.startsWith('https') ? guide.path : ''"
          :target="guide.path.startsWith('https') ? '_blank' : ''"
          :to="{ path: guide.path }"
        >
          <Typography tag="p">{{ guide.title }}</Typography>
          <Typography size="medium">{{ guide.description }}</Typography>
        </component>
      </BaseCard>
    </div>
  </div>
  <div class="layout mt140">
    <Typography tag="h3"> Start building on different chains </Typography>
    <div class="grid6column gp24 mt24 flexWrap">
      <BaseCard
        v-for="startWith in startWithExp"
        :key="startWith.name"
        style="padding: 20px 60px"
      >
        <router-link
          class="flexColCenter gp16"
          :to="{ path: startWith.path }"
        >
          <img :src="startWith.imgSrc" width="48" height="48" />
          <Typography size="large" weight="600" center>{{
            startWith.name
          }}</Typography>
        </router-link>
      </BaseCard>
    </div>
  </div>
  <NeedHelp class="mt140"></NeedHelp>
  <Footer></Footer>
</div>

<script setup>
import { ref, computed,onMounted } from "vue";

const allNetworks = ref([])

const polularGuides = computed(() => {
  const counts = allNetworks.value.reduce((cur, add) => cur + add.networks.length, 0) || '165+'
  return [
  {
    "path": "/indexer/build/graph-migration.html",
    "title": "Migrating from the Graph",
    "description": "Discover how SubQuery provides a superior developer experience to The Graph, with a similar development workflow that makes migration quick and easy."
  },
  {
    "path": "/subquery_network/delegators/introduction.html",
    "title": "Delegate to the SubQuery Network",
    "description": "Anyone can participate as a Delegator and participate in the Network to earn rewards based on the work that Node Operators do."
  },
  {
    "path": "/indexer/quickstart/quickstart.html",
    "title": "Follow a indexer quick start guide",
    "description": "SubQuery maintains and publishes quick start guides for more than 50 different networks and projects, find one today and start building."
  },
  {
    "path": "https://subquery.network/networks",
    "title": `Browse ${counts} supported networks`,
    "description": `Our goal is to help developers with the best indexer regardless of what chain they build on, we support ${counts} networks - see the list.`,
    key: 'allNetworks'
  },
  {
    "path": "/subquery_network/token/token.html",
    "title": "The SQT Token",
    "description": "The SubQuery Token (SQT) is a utility token that powers the SubQuery Network. Learn how to get SQT and the tokenomics of it."
  },
  {
    "path": "/ai/welcome.html",
    "title": "Build and deploy AI Apps with SubQuery",
    "description": "Anyone can build intelligent dApps with the SubQuery AI App framework, providing a shortcut for developers to start incorporating decentralised AI into their applications."
  }
]})

const startWithExp = computed(() => {
  return [
    {
    "path": "/indexer/quickstart/quickstart_chains/algorand.html",
    "imgSrc": "https://static.subquery.network/network-logos/algorand.png",
    "name": "Algorand"
  },
  {
    "path": "/indexer/quickstart/quickstart_chains/cosmos-osmosis.html",
    "imgSrc": "https://static.subquery.network/network-logos/cosmoshub-4.png",
    "name": "Cosmos"
  },
  {
    "path": "/indexer/quickstart/quickstart_chains/ethereum-gravatar.html",
    "imgSrc": "https://static.subquery.network/network-logos/1.png",
    "name": "EVM"
  },
  {
    "path": "/indexer/quickstart/quickstart_chains/near.html",
    "imgSrc": "https://static.subquery.network/network-logos/near.png",
    "name": "NEAR"
  },
  {
    "path": "/indexer/quickstart/quickstart_chains/polkadot.html",
    "imgSrc": "https://static.subquery.network/network-logos/polkadot.png",
    "name": "Polkadot"
  },
  {
    "path": "/indexer/quickstart/quickstart_chains/starknet.html",
    "imgSrc": "https://static.subquery.network/network-logos/starknet.png",
    "name": "Starknet"
  },
  {
    "path": "/indexer/quickstart/quickstart_chains/stellar.html",
    "imgSrc": "https://static.subquery.network/network-logos/stellar.png",
    "name": "Stellar"
  },  
]})

const fetchAllNetworks = () => {
  fetch("https://templates.subquery.network/all").then(async (data) => {
    const json = await data.json();
    allNetworks.value = json.templates
  });
};

onMounted(() => {
  fetchAllNetworks();

  try {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    });
  } catch {
    // pass
  }
});
</script>
