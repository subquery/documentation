<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Welcome to SubQuery<span>Academy</span></h2>
        <p>Sezgisel dApp'leri daha hızlı oluşturmak için zincir verilerinizi keşfedin ve dönüştürün!</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, and Cosmos (starting with Juno).</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Hızlı Başlangıç <span>Guide</span></h2>
      <p>Geleneksel bir Hello World örneğiyle el ele tutuşarak SubQuery'i anlayın. Docker ortamındaki bir şablon projesini kullanarak, hızlı bir şekilde bir düğüm çalıştırabilir ve birkaç basit komutla birkaç dakika içinde bir blok zincirini sorgulamaya başlayabilirsiniz.
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
    <ul class="list">
      <li>
        <router-link :to="{path: '/academy/tutorials_examples/introduction.html'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>Öğreticiler ve Örnekler</span>
            <p>Akademimizde Yaparak Öğreniyoruz. Çeşitli SubQuery projeleri oluşturma hakkında öğreticiler ve örnekler.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Teknik Başvuru Belgeleri</span>
            <p>Geliştiriciler için geliştiriciler tarafından yazılmıştır. Harika dApp'leri hızlı bir şekilde oluşturmak için ihtiyacınız olanı bulun.</p>
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
    <h2 class="title">SSS</h2>
    <ul class="faqList">
      <li>
        <div class="title">SubQuery nedir?</div>
        <div class="content">
          <p>SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps. Our mission is to help developers create the decentralised products of the future.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">SubQuery'ye başlamanın en iyi yolu nedir?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start</a> tutorial. Bu, başlangıç şablonunu indirme, projeyi oluşturma ve ardından localhost'unuzda bir düğüm çalıştırmak ve basit bir sorgu çalıştırmak için Docker'ı kullanma konusunda basit bir 5 dakikalık yürüme mesafesindedir. </p>
        </div>
      </li>
      <li>
        <div class="title">SubQuery'ye nasıl katkıda bulunabilir veya geri bildirimde bulunabilirim?</div>
        <div class="content">
          <p>Topluluktan gelen katkıları ve geri bildirimleri seviyoruz. Koda katkıda bulunmak için, ilgi alanı deponuzu çatallayın ve değişikliklerinizi yapın. Ardından bir PR veya Çekme İsteği gönderin. Test etmeyi de unutma! Ayrıca katkı yönergelerimize de göz atın (yakında). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">Projemi SubQuery Projelerinde barındırmanın maliyeti nedir?</div>
        <div class="content">
          <p>Hosting your project in SubQuery Projects is absolutely free — it is our way of giving back to the community. To learn how to host your project with us, please check out the <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">PROJENİZE EV SAHİPLİĞİ YAPMA</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Daha sık sorulan diğer sorular için lütfen <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> sayfamıza bakın.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Özel Zinciriniz ile entegre misiniz?</h5>
        <p>Whether you're building a new parachain or an entirely new blockchain on Substrate — SubQuery can help you index and troubleshoot your chain's data. SubQuery, özel bir Substrat tabanlı zincirle kolayca entegre olacak şekilde tasarlanmıştır.</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.html#custom-substrate-and-cosmos-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Destek ve Katkıda Bulun</h5>
        <p>Have a question or are interested in knowing more or how you can contribute? Sizden haber almak isteriz. Lütfen aşağıdaki bağlantılardan e-posta veya sosyal medya aracılığıyla bizimle iletişime geçin. Teknik uzmanlığa mı ihtiyacınız var? Discord topluluğumuza katılın ve tutkulu topluluk üyelerimizden destek alın. </p>
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
