<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Ласкаво просимо до SubQuery <span>Університеті</span></h2>
        <p>Досліджуйте та перетворюйте свої ланцюгові дані, щоб швидше створювати інтуїтивні dApp!</p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Швидкий старт <span> Посібник </span></h2>
      <p>Зрозумійте SubQuery, взявши участь у традиційному прикладі Hello World. Використовуючи проект шаблону в середовищі Docker, ви можете швидко запустити і запустити вузол і почати запитувати блокчейн всього за кілька хвилин за допомогою декількох простих команд.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/helloworld-localhost/'}">
          <span>почати</span>
        </router-link>
      </span>
    </div>
  </section>
</div>
<div class="main">
  <div>
    <ul class="list">
      <li>
        <router-link :to="{path: '/academy/tutorials_examples/introduction/'}">
          <div>
            <img src="/assets/img/tutorialsIcon.svg" />
            <span>Підручники та приклади</span>
            <p>Навчання шляхом роботи. Підручники та приклади, як будувати різні проекти підзапиту.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction/'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Технічні довідкові документи</span>
            <p>Автор розробників для розробників. Знайдіть, що потрібно для швидкого створення дивовижних dApps.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>The SubQuery Network</span>
            <p>SubQuery’s decentralised future. Детальніше про те, як винагороджуються індексатори та споживачі.</p>
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
        <div class="title">Що таке SubQuery?</div>
        <div class="content">
          <p>SubQuery - це проект з відкритим кодом, який дозволяє розробникам індексувати, трансформувати та запитувати дані ланцюгів Substrate для живлення своїх програм.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-subquery'}">ПРОЧИТАТИ БІЛЬШЕ</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Який найкращий спосіб розпочати роботу з SubQuery?</div>
        <div class="content">
          <p>Найкращий спосіб розпочати роботу з SubQuery - це спробувати наш підручник <a href="/quickstart/helloworld-localhost/"> Hello World </a>. Це простий 5 хвилин ходьби від завантаження шаблону для початківців, побудови проекту, а потім використання Docker для запуску вузла на локальному хості та запуску простого запиту. </p>
        </div>
      </li>
      <li>
        <div class="title">Як я можу внести або надати відгуки на SubQuery?</div>
        <div class="content">
          <p>Ми любимо внески та відгуки громади. Щоб внести код, розщепіть сховище, що цікавить, і внесіть свої зміни. Сформуйте PR або Pull Request. О, також не забудьте його протестувати! Також ознайомтеся з нашими рекомендаціями щодо внесків (незабаром). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-the-best-way-to-get-started-with-subquery'}">ПРОЧИТАТИ БІЛЬШЕ</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Скільки коштує розміщення мого проекту в проектах SubQuery?</div>
        <div class="content">
          <p>Розміщення вашого проекту в проектах SubQuery абсолютно безкоштовне - це наш спосіб повернути спільноту. Щоб дізнатися, як приймати ваш проект у нас, перегляньте підручник <a href="/quickstart/helloworld-hosted/"> Hello World (SubQuery Hosted) </a>.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish/'}"> ПОДАЧАЙТЕ СВОЙ ПРОЕКТ </router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Для подальших часто заданих питань, будь ласка, дивіться наші <router-link :to="{path: '/faqs/faqs/'}">FAQ's</router-link> сторінка    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Інтеграція зі своїм користувальницьким ланцюгом?</h5>
        <p>Незалежно від того, чи будуєте ви новий парашайн або абсолютно новий блокчейн на Substrate - SubQuery, ви можете допомогти вам індексувати та усунути неполадки даних вашої мережі. SubQuery призначений для легкої інтеграції зі спеціальною ланцюжком на основі Substrate.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping/#custom-substrate-chains'}"> ЗАВДАННЯ, ЯК ІНТЕГРАТУВАТИ СВОЮ КЛАСУ </router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Підтримка та внесок</h5>
        <p>Майте запитання або хочете дізнатися більше або як ви можете зробити свій внесок? Нам важлива Ваша думка! Будь ласка, зв'яжіться з нами електронною поштою або соціальними мережами за посиланнями нижче. Потрібна технічна експертиза? Приєднуйтесь до нашої спільноти Discord та отримуйте підтримку від наших пристрасних членів громади. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/78zg8aBSMG">ПРИЄДНАЙТЕСЬ ДО КОНВЕРСАЦІЇ НА DISCORD</a>
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
      <a href="https://www.linkedin.com/company/subquery" target="_blank" class="connectLinkedin">linkedin</a>
    </div>
  </div>
</section>
</div> </div>
<div class="footer">
  <div class="main"><div>SubQuery © 2021</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
