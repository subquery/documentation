<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Welcome to SubQuery <span>Academy</span></h2>
        <p>Изследвайте и трансформирайте вашите блокчейн данни, за да изградите по-бързо интуитивни dApps!</p>
        <p><strong>SubQuery now supports Polkadot, Avalanche, and Cosmos (starting with Juno)</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title"><span>Ръководство </span>за бързо стартиране</h2>
      <p>Разберете относно SubQuery, като се заемете с традиционният пример с Hello World. Използвайки шаблонен проект в Docker среда, можете бързо да стартирате нода и да започнете да заявявате данни от блокчейна, само за няколко минути с няколко прости команди.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart-polkadot.html'}">
          <span>Започнете</span>
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
            <span>Уроци и примери</span>
            <p>Учене чрез практика в нашата академия. Уроци и примери за това как да изграждате различни проекти в SubQuery.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction.html'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Техническа документация</span>
            <p>Написана от разработчици за разработчици. Намерете това, от което се нуждаете, за бързо създаване на страхотни dApp/ приложения.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>Мрежата на SubQuery</span>
            <p>Децентрализираното бъдеще на SubQuery. Прочетете повече относно начините за възнаграждаване на индексатори и потребители.</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</div>
<section class="faqSection main">
  <div>
    <h2 class="title">FAQ</h2>
    <ul class="faqList">
      <li>
        <div class="title">Какво е SubQuery?</div>
        <div class="content">
          <p>SubQuery е проект с отворен код, позволяващ на разработчиците да индексират, трансформират и заявяват блокчейн данни от Substrate, за стартиране на своите приложения.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">ПРОЧЕТЕТЕ ПОВЕЧЕ</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Кой е най-добрият начин да стартирате работа със SubQuery?</div>
        <div class="content">
          <p>Най-добрият начин да започнете със SubQuery е да пробвате нашият <a href="/quickstart/quickstart-polkadot.html">Quick Start ръководство</a>. Това е лесно 5-минутно ръководство за изтегляне на стартовия шаблон, изграждане на проекта и след това използване на Docker за стартиране на нода на вашия локален хост и изпълнение на проста заявка. </p>
        </div>
      </li>
      <li>
        <div class="title">По какъв начин мога да допринеса или да дам обратна връзка към SubQuery?</div>
        <div class="content">
          <p>Ние харесваме приноса и обратната връзка от общността. За да съдействате с код - форкнете хранилището, което ви интересува, и направете своите промени. След това изпратете PR или Pull Request. О, и не забравяйте да тествате също! Вижте и нашите препоръки за принос към проекта (очаквайте скоро). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-the-best-way-to-get-started-with-subquery'}">ПРОЧЕТЕТЕ ПОВЕЧЕ</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Колко струва хостването на моя проект в SubQuery Projects?</div>
        <div class="content">
          <p>Хостването на вашия проект в SubQuery Projects е абсолютно безплатно - това е нашият начин да се отблагодарим на общността. За да научите как да хоствате вашия проект при нас, моля, вижте<a href="/quickstart/quickstart-polkadot.html">Hello World (SubQuery Hosted)</a> ръководство.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">ХОСТВАНЕ НА ВАШИЯ ПРОЕКТ </router-link>
          </span>
        </div>
      </li>
    </ul><br>
    За допълнителни често задавани въпроси, моля, вижте нашата секция <router-link :to="{path: '/faqs/faqs.html'}">FAQ</router-link> страница    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Интегриране с вашия персонален блокчейн?</h5>
        <p>Независимо дали изграждате нов парачейн или изцяло нов блокчейн на Substrate, SubQuery може да ви помогне да индексирате и отстранявате неизправности в данните му. SubQuery е проектиран да се интегрира лесно с персонализирани вериги, базирани на Substrate.</p>
        <span class="more">
          <router-link :to="{path: '/create/manifest.html#custom-substrate-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Подкрепете и допринасяйте</h5>
        <p>Имате въпрос или се интересувате да научите повече, или пък как можете да допринесете към проекта? Ще се радваме да чуем от вас. Моля, свържете се с нас чрез имейл или чрез социални медии от линковете по-долу. Нуждаете се от техническа поддръжка? Присъединете се към нашата Discord общност и получете подкрепа от нашите отдадени членове на общността. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">ПРИСЪЕДИНЕТЕ СЕ В ОБЩНОСТТА В DISCORD</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Свържете се с нас</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Следвайте ни в социалните мрежи</div>
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
