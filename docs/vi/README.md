<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Chào mừng bạn đến với <span>Tài liệu</span> tiếng Việt của SubQuery</h2>
        <p>Khám phá và chuyển đổi dữ liệu chuỗi của bạn để xây dựng các dApp trực quan nhanh hơn!</p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Hướng Dẫn <span>Nhanh</span></h2>
      <p>Understand SubQuery by getting hands on with a traditional Hello World example. Using a template project within a Docker environment, you can quickly get a node up and running and start querying a blockchain in just a few minutes with a few simple commands.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/helloworld-localhost/'}">
          <span>Bắt đầu</span>
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
            <span>Hướng dẫn và Ví dụ</span>
            <p>Learning by doing. Tutorials and examples on how to build various SubQuery projects.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction/'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Tài liệu tham khảo về vấn đề kỹ thuật</span>
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
    <h2 class="title">Câu hỏi thường gặp</h2>
    <ul class="faqList">
      <li>
        <div class="title">SubQuery là gì?</div>
        <div class="content">
          <p>SubQuery là một dự án mã nguồn mở cho phép các nhà phát triển lập chỉ mục, chuyển đổi và truy vấn dữ liệu chuỗi Substrate để cung cấp cho các ứng dụng của họ.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-subquery'}">ĐỌC THÊM</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Cách tốt nhất để bắt đầu với SubQuery là gì?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/helloworld-localhost/">Hello World tutorial</a>. This is a simple 5 min walk through of downloading the starter template, building the project, and then using Docker to run a node on your localhost and running a simple query. </p>
        </div>
      </li>
      <li>
        <div class="title">Làm cách nào để tôi có thể đóng góp hoặc đưa ra phản hồi cho SubQuery?</div>
        <div class="content">
          <p>We love contributions and feedback from the community. To contribute code, fork the repository of interest and make your changes. Then submit a PR or Pull Request. Oh, don't forget to test as well! Also check out our contributions guidelines (coming soon). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-the-best-way-to-get-started-with-subquery'}">ĐỌC THÊM</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Chi phí để lưu trữ dự án của tôi trong Dự án SubQuery là bao nhiêu?</div>
        <div class="content">
          <p>Hosting your project in SubQuery Projects is absolutely free - it's is our way of giving back to the community. To learn how to host your project with us, please check out the <a href="/quickstart/helloworld-hosted/">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/publish/publish/'}">LƯU TRỮ DỰ ÁN CỦA BẠN</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Để biết các câu hỏi thường gặp, vui lòng xem trang <router-link :to="{path: '/faqs/faqs/'}">FAQ's</router-link> page.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Tích hợp với Chuỗi tùy chỉnh của bạn?</h5>
        <p>Whether you're building a new parachain or an entirely new blockchain on Substrate - SubQuery can help you index and troubleshoot your chain's data. SubQuery is designed to easily integrate with a custom Substrate based chain.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping/#custom-substrate-chains'}">TÌM HIỂU CÁCH TÍCH HỢP VỚI BLOCKCHAIN CỦA BẠN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Hỗ trợ và đóng góp</h5>
        <p>Have a question or interested to know more or how you can contribute? We’d love to hear from you. Please contact us via email or social media from the links below. Need technical expertise? Join our Discord community and receive support from our passionate community members. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/78zg8aBSMG">THAM GIA TRAO ĐỔI TRÊN DISCORD</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Liên hệ với chúng tôi </span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Theo dõi chúng tôi trên mạng xã hội</div>
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
