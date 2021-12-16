<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Selamat datang di <span>Dokumen</span> SubQuery</h2>
        <p>Jelajahi dan ubah data chain untuk membangun dApps yang intuitif dengan lebih cepat!</p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Cara Memulai <span>Panduan</span></h2>
      <p>Understand SubQuery by getting hands on with a traditional Hello World example. Using a template project within a Docker environment, you can quickly get a node up and running and start querying a blockchain in just a few minutes with a few simple commands.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/helloworld-localhost/'}">
           <span>Mulai</span>
         </router-link>
      </span>
    </div>
  </section>
</div>
<div class="main">
  <div>
    <ul class="list">
      <li>
        <router-link :to="{path: '/tutorials_examples/introduction/'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>Tutorial dan Contoh</span>
            <p>Learning by doing. Tutorials and examples on how to build various SubQuery projects.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction/'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Dokumen Referensi Teknis</span>
            <p>Written by developers for developers. Find what you need to build awesome dApps quickly.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>The SubQuery Network</span>
            <p>SubQuery’s decentralised future. Read more about how indexers and consumers are rewarded.</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</div>
<section class="faqSection main">
  <div>
    <h2 class="title">Pertanyaan Umum</h2>
    <ul class="faqList">
      <li>
        <div class="title">Apa itu SubQuery?</div>
        <div class="content">
          <p>SubQuery adalah proyek open source yang memungkinkan developer untuk mengindeks, mengubah, dan melakukan query Substrate data chain untuk mentenagai aplikasi mereka.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-subquery'}">BACA SELENGKAPNYA</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Apa cara terbaik untuk memulai SubQuery?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/helloworld-localhost/">Hello World tutorial</a>. This is a simple 5 min walk through of downloading the starter template, building the project, and then using Docker to run a node on your localhost and running a simple query. </p>
        </div>
      </li>
      <li>
        <div class="title">Bagaimana saya bisa berkontribusi atau memberi masukan ke SubQuery?</div>
        <div class="content">
          <p>We love contributions and feedback from the community. To contribute code, fork the repository of interest and make your changes. Then submit a PR or Pull Request. Oh, don't forget to test as well! Also check out our contributions guidelines (coming soon). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-the-best-way-to-get-started-with-subquery'}">BACA SELENGKAPNYA</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Berapa biaya untuk hosting proyek saya di SubQuery Projects?</div>
        <div class="content">
          <p>Hosting your project in SubQuery Projects is absolutely free - it's is our way of giving back to the community. To learn how to host your project with us, please check out the <a href="/quickstart/helloworld-hosted/">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/publish/publish/'}">MENYEDIAKAN PROYEK ANDA</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Untuk pertanyaan umum lebih lanjut, silakan lihat kami <router-link :to="{path: '/faqs/faqs/'}">FAQ's</router-link> halaman.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Mengintegrasi Custom Chain anda?</h5>
        <p>Whether you're building a new parachain or an entirely new blockchain on Substrate - SubQuery can help you index and troubleshoot your chain's data. SubQuery is designed to easily integrate with a custom Substrate based chain.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping/#custom-substrate-chains'}">PELAJARI CARA MENGINTEGRASI DENGAN RANTAI ANDA</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Dukung dan Kontribusi</h5>
        <p>Have a question or interested to know more or how you can contribute? We’d love to hear from you. Please contact us via email or social media from the links below. Need technical expertise? Join our Discord community and receive support from our passionate community members. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/78zg8aBSMG">GABUNG PERBINCANGAN DI DISCORD</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Hubungi kami</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Ikuti kami di socialbn</div>
    <div class="connectWay">
      <a href="https://discord.com/invite/78zg8aBSMG" target="_blank" class="connectDiscord">discord</a>
      <a href="https://twitter.com/subquerynetwork" target="_blank" class="connectTwitter">twitter</a>
      <a href="https://medium.com/@subquery" target="_blank" class="connectMedium">medium</a>
      <a href="https://t.me/subquerynetwork" target="_blank" class="connectTelegram">telegram</a>
      <a href="https://github.com/OnFinality-io/subql" target="_blank" class="connectGithub">github</a>
      <a href="https://matrix.to/#/#subquery:matrix.org" target="_blank" class="connectMatrix">matrix</a>
      <a href="https://www.linkedin.com/company/subquery" target="_blank" class="connectLinkedin">linkedin</a>
    </div>
  </div>
</section>
</div> </div>
<div class="footer">
  <div class="main"><div>SubQuery © 2021</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
