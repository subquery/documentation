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
            <p>Learn by doing and practice with SubQuery’s real-world blockchain projects & improve your skills.</p>
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
    <h2 class="title">SSS</h2>
    <ul class="faqList">
      <li>
        <div class="title">SubQuery nedir?</div>
        <div class="content">
          <p>SubQuery, önde gelen çok zincirli uygulamaları desteklemek için hızlı, esnek, güvenilir ve merkezi olmayan API'ler sağlayan geliştiriciler için açık kaynaklı bir blok zinciri veri dizinleyicisidir.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">SubQuery'ye başlamanın en iyi yolu nedir?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start</a> tutorial. This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.</p>
        </div>
      </li>
      <li>
        <div class="title">SubQuery'ye nasıl katkıda bulunabilir veya geri bildirimde bulunabilirim?</div>
        <div class="content">
          <p>Topluluktan gelen katkıları ve geri bildirimleri seviyoruz. To contribute the code, we suggest starting by creating an issue in our main repository so we can give you support.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">Projemi SubQuery Projelerinde barındırmanın maliyeti nedir?</div>
        <div class="content">
          <p>This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">PROJENİZE EV SAHİPLİĞİ YAPMA</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Got more questions? Visit our <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> sayfamıza bakın.     
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Integrate with Your Custom Substrate Chain</h5>
        <p>Whether you're building a new parachain or an entirely new blockchain on Substrate — SubQuery can help you index and troubleshoot your chain's data. SubQuery helps you easily integrate with a custom Substrate-based chain.</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest/polkadot.html#custom-substrate-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Destek ve Katkıda Bulun</h5>
        <p>Have a question or interested in knowing how you can contribute? Sizden haber almak isteriz. Lütfen aşağıdaki bağlantılardan e-posta veya sosyal medya aracılığıyla bizimle iletişime geçin. Teknik uzmanlığa mı ihtiyacınız var? Discord topluluğumuza katılın ve tutkulu topluluk üyelerimizden destek alın. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">DISCORD'DA SOHBETE KATıLıN</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Bize Ulaşın</span>
    <a href="mailto:hello@subquery.network">merhaba@subquery.network</a>
  </div>
  <div>
    <div>Bizi socialbn'de takip edin</div>
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
