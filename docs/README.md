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
    <div class="ct">
      <h2>SubQuery Revolutionises Web3 Infrastructure</h2>
      <p>SubQuery is a fast, flexible, and reliable open-source data decentralised infrastructure network, providing both RPC and indexed data to consumers around the world.<br>
      The SubQuery Data indexer is a open-source data indexer that provides you with custom APIs for your web3 project across all of our supported chains.</p>
    </div>
    <div class="bannerImage">
      <div class="bannerImageBg"></div>
      <img src="/assets/img/welcomeBanner.png" />
    </div>
  </div>
  <div class="advancedFeatures layout mt80">
    <h3>We have docs for our network and our data indexer</h3>
    <div class="cardList">
      <router-link class="item" :to="{path: '/indexer/welcome.html'}">
        <h5>SubQuery Indexing SDK Documentation</h5>
        <p>Fast, reliable, decentralised, and customised APIs for your web3 project.</p>
        <p>SubQuery APIs make your dApp lighting quick. By providing an indexed data layer, your dApps get richer data faster to allow you to build intuitive and immersive experiences for your users.</p>
        <p>Easy to build, test, deploy, and run, SubQuery’s Data Indexer makes dApp development a breeze.</p>
      </router-link>
      <router-link class="item" :to="{path: '/subquery_network/introduction/introduction.html'}">
        <h5>SubQuery Network Documentation</h5>
        <p>Say goodbye to relying on centralised service providers, we’re building the most open, performant, reliable and scalable data service for dApp developers. </p>
        <p>The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it — providing data to users around the world faster and reliably.</p>
      </router-link>
    </div>
  </div>
  <div class="help layout mt80 mb80">
    <h3>Need Help?</h3>
    <p>The fastest way to get support is by joining our discord and messaging us in #technical-support.</p>
    <a class="button" href="https://discord.com/invite/subquery" target="_blank"><img src="/assets/img/discord_icon.svg" />Join our Discord</a>
  </div>
  <div class="footer layout">SubQuery © 2024</div>
</div>
<component is="script" src="/assets/js/welcome.js" />
