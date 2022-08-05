<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Build Faster dApps with<span>SubQuery Academy</span></h2>
        <p>Explore and implement your own efficient custom open-source API between your decentralised data and tools to query data faster and save you time.</p></br>
        <p><strong>SubQuery now supports Polkadot, Avalanche, Cosmos, and Algorand.</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Get a Kick-Start With Our <span>Quick Start Guide</span></h2>
      <p><strong>Build your first SubQuery project in less than 10 mins with simple guided steps.</strong>
      <p>Start querying data for your dApps on your most loved blockchain network using our starter projects. Explore and modify important files, and understand how SubQuery works.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart.html'}"> 
          <span>Start Building</span>
        </router-link>
      </span>
    </div>
  </section>
</div>
<div class="main">
  <div>
    <div>
    <h2 class="title" text-align:center>Want to Learn More About SubQuery Academy?</h2>
    </div>
    <ul class="list">
      <li>
        <router-link :to="{path: '/academy/tutorials_examples/introduction.html'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>Practice with Tutorials & Examples</span>
            <p>Learning by doing. Practice with SubQuery’s real-world blockchain projects & improve your skills.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Refer to Technical Reference Docs</span>
            <p>Dig into every term, usecases, and best-practices that help you build a dApp which your users love.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/subquery_network/introduction.html'}"> 
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>Be a Part of SubQuery Network</span>
            <p>Host & index projects in a completely decentralised way. Participate in the network and get rewarded with SQT.</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</div>
<section class="faqSection main">
  <div>
    <h2 class="title">常见问题</h2>
    <ul class="faqList">
      <li>
        <div class="title">什么是SubQuery？</div>
        <div class="content">
          <p>SubQuery is an open-source blockchain data indexer. It provides developers with faster and decentralised APIs. It allows you to build powerful multi-chain apps without wasting hours on indexing and quickly querying data.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">查看更多</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">从SubQuery开始的最佳方式是什么？</div>
        <div class="content">
          <p>开始使用 SubQuery 的最好方法是尝试我们的 <a href="/quickstart/quickstart.html">Quick Start tutorial</a>。 这是简单的5分钟步行练习。 下载启动模板，构建项目，使用 Docker 在您的localhost上运行一个节点，并运行一个简单的查询。</p>
        </div>
      </li>
      <li>
        <div class="title">我如何向SubQuer贡献或反馈？</div>
        <div class="content">
          <p>我们热爱社区的贡献和反馈。 To contribute the code, we suggest starting by creating an issue in our main repository so we can give you support.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">查看更多</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">在SubQuery项目中托管我的项目需要多少费用？</div>
        <div class="content">
          <p>在 SubQuery 项目中托管您的项目是绝对免费的，这是我们回归社区的方式。 要学习如何与我们一起主办您的项目，请查看 <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a> 教程。</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">了解您的进程</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Got more questions? Visit our <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> 页面     
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Integrate with Your Custom Substrate Chain</h5>
        <p>无论您在底层上构建一个新的平行链，还是一个全新的区块链——SubQuery 都可以帮助您索引并帮您链中的数据做数据纠错。 SubQuery helps you easily integrate with a custom Substrate-based chain.</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.html#custom-substrate-and-cosmos-chains'}">学习如何整合你自己的链</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>支持和贡献</h5>
        <p>Have a question or interested in knowing how you can contribute? 我们很乐意听到您的声音。 请通过以下链接通过电子邮件或社交媒体联系我们。 需要技术专门知识？ 加入我们的 Discord 社区并得到我们热情的社区成员的支持。 </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">加入我们的DISCORD 一起来讨论</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>联系我们</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>在社交上关注我们</div>
    <div class="connectWay">
      <a href="https://discord.com/invite/78zg8aBSMG" target="_blank" class="connectDiscord">discord</a>
      <a href="https://twitter.com/subquerynetwork" target="_blank" class="connectTwitter">twitter</a>
      <a href="https://medium.com/@subquery" target="_blank" class="connectMedium">medium</a>
      <a href="https://t.me/subquerynetwork" target="_blank" class="connectTelegram">telegram</a>
      <a href="https://github.com/OnFinality-io/subql" target="_blank" class="connectGithub">github</a>
      <a href="https://matrix.to/#/#subquery:matrix.org" target="_blank" class="connectMatrix">matrix</a>
      <a href="https://www.linkedin.com/company/subquery/" target="_blank" class="connectLinkedin">linkedin</a>
    </div>
  </div>
</section>
</div> </div>
<div class="footer">
  <div class="main"><div>SubQuery © 2022</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
