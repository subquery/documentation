<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="welcomeContainer">
  <div class="banner">
    <div class="layout">
      <div class="ct">
        <h2>Learn how to build with SubQuery</h2>
        <p>SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains. </p>
      </div>
      <img src="/assets/img/welcomeBanner.svg" />
    </div>
  </div>
  <div class="quickStart layout">
    <h3>Get started with our quick start guides</h3>
    <p>We have one for every supported layer 1, designed to take you from zero to hero in less than 10 minutes with intuitive example projects.</p>
    <div class="quickStartList">
      <div class="col">
        <router-link :to="{path: '/quickstart/quickstart_chains/algorand.html'}"> 
          <img src="/assets/img/logo_algorand.svg" />
          <img src="/assets/img/logo_algorand_blue.svg" />
        </router-link>
        <router-link :to="{path: '/quickstart/quickstart_chains/polkadot.html'}"> 
          <img src="/assets/img/logo_polkadot.svg" />
          <img src="/assets/img/logo_polkadot_blue.svg" />
        </router-link>
      </div>
      <div class="col">
        <router-link :to="{path: '/quickstart/quickstart_chains/avalanche.html'}"> 
          <img src="/assets/img/logo_avalanche.svg" />
          <img src="/assets/img/logo_avalanche_blue.svg" />
        </router-link>
        <router-link :to="{path: '/quickstart/quickstart_chains/terra.html'}"> 
          <img src="/assets/img/logo_terra.svg" />
          <img src="/assets/img/logo_terra_blue.svg" />
        </router-link>
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
    </div>
  </div>
  <div class="journey layout mt80">
    <h3>Your journey with SubQuery</h3>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon1.svg" />
      </div>
      <div class="ct">
        <h4>1. Build</h4>
        <p>Initialise your project, define your entities using GraphQL, identify the trigger events, and write simple mapping functions that process your data - that’s it! Theres no need for pre-existing data archives, write simply in typescript and test locally with Docker. <router-link :to="{path: '/build/introduction.html'}"> Find out more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon2.svg" />
      </div>
      <div class="ct">
        <h4>2. Run and Query via GraphQL</h4>
        <p>Make advanced, flexible, but simple queries over GraphQL from any front end website or app. We even support advanced features like aggregate functions and allow you to subscribe to new data. <router-link :to="{path: '/run_publish/run.html'}"> Find out more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon3.svg" />
      </div>
      <div class="ct">
        <h4>3. Publish to the managed service</h4>
        <p>You don’t want to run and manage production infrastructure, use our self-service platform to publish and run a production SubQuery project in only a few minutes - you can also explore what others in the community are building. <router-link :to="{path: '/run_publish/publish.html'}"> Find out more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon4.svg" />
      </div>
      <div class="ct">
        <h4>4. Deploy to the SubQuery Network (Coming soon)</h4>
        <p>Our decentralised service will be the future of web3 infrastructure. We’re building the most open, performant, reliable, and scalable data service for dApp developers which will index and serve data to the global community in an incentivised and verifiable way. <router-link :to="{path: '/subquery_network/introduction.html'}"> Find out more</router-link></p>
      </div>
    </div>
    <div class="journeyItem">
      <div class="icon">
        <img src="/assets/img/journeyIcon5.svg" />
      </div>
      <div class="ct">
        <h4>5. Optimise your project</h4>
        <p>Performance is a crucial factor in each project. We’re here to give you guidance on how to optimise your SubQuery project to speed it up. <router-link :to="{path: '/build/optimisation.html'}"> Find out more</router-link></p>
      </div>
    </div>
  </div>
  <div class="graphGuide layout mt140">
    <img src="/assets/img/graphGuideIcon.svg" />
    <h3>Coming from the Graph?</h3>
    <p>Welcome to the fastest and most feature rich indexer in web3. Migrating is easy and should only take a few minutes.</p>
    <router-link class="button buttonRed" :to="{path: '/build/graph-migration.html'}">Migrate Now!</router-link>
  </div>
  <div class="advancedFeatures layout mt140">
    <h3>Advanced Features from the best multi chain indexer</h3>
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
        <p>Filtering, subscriptions, aggregation - all the features that you need.</p>
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
  <div class="textImageSection layout mt140">
    <div class="ct">
      <h3>Want a more in depth learning experience?</h3>
      <p>We have detailed, step by step learning course. Follow video tutorials alongside real world examples.</p>
      <router-link class="button" :to="{path: '/academy/herocourse/welcome.htm'}">Start Course</router-link>
    </div>
    <img src="/assets/img/depth_learning.svg" />
  </div>
  <div class="faqs layout mgt140">
    <h3>FAQs</h3>
    <ul class="faqsContent">
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>What networks do you support?</div>
        <div class="animation">
          <div class="ct">
            <p>Aenean at ipsum mollis ex dapibus fringilla ac id nulla. Nullam augue velit, placerat at elementum ac, tincidunt at elit. Phasellus condimentum egestas urna non sodales.</p>
            <p>Aenean nec lorem metus. Donec lacinia efficitur urna non suscipit. Fusce pretium viverra leo eget elementum. Nam tincidunt viverra dolor, eget tempus lorem vehicula a. Curabitur sollicitudin rutrum libero, ut cursus diam ultricies sit amet. Pellentesque dictum arcu sit amet augue luctus.</p>
            <p>Ut scelerisque ligula facilisis. Nullam volutpat nisl nec consectetur aliquet. Sed posuere ipsum ipsum, et condimentum odio tincidunt eu.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How much does it cost?</div>
        <div class="animation">
          <div class="ct">
            <p>Aenean at ipsum mollis ex dapibus fringilla ac id nulla. Nullam augue velit, placerat at elementum ac, tincidunt at elit. Phasellus condimentum egestas urna non sodales.</p>
            <p>Aenean nec lorem metus. Donec lacinia efficitur urna non suscipit. Fusce pretium viverra leo eget elementum. Nam tincidunt viverra dolor, eget tempus lorem vehicula a. Curabitur sollicitudin rutrum libero, ut cursus diam ultricies sit amet. Pellentesque dictum arcu sit amet augue luctus.</p>
            <p>Ut scelerisque ligula facilisis. Nullam volutpat nisl nec consectetur aliquet. Sed posuere ipsum ipsum, et condimentum odio tincidunt eu.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>Do you provide hosting, or do I have to run it myself?</div>
        <div class="animation">
          <div class="ct">
            <p>Aenean at ipsum mollis ex dapibus fringilla ac id nulla. Nullam augue velit, placerat at elementum ac, tincidunt at elit. Phasellus condimentum egestas urna non sodales.</p>
            <p>Aenean nec lorem metus. Donec lacinia efficitur urna non suscipit. Fusce pretium viverra leo eget elementum. Nam tincidunt viverra dolor, eget tempus lorem vehicula a. Curabitur sollicitudin rutrum libero, ut cursus diam ultricies sit amet. Pellentesque dictum arcu sit amet augue luctus.</p>
            <p>Ut scelerisque ligula facilisis. Nullam volutpat nisl nec consectetur aliquet. Sed posuere ipsum ipsum, et condimentum odio tincidunt eu.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How is the data stored?</div>
        <div class="animation">
          <div class="ct">
            <p>Aenean at ipsum mollis ex dapibus fringilla ac id nulla. Nullam augue velit, placerat at elementum ac, tincidunt at elit. Phasellus condimentum egestas urna non sodales.</p>
            <p>Aenean nec lorem metus. Donec lacinia efficitur urna non suscipit. Fusce pretium viverra leo eget elementum. Nam tincidunt viverra dolor, eget tempus lorem vehicula a. Curabitur sollicitudin rutrum libero, ut cursus diam ultricies sit amet. Pellentesque dictum arcu sit amet augue luctus.</p>
            <p>Ut scelerisque ligula facilisis. Nullam volutpat nisl nec consectetur aliquet. Sed posuere ipsum ipsum, et condimentum odio tincidunt eu.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>Why should I use SubQuery?</div>
        <div class="animation">
          <div class="ct">
            <p>Aenean at ipsum mollis ex dapibus fringilla ac id nulla. Nullam augue velit, placerat at elementum ac, tincidunt at elit. Phasellus condimentum egestas urna non sodales.</p>
            <p>Aenean nec lorem metus. Donec lacinia efficitur urna non suscipit. Fusce pretium viverra leo eget elementum. Nam tincidunt viverra dolor, eget tempus lorem vehicula a. Curabitur sollicitudin rutrum libero, ut cursus diam ultricies sit amet. Pellentesque dictum arcu sit amet augue luctus.</p>
            <p>Ut scelerisque ligula facilisis. Nullam volutpat nisl nec consectetur aliquet. Sed posuere ipsum ipsum, et condimentum odio tincidunt eu.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="title"><span><img src="/assets/img/faqIcon.svg" /></span>How are you different from other The Graph?</div>
        <div class="animation">
          <div class="ct">
            <p>Aenean at ipsum mollis ex dapibus fringilla ac id nulla. Nullam augue velit, placerat at elementum ac, tincidunt at elit. Phasellus condimentum egestas urna non sodales.</p>
            <p>Aenean nec lorem metus. Donec lacinia efficitur urna non suscipit. Fusce pretium viverra leo eget elementum. Nam tincidunt viverra dolor, eget tempus lorem vehicula a. Curabitur sollicitudin rutrum libero, ut cursus diam ultricies sit amet. Pellentesque dictum arcu sit amet augue luctus.</p>
            <p>Ut scelerisque ligula facilisis. Nullam volutpat nisl nec consectetur aliquet. Sed posuere ipsum ipsum, et condimentum odio tincidunt eu.</p>
          </div>
        </div>
      </li>
    </ul>

  </div>
  <div class="textImageSection layout mt140">
    <div class="ct">
      <h3>The SubQuery Network</h3>
      <p>Say goodbye to relying on centralised service providers, we’re building the most open, performant, reliable, and scalable data service for dApp developers. </p>
      <p>The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it — providing data to users around the world faster and reliably.</p>
      <router-link class="button" :to="{path: '/subquery_network/introduction.htm'}">Join Decentralised Network</router-link>
    </div>
    <img src="/assets/img/architects.png" />
  </div>
  <div class="help layout mt140 mb140">
    <h3>Need help?</h3>
    <p>The fastest way to get support is by joining our discord and messaging us in #technical-support.</p>
    <a class="button" href="https://discord.com/invite/subquery" target="_blank"><img src="/assets/img/discord_icon.svg" />Join our Discord</a>
  </div>
  <div class="footer layout">SubQuery © 2022</div>
</div>
<component :is="'script'" src="/assets/js/welcome.js"></component>
