- - -

footer: false lastUpdated: false contributors: false editLink: false

- - -

<link rel="stylesheet" href="/assets/style/homepage.css" as="style" />
<div class="welcomeContainer">
  <div class="banner">
    <div class="layout">
      <div class="ct">
        <h2>Learn How to Build with SubQuery</h2>
        <p>SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains. </p>
      </div>
      <img src="/assets/img/welcomeBanner.svg" />
    </div>
  </div>
  <div class="quickStart layout mt80">
    <h3>Get Started with our Quick Start Guides</h3>
    <p>We have one for every supported layer 1, designed to take you from zero to hero in less than 10 minutes with intuitive example projects.</p>
    <div class="quickStartList">
      <div class="col">
        <div class="itemGroup">
          <img src="/assets/img/logo_polkadot.svg" />
          <div>
            <router-link :to="{path: '/quickstart/quickstart_chains/polkadot.html'}"> 
              <img src="/assets/img/logo_polkadot_polkadot.svg" />
              <img src="/assets/img/logo_polkadot_polkadot_blue.svg" />
            </router-link>
            <router-link :to="{path: '/quickstart/quickstart_chains/polkadot-humanode.html'}"> 
              <img src="/assets/img/logo_polkadot_humanode.svg" />
              <img src="/assets/img/logo_polkadot_humanode_blue.svg" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="itemGroup">
          <img src="/assets/img/logo_cosmos.svg" />
          <div>
            <router-link :to="{path: '/quickstart/quickstart_chains/cosmos-cronos.html'}"> 
              <img src="/assets/img/logo_cosmos_cronos.svg" />
              <img src="/assets/img/logo_cosmos_cronos_blue.svg" />
            </router-link>
            <router-link :to="{path: '/quickstart/quickstart_chains/cosmos.html'}"> 
              <img src="/assets/img/logo_cosmos_juno.svg" />
              <img src="/assets/img/logo_cosmos_juno_blue.svg" />
            </router-link>
          </div>
        </div>
      </div>
      <router-link :to="{path: '/quickstart/quickstart_chains/algorand.html'}"> 
          <img src="/assets/img/logo_algorand.svg" />
          <img src="/assets/img/logo_algorand_blue.svg" />
        </router-link>
        <router-link :to="{path: '/quickstart/quickstart_chains/avalanche.html'}"> 
          <img src="/assets/img/logo_avalanche.svg" />
          <img src="/assets/img/logo_avalanche_blue.svg" />
        </router-link>
        <router-link :to="{path: '/quickstart/quickstart_chains/near.html'}"> 
          <img src="/assets/img/logo_near.svg" />
          <img src="/assets/img/logo_near_blue.svg" />
        </router-link>
        <router-link :to="{path: '/quickstart/quickstart_chains/terra.html'}"> 
          <img src="/assets/img/logo_terra.svg" />
          <img src="/assets/img/logo_terra_blue.svg" />
        </router-link>
    </div>
  </div>
  <div class="journey layout mt80">
    <h3>Your Journey with SubQuery</h3>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon1.svg" />
      </div>
      <div class="ct">
        <h4>1. Build</h4>
        <p>Initialise your project, define your entities using GraphQL, identify the trigger events, and write simple mapping functions that process your data &#8212; that’s it! <router-link :to="{path: '/build/introduction.html'}">Read more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon2.svg" />
      </div>
      <div class="ct">
        <h4>2. Run and Query via GraphQL</h4>
        <p>Make advanced, flexible, but simple queries over GraphQL from any website or app. We even support advanced features like aggregate functions and subscriptions. <router-link :to="{path: '/run_publish/run.html'}">Read more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon3.svg" />
      </div>
      <div class="ct">
        <h4>3. Publish to the Managed Service</h4>
        <p>Use our self-service platform to publish and run a SubQuery project on production with great ease. It only take a few minutes! <router-link :to="{path: '/run_publish/publish.html'}">Read more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon5.svg" />
      </div>
      <div class="ct">
        <h4>4. Optimise your Project</h4>
        <p>Performance is a crucial factor in each project. We’re here to give you guidance on how to optimise your SubQuery project to speed it up. <router-link :to="{path: '/build/optimisation.html'}">Read more</router-link></p>
      </div>
    </div>
  </div>
  <div class="graphGuide layout mt80">
    <img src="/assets/img/graphGuideIcon.svg" />
    <h3>Coming from the Graph?</h3>
    <p>Welcome to the fastest and most feature rich indexer in web3, migrating is easy and should only take a few minutes.</p>
    <router-link class="button buttonRed" :to="{path: '/build/graph-migration.html'}">Migrate Now!</router-link>
  </div>
  <div class="advancedFeatures layout mt80">
    <h3>Advanced Features from the Best Multi-chain Indexer</h3>
    <p>We built the best, fully-featured indexer, so you don’t have to!</p>
    <div class="cardList">
      <router-link class="item" :to="{path: '/build/substrate-evm.html'}">
        <h5>EVM, WASM, Ethermint</h5>
        <p>Supports most smart contract execution languages.</p>
      </router-link>
      <router-link class="item" :to="{path: '/build/multi-chain.html'}">
        <h5>Write once, run anywhere</h5>
        <p>Large multichain support and your gateway to Polkadot.</p>
      </router-link>
      <router-link class="item" :to="{path: '/build/optimisation.html'}">
        <h5>Absolute performance</h5>
        <p>Fast syncing and indexing optimisations.</p>
      </router-link>
      <router-link class="item" :to="{path: '/run_publish/graphql.html'}">
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
  <div class="textImageSection layout mt80">
    <div class="ct">
      <h3>Want a More in Depth Learning Experience?</h3>
      <p>We have detailed, step by step learning course. Follow video tutorials alongside real world examples.</p>
      <router-link class="button" :to="{path: '/academy/herocourse/welcome.html'}">Start your Course</router-link>
    </div>
    <img src="/assets/img/depth_learning.svg" />
  </div>
  <div class="faqs layout mt80">
    <h3>FAQs</h3>
    <ul class="faqsContent">
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>What networks do you support?</div>
        <div class="animation">
          <div class="ct">
            <p>We support a large number of leading layer-1 chains, including Polkadot, Cosmos, Ethereyum, Avalanche, Algorand, Near, and Flare. The list of supported layer-1 chains keeps growing every week, and it's our goal to support them all. Whever you plan to build your next dApp, we want to be there to help you index it.</p>
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
            <p>We provide a <router-link :to="{path: '/run_publish/run.html'}">long guide</router-link> on how you can run SubQuery in your infrastructure, which includes both the indexer, postgres database, and query service.</p>
            <p>Don't want to worry about running your own SubQuery infrastructure? SubQuery provides a <a href="https://explorer.subquery.network/" target="_blank">Managed Service</a> to the community. The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.</p>
            <p>We'll run your SubQuery projects for you in a high performance, scalable, and managed public service with a generous free tier! You can host your first two SubQuery projects for absolutely free!</p>
            <p>You can also upgrade to take advantage of production ready hosting for mission critical data with zero-downtime blue/green deployments, dedicated databases, multiple geo-redundant clusters, intelligent routing, and advanced monitoring and analytics.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How is the data stored?</div>
        <div class="animation">
          <div class="ct">
            <p>SubQuery stores indexed data in a high performance PostGresQL database.</p>
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
            <p>SubQuery is a flexible, cross-chain indexing service similar to the Graph. In fact, <router-link :to="{path: '/build/graph-migration.html'}">migrating from the Graph takes only a few hours</router-link>. Like the Graph, there are endless possibilities for the variety of data sources that can be analysed and served using SubQuery.</p>
            <p>We build SubQuery with the following key competitive advantages in mind:</p>
            <ul>
            <li>Faster than others. We’re focusing on making SubQuery faster than other solutions with advanced indexing caches and precomputed indices saving developers time, our solution is fast to set-up, fast to manage, and fast to index.</li>
            <li>More Flexible and Feature rich. SubQuery is a scaffold for building custom APIs and we provide additional features like GraphQL subscriptions, multi-chain indexing, automated historical tracking, and more.</li>
            <li>Open. Customers have already extended our open source SDK to suit their own custom implementation.</li>
            <li>Universal. A universal infrastructure stack bringing communities together, developers now have a tool to search, sort, filter and query any data for their app across multiple blockchains.</li>
            </ul>
            <p>Additionally, we are committed to running our Managed hosting service over the long term. We have made huge investments into it and have many customers relying on it. This provides a safe home and a reliable alternative to customers that are currently threatened by the imminent sunsetting of the Graphs hosted service.
            </p>
          </div>
        </div>
      </li>
    </ul>

  </div>
  <div class="textImageSection layout mt80">
    <div class="ct">
      <h3>The SubQuery Network</h3>
      <p>Say goodbye to relying on centralised service providers, we’re building the most open, performant, reliable, and scalable data service for dApp developers. </p>
      <p>The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it — providing data to users around the world faster and reliably.</p>
      <router-link class="button" :to="{path: '/subquery_network/introduction.html'}">Learn more about our Decentralised Network</router-link>
    </div>
    <img src="/assets/img/architects.png" />
  </div>
  <div class="help layout mt80 mb80">
    <h3>Need Help?</h3>
    <p>The fastest way to get support is by joining our discord and messaging us in #technical-support.</p>
    <a class="button" href="https://discord.com/invite/subquery" target="_blank"><img src="/assets/img/discord_icon.svg" />Join our Discord</a>
  </div>
  <div class="footer layout">SubQuery © 2023</div>
</div>
<component :is="'script'" src="/assets/js/welcome.js"></component>
