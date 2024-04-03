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
      <h2>Build with SubQuery's Indexer SDK</h2>
      <h5>The SubQuery Data indexer is a open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains.</h5>
    </div>
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="https://subquery.network/images/indexerConcept.png" />
    </div>
  </div>
    <div class="quickStart layout mt80">
      <h4>Get Started with our Quick Start Guides</h4>
      <p>We have one for every supported layer 1, designed to take you from zero to hero in less than 10 minutes with intuitive example projects.</p>
      <div class="quickStartList">
        <div class="itemGroup" v-for="networkFamily in quickStartJson" :key="networkFamily.name">
          <div class="itemGroupHeader">
            <img :src="networkFamily.logo" :alt="networkFamily.name" width="32" height="32">
            <span style="font-size: 18px; margin-left: 8px">{{ networkFamily.name }}</span>
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
                    <span class="overflow3">{{ quickStart.name  }}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
    <div class="journey layout mt80">
      <h3>Your Journey with SubQuery</h3>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon1.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/indexer/build/introduction.html'}">1. Build</router-link></h4>
          <p>Initialise your project, define your entities using GraphQL, identify the trigger events, and write simple mapping functions that process your data - that’s it! Theres no need for pre-existing data archives, write simply in Typescript and test locally with Docker. </p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon2.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/indexer/run_publish/run.html'}">2. Run and Query</router-link></h4>
          <p>Make advanced, flexible, but simple queries over GraphQL from any website or app. We even support advanced features like aggregate functions and allow you to subscribe to new data. </p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon3.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/indexer/run_publish/publish.html'}">3. Publish</router-link></h4>
          <p>Running a SubQuery Project is easy, or if you don’t want to run and manage production infrastructure, use our self-service platform to publish and run a production SubQuery project in only a few minutes.</p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon6.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/subquery_network/architect/publish.html'}">4. Deploy to the SubQuery Network</router-link></h4>
          <p>Our decentralised service is a web3 infrastructure revolution. We’re building the most open, performant, reliable, and scalable data service for dApp developers which will index and serve data to the global community in an incentivised and verifiable way.</p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon5.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/indexer/build/optimisation.html'}">5. Optimise your Project</router-link></h4>
          <p>Performance is a crucial factor in each project. We’re here to give you guidance on how to optimise your SubQuery project to speed it up.</p>
        </div>
      </div>
    </div>
    <div class="layout mt80">
      <div class="graphGuide">
        <img src="/assets/img/graphGuideIcon.svg" />
        <h3>Coming from the Graph?</h3>
        <p>Welcome to the fastest and most feature rich indexer in web3, migrating is easy and should only take a few minutes.</p>
        <router-link class="button buttonRed" :to="{path: '/indexer/build/graph-migration.html'}">Migrate Now!</router-link>
      </div>
    </div>
    <div class="advancedFeatures layout mt80">
      <h4>Advanced Features from the Best Multi-chain Indexer</h4>
      <p>We built the best, fully-featured indexer, so you don’t have to!</p>
      <div class="cardList grid3column">
        <router-link v-for="item in advancedFeatures" :key="item.title" class="item" :to="{path: item.link}">
          <h5 class="fontText">{{ item.title }}</h5>
          <p class="fontMedium" style="margin-top: 16px; margin-bottom: 0;">{{ item.desc }}</p>
        </router-link>
      </div>
    </div>
    <Banner title="Want a More in Depth Learning Experience?" description="We have detailed, step by step learning course. Follow video tutorials alongside real world examples." buttonText="Start your Course" buttonLink="/academy/herocourse/welcome.html" backgroundUrl="/assets/img/wantMoreDepthBg.png"></Banner>
    <div class="faqs layout mt140">
      <h3>FAQs</h3>
      <ul class="faqsContent">
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>What networks do you support?</div>
          <div class="animation">
            <div class="ct">
              <p>We support over 169 leading layer-1 chains, including Ethereum, Cosmos, Polkadot, Avalanche, Algorand, Near and Flare. The list of supported layer-1 chains keeps growing every week, and it's our goal to support them all. Wherever you plan to build your next dApp, we want to be there to help you index it. <a href="https://subquery.network/networks">View the full list here</a></p>
              <p>If you would like us to index your new layer-1 chain, we would be happy to consider it, send us a message at <a href="mailto:hello@subquery.network">hello@subquery.network</a>.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How much does it cost?</div>
          <div class="animation">
            <div class="ct">
              <p>SubQuery is open-source, and free for all to use forever. You can write, run, and scale your SubQuery project in your own infrastructure with complete control, many of our biggest customers do just this. Since it's open source, you can even just run the parts of it that you want.</p>
              <p>We're big believers in open source technology and really appreciate it when we <router-link :to="{path: '/miscellaneous/contributing.html'}">receive contributions</router-link>.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>Do you provide hosting, or do I have to run it myself?</div>
          <div class="animation">
            <div class="ct">
              <p>We provide a <router-link :to="{path: '/run_publish/run.html'}">long guide</router-link> on how you can run SubQuery in your infrastructure, which includes both the indexer, Postgres database, and query service.</p>
              <p>Don't want to worry about running your own SubQuery infrastructure? SubQuery provides a <a href="https://explorer.subquery.network/" target="_blank">Managed Service</a> to the community. The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100s of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.</p>
              <p>We'll run your SubQuery projects for you in a high performance, scalable, and managed public service with a generous free tier! You can host your first two SubQuery projects for absolutely free!</p>
              <p>You can also upgrade to take advantage of production ready hosting for mission critical data with zero-downtime blue/green deployments, dedicated databases, multiple geo-redundant clusters, intelligent routing, and advanced monitoring and analytics.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How is the data stored?</div>
          <div class="animation">
            <div class="ct">
              <p>SubQuery stores indexed data in a high performance PostgreSQL database.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>Why should I use SubQuery?</div>
          <div class="animation">
            <div class="ct">
              <p>SubQuery is the most efficient option for web3 builders to index data from multiple chains without the hassle of building your own indexing solution.</p>
              <p>In addition to a flexible SDK, SubQuery offers superior indexing speeds and will eventually be a decentralised solution (upon the launch of the SubQuery Network) where you can have a stake in the future of the project.</p>
            </div>
          </div>
        </li>
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How are you different from The Graph?</div>
          <div class="animation">
            <div class="ct">
              <p>SubQuery is a flexible, cross-chain indexing service similar to The Graph. In fact, <router-link :to="{path: '/build/graph-migration.html'}">migrating from the Graph takes only a few hours</router-link>. Like The Graph, there are endless possibilities for the variety of data sources that can be analysed and served using SubQuery.</p>
              <p>We build SubQuery with the following key competitive advantages in mind:</p>
              <ul>
              <li>Faster than others. We’re focusing on making SubQuery faster than other solutions with advanced indexing caches and precomputed indices saving developers time, our solution is fast to set-up, fast to manage and fast to index.</li>
              <li>More Flexible and Feature rich. SubQuery is a scaffold for building custom APIs and we provide additional features like GraphQL subscriptions, multi-chain indexing, automated historical tracking and more.</li>
              <li>Open. Customers have already extended our open source SDK to suit their own custom implementation.</li>
              <li>Universal. A universal infrastructure stack bringing communities together, developers now have a tool to search, sort, filter and query any data for their app across multiple blockchains.</li>
              </ul>
              <p>Additionally, we are committed to running our Managed hosting service over the long term. We have made huge investments into it and have many customers relying on it. This provides a safe home and a reliable alternative to customers that are currently threatened by the imminent sunsetting of The Graph's hosted service.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="textImageSection layout mt80">
      <div class="ct">
        <h3>The SubQuery Network</h3>
        <p>Say goodbye to relying on centralised service providers, we’re building the most open, performant, reliable and scalable data service for dApp developers. </p>
        <p>The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it — providing data to users around the world faster and reliably.</p>
        <router-link class="button" :to="{path: '/subquery_network/welcome.html'}">Learn more about our Decentralised Network</router-link>
      </div>
      <img src="/assets/img/architects.png" width="516" height="392" />
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
