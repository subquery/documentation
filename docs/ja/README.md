<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Welcome to SubQuery<span>Academy</span></h2>
        <p>直感的なdAppsをより速く構築するために、チェーンデータを検索して変換しましょう！</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, and Cosmos (starting with Juno).</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">クイックスタート <span>ガイド</span></h2>
      <p>SubQueryを理解するために、従来のHello Worldの例を使います。 Docker 環境内でのテンプレート プロジェクトの使用して、いくつかの簡単なコマンドですぐにノードを起動して実行し、わずか数分でブロックチェーンのクエリを開始できます。
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
            <span>チュートリアルと使用例</span>
            <p>Learning by doing in our Academy. 様々な SubQuery プロジェクトをビルドする方法についてのチュートリアルと使用例がこちらです。</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>テクニカルリファレンスドキュメント</span>
            <p>開発者向けに書かれています。 素晴らしいdAppsを素早く構築するために必要なものを見つけましょう。</p>
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
    <h2 class="title">FAQ</h2>
    <ul class="faqList">
      <li>
        <div class="title">SubQueryとは？</div>
        <div class="content">
          <p>SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps. Our mission is to help developers create the decentralised products of the future.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">SubQueryを始めるための最良の方法は何ですか？</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start</a> tutorial. スターターテンプレートをダウンロードし、プロジェクトをビルドし、Dockerを使用してローカルホスト上でノードを実行し、簡単なクエリを実行する5分間のウォークスルーです。 </p>
        </div>
      </li>
      <li>
        <div class="title">SubQueryにどのように貢献したりフィードバックを与えたりできますか？</div>
        <div class="content">
          <p>私たちはコミュニティからの貢献とフィードバックが大好きです。 コードに貢献するためには、関心のあるリポジトリをフォークして変更を加えます。 次にPRまたはPullリクエストを送信します。 ああ、テストすることを忘れないでください！ 私たちの貢献ガイドラインもチェックしてください(近日公開)。 </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">自分のプロジェクトをSubQuery Projectsで公開するにはどのくらいの費用がかかりますか？</div>
        <div class="content">
          <p>Hosting your project in SubQuery Projects is absolutely free — it is our way of giving back to the community. To learn how to host your project with us, please check out the <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">HOSTING YOUR PROJECT</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    さらによくある質問については、こちらをご覧ください。 <router-link :to="{path: '/faqs/faqs.html'}">FAQ</router-link> ページ    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>カスタムチェーンと統合しますか？</h5>
        <p>Whether you're building a new parachain or an entirely new blockchain on Substrate — SubQuery can help you index and troubleshoot your chain's data. SubQuery は Substrate ベースのカスタムチェーンと簡単に統合できるように設計されています。</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.html#custom-substrate-and-cosmos-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>サポートと貢献</h5>
        <p>Have a question or are interested in knowing more or how you can contribute? ご連絡をお待ちしています！ 以下のリンクからメールまたはソーシャルメディアでお問い合わせください。 技術的専門知識が必要ですか？ Discordコミュニティに参加して、情熱的なコミュニティメンバーからサポートを受けてください。 </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">Discordで会話に参加</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>お問い合わせ</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>ソーシャルメディアでフォロー</div>
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
