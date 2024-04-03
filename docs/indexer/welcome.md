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
      <Typography tag="h2">Build with SubQuery's Indexer SDK</Typography>
      <Typography tag="h5">The SubQuery Data indexer is a open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains.</Typography>
    </div>
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="https://subquery.network/images/indexerConcept.png" />
    </div>
  </div>
    <div class="quickStart layout mt80">
      <Typography tag="h4" fontSize="32">Get Started with our Quick Start Guides</Typography>
      <Typography class="mt24 mb24" tag="h5" type="secondary">We have one for every supported layer 1, designed to take you from zero to hero in less than 10 minutes with intuitive example projects.</Typography>
      <div class="quickStartList">
        <div class="itemGroup" v-for="networkFamily in quickStartJson" :key="networkFamily.name">
          <div class="itemGroupHeader">
            <img :src="networkFamily.logo" :alt="networkFamily.name" width="32" height="32">
            <Typography size="large" style="margin-left: 8px">{{ networkFamily.name }}</Typography>
          </div>
          <details display="block">
            <summary>See All Networks</summary>
            <br>
            <div class="itemGroupContent">
              <div v-for="network in networkFamily.quick_start_data" :key="network.name">
                <router-link v-for="quickStart in network.quick_start_data" :key="quickStart.name" :to="quickStart.link.replace('https://academy.subquery.network', '')">
                  <div>
                    <img v-if="quickStart.logo" :src="network.logo" width="24" height="24" style="pointer-events: none;">
                    <div v-if="!quickStart.logo" style="width: 24px; height: 24px; background: #fff;border-radius: 50%;"></div>
                    <Typography size="large" class="overflow3">{{ quickStart.name  }}</Typography>
                  </div>
                </router-link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
    <div class="journey layout mt80">
      <Typography tag="h3">Your Journey with SubQuery</Typography>
      <div class="journeyItem" v-for="journey in journeies" :key="journey.title">
        <div class="icon">
          <img :src="journey.iconSrc" />
        </div>
        <div class="ct">
          <Typography tag="h4" fontSize="26"><router-link :to="{path: journey.path}">{{ journey.title }}</router-link></Typography>
          <p>{{ journey.description }}</p>
        </div>
      </div>
    </div>
    <div class="layout mt80">
      <div class="graphGuide">
        <img src="/assets/img/graphGuideIcon.svg" />
        <Typography tag="h4" fontSize="32" style="margin-top: 32px">Coming from the Graph?</Typography>
        <Typography tag="p" size="large" maxWidth="630" center style="margin-top: 16px;margin-bottom:32px">Welcome to the fastest and most feature rich indexer in web3, migrating is easy and should only take a few minutes.</Typography>
        <router-link class="button buttonRed" :to="{path: '/build/graph-migration.html'}">Migrate Now!</router-link>
      </div>
    </div>
    <div class="layout mt80">
      <Typography tag="h4" fontSize="32">Advanced Features from the Best Multi-chain Indexer</Typography>
      <Typography type="secondary" tag="p" size="large" style="margin-top: 24px; margin-bottom: 40px;">We built the best, fully-featured indexer, so you don’t have to!</Typography>
      <div class="grid3column gp24">
        <BaseCard  v-for="item in advancedFeatures" :key="item.title">
          <router-link class="item" :to="{path: item.link}">
            <Typography tag="p">{{ item.title }}</Typography>
            <Typography tag="p" size="medium" style="margin-top: 16px;">{{ item.desc }}</Typography>
          </router-link>
        </BaseCard>
      </div>
    </div>
    <Banner title="Want a More in Depth Learning Experience?" description="We have detailed, step by step learning course. Follow video tutorials alongside real world examples." buttonText="Start your Course" buttonLink="/academy/herocourse/welcome.html" backgroundUrl="/assets/img/wantMoreDepthBg.png"></Banner>
    <div class="faqs layout mt140">
      <Typography tag="h35">FAQs</Typography>
      <ul class="faqsContent">
        <li v-for="faq in faqs" :key="faq.title">
          <div class="title"><span><img :src="faq.iconSrc" /></span>
          <Typography tag="p">{{ faq.title }}</Typography></div>
          <div class="animation">
            <div class="flexCol gp24" style="padding: 24px">
              <Typography tag="p" v-for="cont in faq.content" :key="cont" v-html="cont"></Typography>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex layout mt80" style="justify-content: space-between;">
      <div class="flexCol gp24" style="max-width: 590px">
        <Typography tag="h35">The SubQuery Network</Typography>
        <Typography tag="p" size="large" type="secondary">Say goodbye to relying on centralised service providers, we’re building the most open, performant, reliable and scalable data service for dApp developers. </Typography>
        <Typography tag="p" size="large" type="secondary">After publishing your project to the SubQuery Network, anyone can index and host it — providing data to users around the world faster and reliably.</Typography>
        <div class="flex">
        <router-link class="button" :to="{path: '/subquery_network/welcome.html'}">Learn more about our Decentralised Network</router-link>
        </div>
      </div>
      <img style="margin-top: -50px" src="/assets/img/architects.png" width="516" height="392" />
    </div>
    <NeedHelp></NeedHelp>
    <Footer></Footer>
  </div>
