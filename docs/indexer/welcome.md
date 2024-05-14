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
    <div class="flexColCenter gp24" style="max-width: 614px; z-index: 1;">
      <Typography tag="h2">Build with SubQuery's Indexer SDK</Typography>
      <Typography tag="h5">The SubQuery Data indexer is a open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains.</Typography>
    </div>
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="https://subquery.network/images/indexerConcept.png" />
    </div>
  </div>
  <QuickStart></QuickStart>
  <div class="flexCol layout mt80">
    <Typography tag="h3">Your Journey with SubQuery</Typography>
    <div class="flex gp24" v-for="journey, index in journeies" :key="journey.title" :style="{
        padding: '24px 0',
        borderBottom: index !== journeies.length - 1 ? '1px solid var(--dark-mode-border)' : ''
      }" >
      <img :src="journey.iconSrc" width="56" height="56" />
      <div class="flexCol">
      <router-link :to="{path: journey.path}">
        <Typography tag="a" family="heading" fontSize="26">{{ journey.title }}</Typography>
        </router-link>
        <Typography tag="p" type="secondary" style="margin-top: 16px;">{{ journey.description }}</Typography>
      </div>
    </div>
  </div>
    <div class="layout mt80">
      <div class="graphGuide">
        <img src="/assets/img/graphGuideIcon.svg" />
        <Typography tag="h4" fontSize="32" style="margin-top: 32px">Coming from the Graph?</Typography>
        <Typography tag="p" size="large" maxWidth="630" center style="margin-top: 16px;margin-bottom:32px">Welcome to the fastest and most feature rich indexer in web3, migrating is easy and should only take a few minutes.</Typography>
        <router-link :to="{path: '/indexer/build/graph-migration.html'}">
          <Button type="danger">
            Migrate Now!
          </Button>
        </router-link>
      </div>
    </div>
    <div class="layout mt80">
      <Typography tag="h4" fontSize="32">Advanced Features from the Best Multi-chain Indexer</Typography>
      <Typography type="secondary" tag="p" size="large" style="margin-top: 24px; margin-bottom: 40px;">We built the best, fully-featured indexer, so you don’t have to!</Typography>
      <div class="grid3column gp24 flexColMobile">
        <BaseCard  v-for="item in advancedFeatures" :key="item.title">
          <router-link class="item" :to="{path: item.link}">
            <Typography tag="p">{{ item.title }}</Typography>
            <Typography tag="p" size="medium" style="margin-top: 16px;">{{ item.desc }}</Typography>
          </router-link>
        </BaseCard>
      </div>
    </div>
    <Banner title="Want a More in Depth Learning Experience?" description="We have detailed, step by step learning course. Follow video tutorials alongside real world examples." buttonText="Start your Course" buttonLink="/indexer/academy/herocourse/welcome.html" backgroundUrl="/assets/img/wantMoreDepthBg.png"></Banner>
    <Faqs></Faqs>
    <div class="flex layout mt80 flexColMobile" style="justify-content: space-between;">
      <div class="flexCol gp24" style="max-width: 590px">
        <Typography tag="h35">The SubQuery Network</Typography>
        <Typography tag="p" size="large" type="secondary">Say goodbye to relying on centralised service providers, we’re building the most open, performant, reliable and scalable data service for dApp developers. </Typography>
        <Typography tag="p" size="large" type="secondary">After publishing your project to the SubQuery Network, anyone can index and host it — providing data to users around the world faster and reliably.</Typography>
        <div class="flex">
        <router-link :style="{
            width: isMobile ? '100%' : 'auto'
          }" :to="{path: '/subquery_network/welcome.html'}">
          <Button :style="{
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center'
          }">
            {{ isMobile ? "Learn more" : "Learn more about our Decentralised Network" }}
          </Button>
        </router-link>
        </div>
      </div>
      <img :style="{
        marginTop: isMobile ? '' : '-50px'}" src="/assets/img/architects.png" :width="isMobile ? '100%' : 516" :height="isMobile ? 'auto': 392" />
    </div>
    <NeedHelp></NeedHelp>
    <Footer></Footer>
  </div>

<script setup>
import { ref, onMounted } from 'vue'

const isMobile = ref(false)

const checkIsMobile = () => {
  if (window.screen && window.screen.width < 768) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
 }

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

const advancedFeatures = ref([
  {
    title: 'EVM, WASM, and more',
    desc: 'Supports most smart contract execution languages.',
    link: '/indexer/build/substrate-evm.html'
  },
  {
    title: 'Write once, run anywhere',
    desc: 'Large multichain support and your gateway to Polkadot.',
    link: '/indexer/build/multi-chain.html'

  },
  {
    title: 'Absolute performance',
    desc: 'Fast syncing and indexing optimisations.',
    link: '/indexer/build/optimisation.html'

  },
  {
    title: 'The power of GraphQL',
    desc: 'Filtering, subscriptions, aggregation - all the features that you need.',
    link: '/indexer/build/query.html'
  },
  {
    title: 'Faster reindexing',
    desc: 'Automated historical state tracking means you can reindex partial data faster.',
    link: '/indexer/build/historical.html'
  },
  {
    title: 'Lightweight and portable',
    desc: 'Doesn’t require an extremely costly archive, connect directly to any RPC.',
    link: '/indexer/build/optimisation.html'

  }
])

const journeies = ref([
  {
    "iconSrc": "/assets/img/journeyIcon1.svg",
    "path": "/indexer/build/introduction.html",
    "title": "1. Build",
    "description": "Initialise your project, define your entities using GraphQL, identify the trigger events, and write simple mapping functions that process your data - that’s it! Theres no need for pre-existing data archives, write simply in Typescript and test locally with Docker."
  },
  {
    "iconSrc": "/assets/img/journeyIcon2.svg",
    "path": "/indexer/run_publish/run.html",
    "title": "2. Run and Query",
    "description": "Make advanced, flexible, but simple queries over GraphQL from any website or app. We even support advanced features like aggregate functions and allow you to subscribe to new data."
  },
  {
    "iconSrc": "/assets/img/journeyIcon3.svg",
    "path": "/indexer/run_publish/publish.html",
    "title": "3. Publish",
    "description": "Running a SubQuery Project is easy, or if you don’t want to run and manage production infrastructure, use our self-service platform to publish and run a production SubQuery project in only a few minutes."
  },
  {
    "iconSrc": "/assets/img/journeyIcon6.svg",
    "path": "/subquery_network/publish.html",
    "title": "4. Deploy to the SubQuery Network",
    "description": "Our decentralised service is a web3 infrastructure revolution. We’re building the most open, performant, reliable, and scalable data service for dApp developers which will index and serve data to the global community in an incentivised and verifiable way."
  },
  {
    "iconSrc": "/assets/img/journeyIcon5.svg",
    "path": "/indexer/build/optimisation.html",
    "title": "5. Optimise your Project",
    "description": "Performance is a crucial factor in each project. We’re here to give you guidance on how to optimise your SubQuery project to speed it up."
  }
])
</script>
