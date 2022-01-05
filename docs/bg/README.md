<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Добре дошли в <span>Документите </span> на SubQuery</h2>
        <p>Изследвайте и трансформирайте вашите блокчейн данни, за да изградите по-бързо интуитивни dApps!</p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title"><span>Ръководство </span>за бързо стартиране</h2>
      <p>Разберете SubQuery, като се заемете с традиционният пример с Hello World. Използвайки шаблонен проект в Docker среда, можете бързо да стартирате нод и да започнете да заявявате данни от блокчейна, само за няколко минути с няколко прости команди.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/helloworld-localhost/'}">
          <span>Първи стъпки</span>
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
            <span>Уроци и примери</span>
            <p>Учене чрез правене. Уроци и примери за това как да изграждате различни проекти на SubQuery.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction/'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Технически референтни документи</span>
            <p>Написани от разработчици за разработчици. Намерете това, от което се нуждаете, за да създавате бързо, страхотни dApp.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>Мрежата на SubQuery</span>
            <p>Децентрализираното бъдеще на SubQuery. Прочетете повече за това как се възнаграждават индексаторите и потребителите.</p>
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
          <p>SubQuery е проект с отворен код, който позволява на разработчиците да индексират, трансформират и заявяват блокчейн данни от Substrate, за да захранват своите приложения.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-subquery'}">ПРОЧЕТЕТЕ ОЩЕ</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Кой е най-добрият начин да стартирате със SubQuery?</div>
        <div class="content">
          <p>Най-добрият начин да започнете със SubQuery е да изпробвате нашия <a href="/quickstart/helloworld-localhost/">Hello World урок</a>. Това е проста 5-минутна разходка за изтегляне на стартовия шаблон, изграждане на проекта и след това използване на Docker за стартиране на нод на вашия локален хост и изпълнение на проста заявка. </p>
        </div>
      </li>
      <li>
        <div class="title">Как мога да допринеса или да дам обратна връзка към SubQuery?</div>
        <div class="content">
          <p>Обичаме приноса и обратната връзка от общността. За да допринесете с код - форкнете хранилището, което ви интересува, и направете своите промени. След това изпратете PR или Pull Request. О, не забравяйте да тествате също! Вижте и нашите насоки за принос (очаквайте скоро). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-the-best-way-to-get-started-with-subquery'}">ПРОЧЕТЕТЕ ОЩЕ</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Колко струва хостването на моя проект в SubQuery Projects?</div>
        <div class="content">
          <p>Хостването на вашия проект в SubQuery Projects е абсолютно безплатно - това е нашият начин да се отблагодарим на общността. За да научите как да хоствате вашия проект при нас, моля, разгледайте урока <a href="/quickstart/helloworld-hosted/">Hello World (Хостван от SubQuery)</a>.</p>
          <span class="more">
            <router-link :to="{path: '/publish/publish/'}">ХОСТИВАНЕ НА ВАШИЯ ПРОЕКТ </router-link>
          </span>
        </div>
      </li>
    </ul><br>
    За допълнителни често задавани въпроси, моля, вижте нашата <router-link :to="{path: '/faqs/faqs/'}">FAQ</router-link> страница.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Интегриране с вашия персонален блокчейн?</h5>
        <p>Независимо дали изграждате нов парачейн или изцяло нов блокчейн на Substrate, SubQuery може да ви помогне да индексирате и отстранявате неизправности в данните му. SubQuery е проектиран да се интегрира лесно с персонализирана верига, базирана на Substrate.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping/#custom-substrate-chains'}">НАУЧЕТЕ КАК ДА ИНТЕГРИРАТЕ ВАШАТА ВЕРИГА</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Подкрепете и допринасяйте</h5>
        <p>Имате въпрос или се интересувате да научите повече, или пък как можете да допринесете? Ще се радваме да чуем от вас. Моля, свържете се с нас чрез имейл или социални медии от връзките по-долу. Нуждаете се от техническа експертиза? Присъединете се към нашата Discord общност и получете подкрепа от нашите отдадени членове на общността. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/78zg8aBSMG">ПРИСЪЕДИНЕТЕ СЕ В РАЗГОВОРА В DISCORD</a>
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
  <div class="main"><div>SubQuery © 2021</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