<component is="script" src="/assets/js/welcome.js" />

<script setup>
import { ref, onMounted } from 'vue'
const quickStartJson = ref([])
const advancedFeatures = ref([
  {
    title: 'EVM, WASM, and more',
    desc: 'Supports most smart contract execution languages.',
    link: '/build/substrate-evm.html'
  },
  {
    title: 'Write once, run anywhere',
    desc: 'Large multichain support and your gateway to Polkadot.',
    link: '/build/multi-chain.html'

  },
  {
    title: 'Absolute performance',
    desc: 'Fast syncing and indexing optimisations.',
    link: '/build/optimisation.html'

  },
  {
    title: 'The power of GraphQL',
    desc: 'Filtering, subscriptions, aggregation - all the features that you need.',
    link: '/build/query.html'
  },
  {
    title: 'Faster reindexing',
    desc: 'Automated historical state tracking means you can reindex partial data faster.',
    link: '/build/historical.html'
  },
  {
    title: 'Lightweight and portable',
    desc: 'Doesn’t require an extremely costly archive, connect directly to any RPC.',
    link: '/build/optimisation.html'

  }
])

const journeies = ref([
  {
    "iconSrc": "/assets/img/journeyIcon1.svg",
    "path": "/build/introduction.html",
    "title": "1. Build",
    "description": "Initialise your project, define your entities using GraphQL, identify the trigger events, and write simple mapping functions that process your data - that’s it! Theres no need for pre-existing data archives, write simply in typescript and test locally with Docker."
  },
  {
    "iconSrc": "/assets/img/journeyIcon2.svg",
    "path": "/run_publish/run.html",
    "title": "2. Run and Query",
    "description": "Make advanced, flexible, but simple queries over GraphQL from any website or app. We even support advanced features like aggregate functions and subscriptions."
  },
  {
    "iconSrc": "/assets/img/journeyIcon3.svg",
    "path": "/run_publish/publish.html",
    "title": "3. Publish",
    "description": "Use our self-service platform to publish and run a SubQuery project on production with great ease. It only takes a few minutes!"
  },
  {
    "iconSrc": "/assets/img/journeyIcon6.svg",
    "path": "subquery_network/publish.html",
    "title": "4. Deploy to the SubQuery Network",
    "description": "Our decentralised service is a web3 infrastructure revolution. We’re building the most open, performant, reliable, and scalable data service for dApp developers which will index and serve data to the global community in an incentivised and verifiable way."
  },
  {
    "iconSrc": "/assets/img/journeyIcon5.svg",
    "path": "/build/optimisation.html",
    "title": "5. Optimise your Project",
    "description": "Performance is a crucial factor in each project. We’re here to give you guidance on how to optimise your SubQuery project to speed it up."
  }
])

