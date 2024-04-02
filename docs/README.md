---
footer: false
sidebar: false
lastUpdated: false
contributors: false
editLink: false
photoSwipe: false
---

<link rel="stylesheet" href="/assets/style/homepage.css" as="style" />
<div class="welcomeContainer">
  <div class="banner">
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="/assets/img/welcomeBanner.png" />
    </div>
    <div class="ct">
      <h2 class="title">Learn how to build with SubQuery</h2>
      <h5 class="subtitle">SubQuery is a fast, flexible, and reliable open-source data decentralised infrastructure network, providing both RPC and indexed data to consumers around the world.
      </h5>
      <h5 class="subtitle">
      The SubQuery Data Indexer is a open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains.</h5>
    </div>
  </div>
  <div class="advancedFeatures mt80">
    <div class="cardList">
      <router-link class="item" :to="{path: '/indexer/welcome.html'}">
        <div class="itemHeader">
          <img src="/assets/img/home/indexer-sdk.png"/>
          Indexer SDK
        </div>
        <h3>Build with SubQuery's Indexer SDK</h3>
        <h6>SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains. </h6>
        <button class="button mt40">Learn more</button>
      </router-link>
      <router-link class="item" :to="{path: '/subquery_network/welcome.html'}">
         <div class="itemHeader">
          <img src="/assets/img/home/subquery-network.png"/>
          SubQuery Network
        </div>
        <h3>Decentralised Infra on the SubQuery Network</h3>
        <h6>
        Our decentralised infrastructure network revolutionises the web3 landscape, providing both RPC and indexed data to consumers around the world.</h6>
        <button class="button mt40">Learn more</button>
      </router-link>
    </div>
  </div>
  <div class="layout mt140">
    <h3>
      Our Most Popular Guides
    </h3>
    <div class="advancedFeatures">
      <div class="cardList grid3column">
        <router-link class="item pd20Important" :to="{path: '/indexer/build/graph-migration.html'}">
          <p>Migrating from the Graph</p>
          <span>Discover how SubQuery provides a superior developer experience to The Graph, with a similar development workflow that makes migration quick and easy.</span>
        </router-link>
        <router-link class="item pd20Important" :to="{path: '/subquery_network/delegators/introduction.html'}">
          <p>Delegate to the SubQuery Network</p>
          <span>Anyone can participate as a Delegator and participate in the Network to earn rewards based on the work that Node Operators do.</span>
        </router-link>
        <router-link class="item pd20Important" :to="{path: '/indexer/quickstart/quickstart.html'}">
          <p>Follow a indexer quick start guide</p>
          <span>SubQuery maintains and publishes quick start guides for more than 50 different networks and projects, find one today and start building.</span>
        </router-link>
        <router-link class="item pd20Important" :to="{path: 'https://subquery.network/networks'}">
          <p>Browse 169 supported networks</p>
          <span>Our goal is to help developers with the best indexer regardless of what chain they build on, we support 161 networks - see the list.</span>
        </router-link>
        <router-link class="item pd20Important" :to="{path: '/subquery_network/token/token.html'}">
          <p>The SQT Token</p>
          <span>The SubQuery Token (SQT) is a utility token that powers the SubQuery Network. Learn how to get SQT and the tokenomics of it.</span>
        </router-link>
        <router-link class="item pd20Important" :to="{path: '/indexer/run_publish/publish.html'}">
          <p>How to host and run your project</p>
          <span>SubQuery is open-source and gives a number of different options, including self-hosting, our managed service, and our decentralised network.</span>
        </router-link>
      </div>
    </div>
  </div>
  <div class="layout mt140">
    <h3>
      Start build for different chains
    </h3>
    <div class="advancedFeatures">
      <div class="cardList grid6column">
        <router-link class="item flexColCenter gp16 pd20Important" :to="{path: '/indexer/quickstart/quickstart_chains/ethereum-gravatar.html'}">
          <img src="https://static.subquery.network/network-logos/1.png"/>
          <p class="large"><b>EVM</b></p>
        </router-link>
        <router-link class="item flexColCenter gp16 pd20Important" :to="{path: '/indexer/quickstart/quickstart_chains/cosmos-osmosis.html'}">
          <img src="https://static.subquery.network/network-logos/cosmoshub-4.png"/>
          <p class="large"><b>Cosmos</b></p>
        </router-link>
        <router-link class="item flexColCenter gp16 pd20Important" :to="{path: '/indexer/quickstart/quickstart_chains/polkadot.html'}">
          <img src="https://static.subquery.network/network-logos/polkadot.png"/>
          <p class="large"><b>Polkadot</b></p>
        </router-link>
        <router-link class="item flexColCenter gp16 pd20Important" :to="{path: '/indexer/quickstart/quickstart_chains/near.html'}">
          <img src="https://static.subquery.network/network-logos/near.png"/>
          <p class="large"><b>NEAR</b></p>
        </router-link>
        <router-link class="item flexColCenter gp16 pd20Important" :to="{path: '/indexer/quickstart/quickstart_chains/algorand.html'}">
          <img src="https://static.subquery.network/network-logos/algorand.png"/>
          <p class="large"><b>Algorand</b></p>
        </router-link>
        <router-link class="item flexColCenter gp16 pd20Important" :to="{path: '/indexer/quickstart/quickstart_chains/stellar.html'}">
          <img src="https://static.subquery.network/network-logos/stellar.png"/>
          <p class="large"><b>Stellar</b></p>
        </router-link>
      </div>
    </div>
  </div>
  <div class="help layout mt140 mb140">
    <h3>Need Help?</h3>
    <p>The fastest way to get support is by joining our discord and messaging us in #technical-support.</p>
    <a class="button" href="https://discord.com/invite/subquery" target="_blank"><img src="/assets/img/discord_icon.svg" />Join our Discord</a>
  </div>
  <div class="footer layout">SubQuery © 2024</div>
</div>
<component is="script" src="/assets/js/welcome.js" />
