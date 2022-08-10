<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Bangun dApps Lebih Cepat dengan<span>SubQuery Academy</span></h2>
        <p>Jelajahi dan terapkan API open-source kustom Anda sendiri yang efisien antara data terdesentralisasi Anda dan alat untuk menanyakan data lebih cepat dan menghemat waktu Anda.</p></br>
        <p><strong>SubQuery sekarang mendukung Polkadot, Avalanche, Cosmos, dan Algorand.</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Mulailah dengan <span>Panduan Memulai Cepat</span> kami</h2>
      <p><strong>Bangun proyek SubQuery pertama Anda dalam waktu kurang dari 10 menit dengan langkah-langkah sederhana yang dipandu.</strong>
      <p>Mulai kueri data untuk dApps Anda di jaringan blockchain yang paling Anda sukai menggunakan proyek pemula kami. Jelajahi dan modifikasi file-file penting, dan pahami cara kerja SubQuery.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart.html'}"> 
          <span>Mulai Membangun</span>
        </router-link>
      </span>
    </div>
  </section>
</div>
<div class="main">
  <div>
    <div>
    <h2 class="title" text-align:center>Ingin Pelajari Lebih Lanjut Tentang SubQuery Academy?</h2>
    </div>
    <ul class="list">
      <li>
        <router-link :to="{path: '/academy/tutorials_examples/introduction.html'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>Berlatih dengan Tutorial & Contoh</span>
            <p>Belajar dengan melakukan. Berlatih dengan proyek-proyek blockchain dunia nyata SubQuery & tingkatkan keterampilan Anda.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Lihat Dokumen Referensi Teknis</span>
            <p>Gali setiap istilah, kasus penggunaan, dan praktik terbaik yang membantu Anda membangun dApp yang disukai pengguna Anda.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/subquery_network/introduction.html'}"> 
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>Jadilah Bagian dari Jaringan SubQuery</span>
            <p>Host & indeks proyek dengan cara yang sepenuhnya terdesentralisasi. Berpartisipasi dalam jaringan dan dapatkan hadiah dengan SQT.</p>
          </div>
        </router-link>
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
          <p>SubQuery adalah pengindeks data blockchain sumber terbuka. Ini memberi pengembang API yang lebih cepat dan terdesentralisasi. Ini memungkinkan Anda untuk membangun aplikasi multi-rantai yang kuat tanpa membuang waktu berjam-jam untuk mengindeks dan dengan cepat menanyakan data.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">BACA SELENGKAPNYA</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Apa cara terbaik untuk memulai SubQuery?</div>
        <div class="content">
          <p>Cara terbaik untuk memulai SubQuery adalah dengan mencoba tutorial <a href="/quickstart/quickstart.html">Quick Start</a>tutorial. Ini adalah latihan berjalan kaki selama 5 menit yang sederhana. Unduh templat pemula, bangun proyek, gunakan Docker untuk menjalankan node di localhost Anda, dan jalankan kueri sederhana.</p>
        </div>
      </li>
      <li>
        <div class="title">Bagaimana saya bisa berkontribusi atau memberi masukan ke SubQuery?</div>
        <div class="content">
          <p>Kami menyukai kontribusi dan umpan balik dari komunitas. Untuk berkontribusi dalam kode, kami sarankan untuk memulai dengan membuat isu di repositori utama kami sehingga kami dapat memberikan dukungan kepada Anda.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">BACA SELENGKAPNYA</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">Berapa biaya untuk hosting proyek saya di SubQuery Projects?</div>
        <div class="content">
          <p>Hosting proyek Anda di Proyek SubQuery benar-benar gratis - ini adalah cara kami untuk memberikan kembali kepada komunitas. Untuk mempelajari cara meng-host proyek Anda bersama kami, silakan lihat tutorial <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a>.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">MENYEDIAKAN PROYEK ANDA</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Punya pertanyaan lain? Kunjungi <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> halaman.     
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Integrasikan dengan Rantai Substrat Khusus Anda</h5>
        <p>Baik Anda sedang membangun parachain baru atau blockchain yang sama sekali baru di Substrate - SubQuery dapat membantu Anda mengindeks dan memecahkan masalah data chain Anda. SubQuery membantu Anda dengan mudah berintegrasi dengan rantai berbasis Substrat kustom.</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.html#custom-substrate-and-cosmos-chains'}">PELAJARI CARA MENGINTEGRASIKAN DENGAN RANTAI ANDA</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Dukung dan Kontribusi</h5>
        <p>Punya pertanyaan atau tertarik untuk mengetahui bagaimana Anda bisa berkontribusi? Kami ingin mendengar dari Anda. Silakan hubungi kami melalui email atau media sosial dari tautan di bawah ini. Butuh keahlian teknis? Bergabunglah dengan komunitas Discord kami dan dapatkan dukungan dari anggota komunitas kami yang bersemangat. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">GABUNG PERBINCANGAN DI DISCORD</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Hubungi kami</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Ikuti kami di sosial media</div>
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