const faqs = ref([
  {
    "title": "What networks do you support?",
    "iconSrc": "/assets/img/faqIcon.svg",
    "content": [
      "We support over 150 leading layer-1 chains, including Ethereum, Cosmos, Polkadot, Avalanche, Algorand, Near and Flare. The list of supported layer-1 chains keeps growing every week, and it's our goal to support them all. Wherever you plan to build your next dApp, we want to be there to help you index it. <a href='https://subquery.network/networks'>View the full list here</a>",
      "If you would like us to index your new layer-1 chain, we would be happy to consider it, send us a message at <a href='mailto:hello@subquery.network'>hello@subquery.network</a>."
    ]
  },
  {
    "title": "How much does it cost?",
    "iconSrc": "/assets/img/faqIcon.svg",
    "content": [
      "SubQuery is open-source, and free for all to use forever. You can write, run, and scale your SubQuery project in your own infrastructure with complete control, many of our biggest customers do just this. Since it's open source, you can even just run the parts of it that you want.",
      "We're big believers in open source technology and really appreciate it when we <router-link :to='{path: \"/miscellaneous/contributing.html\"}'>receive contributions</router-link>."
    ]
  },
  {
    "title": "Do you provide hosting, or do I have to run it myself?",
    "iconSrc": "/assets/img/faqIcon.svg",
    "content": [
      "We provide a <router-link :to='{path: \"/run_publish/run.html\"}'>long guide</router-link> on how you can run SubQuery in your infrastructure, which includes both the indexer, Postgres database, and query service.",
      "Don't want to worry about running your own SubQuery infrastructure? SubQuery provides a <a href='https://explorer.subquery.network/' target='_blank'>Managed Service</a> to the community. The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100s of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.",
      "We'll run your SubQuery projects for you in a high performance, scalable, and managed public service with a generous free tier! You can host your first two SubQuery projects for absolutely free!",
      "You can also upgrade to take advantage of production ready hosting for mission critical data with zero-downtime blue/green deployments, dedicated databases, multiple geo-redundant clusters, intelligent routing, and advanced monitoring and analytics."
    ]
  },
  {
    "title": "How is the data stored?",
    "iconSrc": "/assets/img/faqIcon.svg",
    "content": [
      "SubQuery stores indexed data in a high performance PostgreSQL database."
    ]
  },
  {
    "title": "Why should I use SubQuery?",
    "iconSrc": "/assets/img/faqIcon.svg",
    "content": [
      "SubQuery is the most efficient option for web3 builders to index data from multiple chains without the hassle of building your own indexing solution.",
      "In addition to a flexible SDK, SubQuery offers superior indexing speeds and will eventually be a decentralised solution (upon the launch of the SubQuery Network) where you can have a stake in the future of the project."
    ]
  },
  {
    "title": "How are you different from The Graph?",
    "iconSrc": "/assets/img/faqIcon.svg",
    "content": [
      "SubQuery is a flexible, cross-chain indexing service similar to The Graph. In fact, <router-link :to='{path: \"/build/graph-migration.html\"}'>migrating from the Graph takes only a few hours</router-link>. Like The Graph, there are endless possibilities for the variety of data sources that can be analysed and served using SubQuery.",
      "We build SubQuery with the following key competitive advantages in mind:",
      "<ul><li>Faster than others. We’re focusing on making SubQuery faster than other solutions with advanced indexing caches and precomputed indices saving developers time, our solution is fast to set-up, fast to manage and fast to index.</li><li>More Flexible and Feature rich. SubQuery is a scaffold for building custom APIs and we provide additional features like GraphQL subscriptions, multi-chain indexing, automated historical tracking and more.</li><li>Open. Customers have already extended our open source SDK to suit their own custom implementation.</li><li>Universal. A universal infrastructure stack bringing communities together, developers now have a tool to search, sort, filter and query any data for their app across multiple blockchains.</li></ul>",
      "Additionally, we are committed to running our Managed hosting service over the long term. We have made huge investments into it and have many customers relying on it. This provides a safe home and a reliable alternative to customers that are currently threatened by the imminent sunsetting of The Graph's hosted service."
    ]
  }
])

const fetchAllQuickStart = () => {
  fetch("https://templates.subquery.network/guides").then(async (data) => {
    const json = await data.json();
    const guides = json.results.sort((a,b) => b.quick_start_data.reduce((cur, add) => cur + add.quick_start_data.length, 0) - a.quick_start_data.reduce((cur, add) => cur + add.quick_start_data.length, 0));
    quickStartJson.value = guides.map(family => {
      family.quick_start_data.map(qsd => qsd.quick_start_data = qsd.quick_start_data.filter(qs => qs.internal));
      return family;
    });
  })
}

onMounted(() => {
  fetchAllQuickStart()
})
</script>
