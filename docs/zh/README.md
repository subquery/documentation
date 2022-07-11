<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Welcome to SubQuery <span>Academy</span></h2>
        <p>探索并改造您的链数据以更快地构建直观的 dApp！</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, and Cosmos (starting with Juno)</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">快速启动 <span>指南</span></h2>
      <p>借助传统的Hello World 范例来理解SubQuery。 在 Docker 环境中使用模板项目 您可以快速获得一个节点上线并运行运行，并且在短短几分钟内用几个简单的命令开始查询区块链。
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart.html'}"> 
          <span>Get started</span>
        </router-link>
      </span>
    </div>
  </section>
</div>
<div class="main">
  <div>
    <ul class="list">
      <li>
        <router-link :to="{path: '/academy/tutorials_examples/introduction.html'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>教程 & 案例</span>
            <p>在我们的学院学习。 如何构建各种子查询项目的教程和示例。</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>技术参考文档</span>
            <p>由开发者为开发者编写。 快速查找建立你所需的超棒的 dapp 。</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/subquery_network/introduction.html'}"> 
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>The SubQuery Network</span>
            <p>SubQuery’s decentralised future. Read more about how indexers and consumers are rewarded.</p>
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
          <p>SubQuery 是一个开放源代码项目，它允许开发者索引、转换和查询底层链数据为他们的应用程序提供动力。</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.md#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">从SubQuery开始的最佳方式是什么？</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start tutorial</a>. 这是一个简单的5分钟步行来下载启动模板，构建项目。 然后使用 Docker 在您的本地主机上运行一个节点，运行一个简单的查询。 </p>
        </div>
      </li>
      <li>
        <div class="title">我如何向SubQuer贡献或反馈？</div>
        <div class="content">
          <p>我们热爱社区的贡献和反馈。 若要贡献代码，请分派感兴趣的仓库并做出更改。 然后提交 PR 或 Pull 请求。 哦，不要忘记测试！ 你也可以查阅我们给贡献者的指南(即将出台)。 </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.md#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">在SubQuery项目中托管我的项目需要多少费用？</div>
        <div class="content">
          <p>在 SubQuery 项目中托管您的项目是绝对免费的，这是我们回归社区的方式。 To learn how to host your project with us, please check out the <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">了解您的进程</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    欲了解更多常见问题，请参阅我们的 <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> 页面    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>与您的自定义链集成？</h5>
        <p>无论您在底层上构建一个新的平行链，还是一个全新的区块链——SubQuery 都可以帮助您索引并帮您链中的数据做数据纠错。 SubQuery 旨在轻松地与基于自定义的底层链集成。</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.md#custom-substrate-and-cosmos-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>支持和贡献</h5>
        <p>有问题或有兴趣了解更多信息或如何贡献？ 我们很乐意听到您的声音。 请通过以下链接通过电子邮件或社交媒体联系我们。 需要技术专门知识？ 加入我们的 Discord 社区并得到我们热情的社区成员的支持。 </p>
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
