- - -
footer: false lastUpdated: false contributors: false editLink: false photoSwipe: false
- - -

<link rel="stylesheet" href="/assets/style/homepage.css" as="style" />
<div class="welcomeContainer">
  <div class="banner">
    <div class="ct">
      <h2>Learn How to Build with SubQuery</h2>
      <p>SubQuery is a fast, flexible, and reliable open-source data decentralised infrastructure network. The SubQuery Data indexer is a open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains.</p>
    </div>
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="/assets/img/welcomeBanner.png" />
    </div>
  </div>
    <!--
    <div class="quickStart layout mt80">
      <h3>What are indexers?</h3>
      <p>Indexers, in a broad context, play a fundamental role in organising and optimising data retrieval within various systems. These tools act as navigational aids, allowing efficient access to specific information by creating structured indexes.</p>
      <p>In the scope of blockchain and dApps, indexers go beyond traditional databases, facilitating streamlined access to on-chain data. This includes transaction histories, smart contract states, event logs and etc. In the dynamic and decentralised world of blockchain, indexers contribute to the efficiency of data queries, supporting real-time updates and ensuring the seamless functionality of diverse applications and platforms.</p>
      <div align="center" position="static">
        <iframe position="static" width="10px" height="10" src="https://www.youtube-nocookie.com/embed/eOYaDDIL3Yg?si=bwajZNq8dxW5eWna" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>  
      </div> 
    </div>
    -->
    <div class="quickStart layout mt80">
      <h3>Get Started with our Quick Start Guides</h3>
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
          <h4><router-link :to="{path: '/build/introduction.html'}">1. Build</router-link></h4>
          <p>Initialise your project, define your entities using GraphQL, identify the trigger events, and write simple mapping functions that process your data - that’s it! Theres no need for pre-existing data archives, write simply in typescript and test locally with Docker. </p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon2.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/run_publish/run.html'}">2. Run and Query</router-link></h4>
          <p>Make advanced, flexible, but simple queries over GraphQL from any website or app. We even support advanced features like aggregate functions and subscriptions. </p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon3.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/run_publish/publish.html'}">3. Publish</router-link></h4>
          <p>Use our self-service platform to publish and run a SubQuery project on production with great ease. It only takes a few minutes!</p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon5.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: 'subquery_network/publish.html'}">4. Deploy to the SubQuery Network</router-link></h4>
          <p>Our decentralised service is a web3 infrastructure revolution. We’re building the most open, performant, reliable, and scalable data service for dApp developers which will index and serve data to the global community in an incentivised and verifiable way.</p>
        </div>
      </div>
      <div class="journeyItem">
        <div class="icon">
          <img src="/assets/img/journeyIcon6.svg" />
        </div>
        <div class="ct">
          <h4><router-link :to="{path: '/build/optimisation.html'}">5. Optimise your Project</router-link></h4>
          <p>Performance is a crucial factor in each project. We’re here to give you guidance on how to optimise your SubQuery project to speed it up.</p>
        </div>
      </div>
    </div>
    <div class="layout mt80">
      <div class="graphGuide">
        <img src="/assets/img/graphGuideIcon.svg" />
        <h3>Coming from the Graph?</h3>
        <p>Welcome to the fastest and most feature rich indexer in web3, migrating is easy and should only take a few minutes.</p>
        <router-link class="button buttonRed" :to="{path: '/build/graph-migration.html'}">Migrate Now!</router-link>
      </div>
    </div>
    <div class="advancedFeatures layout mt80">
      <h3>Advanced Features from the Best Multi-chain Indexer</h3>
      <p>We built the best, fully-featured indexer, so you don’t have to!</p>
      <div class="cardList">
        <router-link class="item" :to="{path: '/build/substrate-evm.html'}">
          <h5>EVM, WASM, and more</h5>
          <p>Supports most smart contract execution languages.</p>
        </router-link>
        <router-link class="item" :to="{path: '/build/multi-chain.html'}">
          <h5>Write once, run anywhere</h5>
          <p>Index multiple networks into one database.</p>
        </router-link>
        <router-link class="item" :to="{path: '/build/optimisation.html'}">
          <h5>Absolute performance</h5>
          <p>Fast syncing and indexing optimisations.</p>
        </router-link>
        <router-link class="item" :to="{path: '/run_publish/query.html'}">
          <h5>The power of GraphQL</h5>
          <p>Filtering, subscriptions, aggregation &#8212; all the features that you need.</p>
        </router-link>
        <router-link class="item" :to="{path: '/run_publish/historical.html'}">
          <h5>Faster reindexing</h5>
          <p>Automated historical state tracking means you can reindex partial data faster.</p>
        </router-link>
        <router-link class="item" :to="{path: '/build/optimisation.html'}">
          <h5>Lightweight and portable</h5>
          <p>Doesn’t require an extremely costly archive, connect directly to any RPC.</p>
        </router-link>
      </div>
    </div>
    <div class="textImageSection layout mt80 wantMoreDepth">
      <div class="ct">
        <h3>Want a More in Depth Learning Experience?</h3>
        <p>We have detailed, step by step learning course. Follow video tutorials alongside real world examples.</p>
        <router-link class="button" :to="{path: '/academy/herocourse/welcome.html'}">Start your Course</router-link>
      </div>
    </div>
    <div class="faqs layout mt80">
      <h3>FAQs</h3>
      <ul class="faqsContent">
        <li>
          <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>What networks do you support?</div>
          <div class="animation">
            <div class="ct">
              <p>We support over 150 leading layer-1 chains, including Ethereum, Cosmos, Polkadot, Avalanche, Algorand, Near and Flare. The list of supported layer-1 chains keeps growing every week, and it's our goal to support them all. Wherever you plan to build your next dApp, we want to be there to help you index it. <a href="https://subquery.network/networks">View the full list here</a></p>
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
              <p>Не хотите беспокоиться о создании собственной инфраструктуры SubQuery? SubQuery provides a <a href="https://explorer.subquery.network/" target="_blank">Managed Service</a> to the community. The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100s of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.</p>
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
        <router-link class="button" :to="{path: '/subquery_network/introduction.html'}">Learn more about our Decentralised Network</router-link>
      </div>
      <img src="/assets/img/architects.png" width="516" height="392" />
    </div>
    <div class="help layout mt80 mb80">
      <h3>Need Help?</h3>
      <p>The fastest way to get support is by joining our discord and messaging us in #technical-support.</p>
      <a class="button" href="https://discord.com/invite/subquery" target="_blank"><img src="/assets/img/discord_icon.svg" />Join our Discord</a>
    </div>
    <div class="footer layout">SubQuery © 2023</div>
  </div>
<component is="script" src="/assets/js/welcome.js" />

<script setup>
import { ref, onMounted } from 'vue'
const quickStartJson = ref([])

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
