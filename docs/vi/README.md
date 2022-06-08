<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Chào mừng bạn đến với <span>Đại học</span> SubQuery</h2>
        <p>Khám phá và chuyển đổi dữ liệu chuỗi của bạn để xây dựng các dApp trực quan nhanh hơn!</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, and Cosmos</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Hướng Dẫn <span>Nhanh</span></h2>
      <p>Hiểu cách SubQuery vận hành bằng cách bắt tay vào việc ngay, với câu lệnh Hello World quen thuộc. Sử dụng dự án mẫu trong Docker, bạn có thể nhanh chóng thiết lập và chạy một node. Từ đó, bắt đầu truy vấn blockchain chỉ trong vài phút với một vài lệnh đơn giản.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart-polkadot.html'}">
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
        <router-link :to="{path: '/academy/tutorials_examples/introduction.html'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>Hướng dẫn và Ví dụ</span>
            <p>Học bằng cách thực hiện trong Học viện của chúng tôi. Hướng dẫn và ví dụ về cách xây dựng các dự án bằng SubQuery.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction.html'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Các tài liệu tham khảo về các vấn đề kỹ thuật</span>
            <p>SubQuery được tạo ra bởi những nhà phát triển, dành cho những nhà phát triển. Tìm ra thứ bạn cần để nhanh chóng xây dựng một dApp tuyệt đỉnh.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>Mạng SubQuery</span>
            <p>Tương lai phi tập trung của SubQuery. Tìm hiểu thêm về cơ chế thưởng dành cho người lập chỉ mục và người dùng.</p>
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
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">ĐỌC THÊM</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Cách tốt nhất để bắt đầu với SubQuery là gì?</div>
        <div class="content">
          <p>Cách tốt nhất để bắt đầu với SubQuery là thực hiện <a href="/quickstart/quickstart-polkadot.html">Hướng dẫn bắt đầu nhanh</a> của chúng tôi. Đây là một hướng dẫn đơn giản trong 5 phút: tải xuống mẫu khởi động, xây dựng dự án và sau đó sử dụng Docker để chạy một node trên máy chủ của bạn và chạy một truy vấn đơn giản. </p>
        </div>
      </li>
      <li>
        <div class="title">Làm cách nào để tôi có thể đóng góp hoặc đưa ra phản hồi cho SubQuery?</div>
        <div class="content">
          <p>Chúng tôi rất mong nhận được ý kiến đóng góp và phản hồi từ cộng đồng. Để đóng góp vào việc phát triển, hãy tạo bản sao cho những phần bạn quan tâm và đưa ra những thay đổi. Sau đó hãy sử dụng chức năng Pull Request hay gọi tắt là PR. À, đừng quên chạy thử đấy nhé! Ngoài ra, hãy xem các nguyên tắc đóng góp của chúng tôi (sẽ sớm được công khai). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-the-best-way-to-get-started-with-subquery'}">ĐỌC THÊM</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Chi phí để lưu trữ dự án của tôi trong SubQuery là bao nhiêu?</div>
        <div class="content">
          <p>Việc lưu trữ dự án trên SubQuery là hoàn toàn miễn phí - đây là cách chúng tôi cống hiến cho cộng đồng. Để tìm hiểu cách lưu trữ dự án của bạn trên SubQuery, vui lòng xem hướng dẫn <a href="/quickstart/quickstart-polkadot.html">Hello World (SubQuery Hosted)</a> của chúng tôi.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">LƯU TRỮ DỰ ÁN CỦA BẠN</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Để biết các câu hỏi thường gặp, vui lòng xem trang <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> .    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Tích hợp với Chuỗi tùy chỉnh của bạn?</h5>
        <p>Cho dù bạn đang xây dựng một parachain hay một blockchain hoàn toàn mới trên Substrate - SubQuery đều có thể giúp bạn lập chỉ mục và khắc phục sự cố dữ liệu trên chuỗi. SubQuery được thiết kế để dễ dàng tích hợp với blockchain tùy chỉnh có nền tảng Substrate.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping.html#custom-substrate-chains'}">TÌM HIỂU CÁCH TÍCH HỢP VỚI BLOCKCHAIN CỦA BẠN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Hỗ trợ và đóng góp</h5>
        <p>Bạn có câu hỏi, cần thêm thông tin hoặc muốn đóng góp? Chúng tôi rất mong nhận được phản hồi của bạn. Vui lòng liên hệ với chúng tôi qua email hoặc các tài khoản mạng xã hội được cung cấp ở bên dưới. Bạn cần tư vấn chuyên môn? Hãy tham gia kênh Discord để nhận được hỗ trợ từ các thành viên nhiệt huyết trong cộng đồng của chúng tôi! </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">THAM GIA TRAO ĐỔI TRÊN DISCORD</a>
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
  <div class="main"><div>SubQuery © 2022</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
