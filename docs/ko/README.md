<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Welcome to SubQuery<span>Academy</span></h2>
        <p>체인 데이터를 탐색하고 변환하여 직관적인 디앱을 더 빠르게 구축해보십시오!</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, and Cosmos (starting with Juno).</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">빠른시작 <span>가이드</span></h2>
      <p>가장 쉬운 Hello World 예제를 통해 SubQuery를 이해해보세요. Docker 환경 내에서 템플릿 프로젝트를 사용하면 몇 가지 간단한 커맨드로 단 몇 분 만에 노드를 신속하게 시작, 실행하고 블록체인 쿼리를 시작할 수 있습니다.
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
            <span>튜토리얼 및 예제</span>
            <p>Learning by doing in our Academy. 다양한 SubQuery 프로젝트 개발을 위한 튜토리얼 및 예제</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>기술 참조 문서</span>
            <p>개발자를 위한 기술 문서. 훌륭한 디앱들을 신속히 개발하기 위해 필요한 것들을 발견할 수 있습니다.</p>
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
    <h2 class="title">자주 묻는 질문(FAQ)</h2>
    <ul class="faqList">
      <li>
        <div class="title">SubQuery란?</div>
        <div class="content">
          <p>SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps. Our mission is to help developers create the decentralised products of the future.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">SubQuery를 시작하는 가장 좋은 방법은 무엇입니까?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start</a> tutorial. 쿼리를 실행하는 과정을 5분 만에 쉽게 구동할 수 있습니다. 일단 스타트 템플릿을 다운로드하고 프로젝트를 빌드한 다음, Docker를 이용하여 로컬 호스트에서 노드를 실행합니다. </p>
        </div>
      </li>
      <li>
        <div class="title">SubQuery에 기여하거나 피드백을 하려면 어떻게 해야하나요?</div>
        <div class="content">
          <p>우리는 언제나 커뮤니티의 기여와 피드백을 환영합니다. 코드를 피드백을 하려면 관심 있는 레포지토리를 포크하고 변경합니다. 그런 다음 PR 또는 풀 리퀘스트를 통해 제출해주세요. 맞다! 테스트도 잊지 마시구요! 또한 기여를위한 가이드(곧 제공될 예정입니다) 도 확인해주세요. </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">SubQuery 프로젝트에서 내 프로젝트를 호스팅하는 데 비용이 얼마나 듭니까?</div>
        <div class="content">
          <p>Hosting your project in SubQuery Projects is absolutely free — it is our way of giving back to the community. To learn how to host your project with us, please check out the <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">HOSTING YOUR PROJECT</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    추가적인 자주 묻는 질문을 원하신다면, <router-link :to="{path: '/faqs/faqs.html'}">자주 묻는 질문</router-link> 페이지를 확인해주세요.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>커스텀 체인과 통합하시겠습니까?</h5>
        <p>Whether you're building a new parachain or an entirely new blockchain on Substrate — SubQuery can help you index and troubleshoot your chain's data. 또한 SubQuery는 Substrate 기반의 커스텀 체인과 쉽게 통합되도록 설계되었습니다.</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.html#custom-substrate-and-cosmos-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>지원 및 기여</h5>
        <p>Have a question or are interested in knowing more or how you can contribute? 저희는 여러분의 의견을 듣고 싶습니다. 아래에 게시된 링크에서 이메일이나 소셜 미디어를 통해 문의해주세요. 전문적인 기술 지원이 필요하십니까? 디스코드 커뮤니티에 가입하고 열정적인 커뮤니티 구성원들에게 지원을 받아보세요. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">디스코드 커뮤니티에 참여하세요</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>문의 메일</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>소셜미디어</div>
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
