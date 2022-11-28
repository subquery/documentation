<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Build Faster dApps with<span>SubQuery Academy</span></h2>
        <p>Explore and implement your own efficient custom open-source API between your decentralised data and tools to query data faster and save you time.</p></br>
        <p><strong>SubQuery now supports Polkadot, Avalanche, Cosmos, Algorand, and Flare.</strong></p>
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
    <h2 class="title">FAQ</h2>
    <ul class="faqList">
      <li>
        <div class="title">Що таке SubQuery?</div>
        <div class="content">
          <p>SubQuery-це індексатор даних блокчейн з відкритим вихідним кодом для розробників, який надає швидкі, гнучкі, надійні й децентралізовані API-інтерфейси для підтримки провідних багатоланцюгових додатків.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Який найкращий спосіб розпочати роботу з SubQuery?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start</a> tutorial. Це проста 5-хвилинна прогулянка з вправою. Завантажте початковий шаблон, створіть проєкт, використовуйте Docker для запуску вузла на вашому локальному хості та виконайте простий запит.</p>
        </div>
      </li>
      <li>
        <div class="title">Як я можу внести або надати відгуки на SubQuery?</div>
        <div class="content">
          <p>Ми любимо внески та відгуки громади. To contribute the code, we suggest starting by creating an issue in our main repository so we can give you support.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">Скільки коштує розміщення мого проекту в проектах SubQuery?</div>
        <div class="content">
          <p>This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">Розміщення ВАШОГО ПРОЕКТУ</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Got more questions? Visit our <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> сторінка     
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
        <h5>Підтримка та внесок</h5>
        <p>Have a question or interested in knowing how you can contribute? Нам важлива Ваша думка! Будь ласка, зв'яжіться з нами електронною поштою або соціальними мережами за посиланнями нижче. Потрібна технічна експертиза? Приєднуйтесь до нашої спільноти Discord та отримуйте підтримку від наших пристрасних членів громади. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">ПРИЄДНАЙТЕСЬ ДО КОНВЕРСАЦІЇ НА DISCORD</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Contact us</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Слідкуйте за нами в соціальних мережах</div>
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
