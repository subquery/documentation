<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">使用<span>SubQuery 学院构建更快的 dapps</span></h2>
        <p>在您分散的数据和工具之间探索和实现您自己高效的自定义开源API，以更快地查询数据并节省时间。</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, Cosmos, Algorand, and Flare.</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">使用我们的 <span>快速启动指南获得一个启动</span></h2>
      <p><strong>在不到10分钟的时间内构建您的第一个子查询项目，并带有简单的引导步骤。</strong></p>
      <p>开始在您最爱的区块链网络上查询您的 dApps 数据，使用我们的启动项目。 探索和修改重要文件，了解SubQuery是如何工作的。
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart.html'}"> 
          <span>Get Started</span>
        </router-link>
      </span>
    </div>
  </section>
</div>
<div class="main">
  <div>
    <div>
    <h2 class="title" text-align:center>想了解更多关于子查询学院的信息吗？</h2>
    </div>
    <ul class="list">
      <li>
        <router-link :to="{path: '/academy/tutorials_examples/introduction.html'}">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>练习教程和示例</span>
            <p>Learn by doing and practice with SubQuery’s real-world blockchain projects & improve your skills.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>技术参考文档</span>
            <p>挖掘到每个词，使用者和最佳做法，帮助您建立一个用户喜欢的dapp。</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/subquery_network/introduction.html'}"> 
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>成为SubQuery 网络的一部分</span>
            <p>以完全分散的方式管理和索引项目。 参与网络并获得SQT奖励。</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</div>
<section class="faqSection main">
  <div>
    <h2 class="title">常见问答（FAQ）</h2>
    <ul class="faqList">
      <li>
        <div class="title">什么是SubQuery？</div>
        <div class="content">
          <p>SubQuery 是一个开放源码区块链数据索引器，为开发者提供快速、灵活、可靠和分散的 API，为多链应用提供动力。</p>
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
          <p>我们热爱社区的贡献和反馈。 为了贡献代码，我们建议首先在我们的主要仓库中创建一个问题，以便我们能够支持您。</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">查看更多</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">在SubQuery项目中托管我的项目需要多少费用？</div>
        <div class="content">
          <p>此服务正在免费提供给社区！ You can host your first two SubQuery projects for absolutely free!</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">了解您的进程</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    还有其他疑问吗？ 访问我们的 <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> 页面     
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>与您的自定义Substrate 链集成</h5>
        <p>无论您在底层上构建一个新的平行链，还是一个全新的区块链——SubQuery 都可以帮助您索引并帮您链中的数据做数据纠错。 SubQuery 旨在轻松地与基于自定义的底层链集成。</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest/polkadot.html#custom-substrate-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
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
<div class="footer">
  <div class="main"><div>SubQuery © 2022</div></div>
</div>
<!--<script charset="utf-8" src="/assets/js/welcome.js"></script>-->
