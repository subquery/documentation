<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Herzlich Willkommen bei den <span>Dokumenten</span> von SubQuery</h2>
        <p>Untersuchen und transformieren Sie Ihre Chain-Daten, um schneller intuitive dApps zu erstellen!</p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Schnellstart <span>Anleitung</span></h2>
      <p>Verstehen Sie SubQuery, indem Sie sich an einem traditionellen „Hello World“-Beispiel orientieren. Mit einem Vorlagenprojekt in einer Docker-Umgebung können Sie schnell eine Node zum Laufen bringen und mit ein paar einfachen Befehlen in nur wenigen Minuten mit der Abfrage einer Blockchain beginnen.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/helloworld-localhost/'}">
           <span>Loslegen</span>
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
            <span>Anleitungen und Beispiele</span>
            <p>Übung macht den Meister. Tutorials und Beispiele zum Erstellen verschiedener SubQuery Projekte.           </p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction/'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Technische ReferenzDocs</span>
            <p>Verfasst von Entwicklern für Entwickler. Finden Sie, was Sie brauchen, um schnell tolle dApps zu erstellen.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
             <img src="/assets/img/networkIcon.svg" />
             <span>Das SubQuery-Netzwerk</span>
             <p>Die dezentrale Zukunft von SubQuery. Lesen Sie mehr darüber, wie Indexer und Verbraucher belohnt werden.</p>
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
        <div class="title">Was ist SubQuery?</div>
        <div class="content">
          <p>SubQuery ist ein Open-Source-Projekt, das es Entwicklern ermöglicht, Substratkettendaten zu indizieren, umzuwandeln und abzufragen, um ihre Anwendungen zu unterstützen.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-subquery'}">MEHR LESEN</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Was ist der beste Weg, um mit SubQuery zu beginnen?</div>
        <div class="content">
          <p>Der beste Weg, mit der Unterabfrage loszulegen, ist unser <a href="/quickstart/helloworld-localhost/">Hallo World Tutorial</a> auszuprobieren. This is a simple 5 min walk through of downloading the starter template, building the project, and then using Docker to run a node on your localhost and running a simple query. </p>
        </div>
      </li>
      <li>
        <div class="title">How can I contribute or give feedback to SubQuery?</div>
        <div class="content">
          <p>We love contributions and feedback from the community. To contribute code, fork the repository of interest and make your changes. Then submit a PR or Pull Request. Oh, don't forget to test as well! Sehen Sie sich auch unsere Beitragsrichtlinien an (demnächst). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs/#what-is-the-best-way-to-get-started-with-subquery'}">MEHR LESEN</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">How much does it cost to host my project in SubQuery Projects?</div>
        <div class="content">
          <p>Hosting your project in SubQuery Projects is absolutely free - it's is our way of giving back to the community. Um zu erfahren, wie Sie Ihr Projekt bei uns hosten, lesen Sie bitte das Tutorial <a href="/quickstart/helloworld-hosted/">Hello World (SubQuery Hosted)</a>.</p>
          <span class="more">
            <router-link :to="{path: '/publish/publish/'}">HOSTING IHRES PROJEKTS</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Für weitere häufig gestellte Fragen sehen Sie bitte unsere <router-link :to="{path: '/faqs/faqs/'}">FAQ's</router-link> Seite verfolgen.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Integration in Ihre benutzerdefinierte Kette?</h5>
        <p>Egal, ob Sie eine neue Parachain oder eine völlig neue Blockchain auf Substrate erstellen – SubQuery kann Ihnen helfen, die Daten Ihrer Kette zu indizieren und Fehler zu beheben. SubQuery wurde für die einfache Integration in eine benutzerdefinierte, auf Substraten basierende Kette entwickelt.</p>
        <span class="more">
          ERFAHREN SIE, WIE SIE IHRE KETTE INTEGRIERN KÖNNEN
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Unterstützen und beitragen</h5>
        <p>Haben Sie eine Frage oder möchten Sie mehr wissen oder wie Sie dazu beitragen können? Wir würden uns freuen, von dir zu hören. Bitte kontaktieren Sie uns per E-Mail oder Social Media über die untenstehenden Links. Benötigen Sie technische Expertise? Treten Sie unserer Discord-Community bei und erhalten Sie Unterstützung von unseren leidenschaftlichen Community-Mitgliedern. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/78zg8aBSMG">TEILNEHMEN DEM GESPRÄCH AUF DISCORD</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Kontaktieren Sie uns</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Folgen Sie uns in den sozialen Netzwerken</div>
    <div class="connectWay">
      <a href="https://discord.com/invite/78zg8aBSMG" target="_blank" class="connectDiscord">discord</a>
      <a href="https://twitter.com/subquerynetwork" target="_blank" class="connectTwitter">twitter</a>
      <a href="https://medium.com/@subquery" target="_blank" class="connectMedium">medium</a>
      <a href="https://t.me/subquerynetwork" target="_blank" class="connectTelegram">telegramm</a>
      <a href="https://github.com/OnFinality-io/subql" target="_blank" class="connectGithub">github</a>
      <a href="https://matrix.to/#/#subquery:matrix.org" target="_blank" class="connectMatrix">Matrix</a>
      <a href="https://www.linkedin.com/company/subquery" target="_blank" class="connectLinkedin">linkedin</a>
    </div>
  </div>
</section>
</div> </div>
<div class="footer">
  <div class="main"><div>SubQuery © 2021</div></div>
</div>
<script charset="utf-8" src="/assets/js/welcome.js"></script>
