<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Selamat datang di <span>Universitas</span> SubQuery</h2>
        <p>Jelajahi dan ubah data chain untuk membangun dApps yang intuitif dengan lebih cepat!</p>
        <p><strong>SubQuery now supports both Polkadot and Avalanche</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Mulai Cepat <span>Panduan</span></h2>
      <p>Pahami SubQuery dengan mempelajari contoh Hello World tradisional. Menggunakan proyek template dalam lingkungan Docker, Anda dapat dengan cepat mengaktifkan dan menjalankan node dan mulai menanyakan blockchain hanya dalam beberapa menit dengan beberapa perintah sederhana.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart.html'}">
          <span>Memulai</span>
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
            <span>Tutorial dan Contoh</span>
            <p>Belajar sambil bekerja di Akademi kami. Tutorial dan contoh tentang cara membangun berbagai proyek SubQuery.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction.html'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Dokumen Referensi Teknis</span>
            <p>Ditulis oleh pengembang untuk pengembang. Temukan apa yang Anda butuhkan untuk membangun dApps yang luar biasa dengan cepat.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
             <img src="/assets/img/networkIcon.svg" />
             <span>Jaringan Subkueri</span>
             <p>Masa depan terdesentralisasi SubQuery. Baca lebih lanjut tentang bagaimana pengindeks dan konsumen dihargai.</p>
           <//>
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
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">BACA SELENGKAPNYA</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Apa cara terbaik untuk memulai SubQuery?</div>
        <div class="content">
          <p>Cara terbaik untuk memulai SubQuery adalah dengan mencoba <a href="/quickstart/quickstart.html">tutorial Quick Start</a> kami. Ini adalah 5 menit berjalan sederhana untuk mengunduh template starter, membangun proyek, dan kemudian menggunakan Docker untuk menjalankan node di localhost Anda dan menjalankan kueri sederhana. </p>
        </div>
      </li>
      <li>
        <div class="title">Bagaimana saya bisa berkontribusi atau memberi masukan ke SubQuery?</div>
        <div class="content">
          <p>Kami menyukai kontribusi dan umpan balik dari komunitas. Untuk menyumbangkan kode, garpu repositori yang menarik dan buat perubahan Anda. Kemudian kirimkan PR atau Pull Request. Oh, jangan lupa untuk menguji juga! Lihat juga pedoman kontribusi kami (segera hadir). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-the-best-way-to-get-started-with-subquery'}">BACA SELENGKAPNYA</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Berapa biaya untuk hosting proyek saya di SubQuery Projects?</div>
        <div class="content">
          <p>Hosting proyek Anda di Proyek SubQuery benar-benar gratis - ini adalah cara kami memberikan kembali kepada komunitas. Untuk mempelajari cara meng-host proyek Anda bersama kami, silakan lihat tutorial <a href="/quickstart/quickstart.html">Hello World (SubQuery Hosted)</a>.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">MENYEDIAKAN PROYEK ANDA</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Untuk pertanyaan umum lebih lanjut, silakan lihat kami <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> halaman.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Mengintegrasi Custom Chain anda?</h5>
        <p>Baik Anda sedang membangun parachain baru atau blockchain yang sama sekali baru di Substrat - SubQuery dapat membantu Anda mengindeks dan memecahkan masalah data rantai Anda. SubQuery dirancang untuk diintegrasikan dengan mudah dengan rantai berbasis Substrat kustom.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping.html#custom-substrate-chains'}">PELAJARI CARA MENGINTEGRASI DENGAN RANTAI ANDA</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Dukung dan Kontribusi</h5>
        <p>Memiliki pertanyaan atau tertarik untuk mengetahui lebih banyak atau bagaimana Anda dapat berkontribusi? Kami ingin mendengar dari Anda. Silakan hubungi kami melalui email atau media sosial dari tautan di bawah ini. Butuh keahlian teknis? Bergabunglah dengan komunitas Discord kami dan dapatkan dukungan dari anggota komunitas kami yang bersemangat. </p>
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
      <a href="https://www.linkedin.com/company/subquery" target="_blank" class="connectLinkedin">linkedin</a>
    </div>
  </div>
</section>
</div>
</div>
<div class="footer">
  <div class="main"><div>SubQuery © 2022</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
