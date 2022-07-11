<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Herzlich Willkommen bei SubQuery <span> Academy </span></h2>
        <p>Untersuchen und transformieren Sie Ihre Chain-Daten, um schneller intuitive dApps zu erstellen!</p>
        <p><strong>SubQuery unterstützt jetzt Polkadot, Avalanche und Cosmos (beginnend mit Juno)</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Schnellstart <span>Anleitung</span></h2>
      <p>Verstehen Sie SubQuery, indem Sie sich an einem traditionellen „Hello World“-Beispiel orientieren. Mit einem Vorlagenprojekt in einer Docker-Umgebung können Sie schnell eine Node zum Laufen bringen und mit ein paar einfachen Befehlen in nur wenigen Minuten mit der Abfrage einer Blockchain beginnen.
      </p>
      <span class="button">
        <router-link :to="{path: '/quickstart/quickstart.html'}"> 
          <span>Get started</span>
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
            <span>Anleitungen und Beispiele</span>
            <p>Lernen durch Tun in unserer Academy. Tutorials und Beispiele zum Erstellen verschiedener SubQuery Projekte.           </p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/build/introduction.html'}"> 
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Technische ReferenzDocs</span>
            <p>Verfasst von Entwicklern für Entwickler. Finden Sie, was Sie brauchen, um schnell tolle dApps zu erstellen.</p>
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
        <div class="title">Was ist SubQuery?</div>
        <div class="content">
          <p>SubQuery ist ein Open-Source-Projekt, das es Entwicklern ermöglicht, Substratkettendaten zu indizieren, umzuwandeln und abzufragen, um ihre Anwendungen zu unterstützen.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.md#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Was ist der beste Weg, um mit SubQuery zu beginnen?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start tutorial</a>. Dies ist eine einfache 5-minütige Anleitung zum Herunterladen der Startvorlage, zum Erstellen des Projekts und dann zum Ausführen einer Node auf Ihrem lokalen Host mit Docker und zum Ausführen einer einfachen Abfrage. </p>
        </div>
      </li>
      <li>
        <div class="title">Wie kann ich zu SubQuery beitragen oder Feedback geben?</div>
        <div class="content">
          <p>Wir lieben Beiträge und Feedback aus der Community. Um Code beizutragen, verzweigen Sie das gewünschte Repository und nehmen Sie Ihre Änderungen vor. Senden Sie dann einen PR- oder Pull-Request. Oh, vergessen Sie nicht, auch zu testen! Sehen Sie sich auch unsere Beitragsrichtlinien an (demnächst verfügbar). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.md#how-can-i-contribute-or-give-feedback-to-subquery'}">READ MORE</router-link>
          </span> 
        </div>
      </li>
      <li>
        <div class="title">Wie viel kostet es, mein Projekt in SubQuery Projects zu hosten?</div>
        <div class="content">
          <p>Das Hosten Ihres Projekts in SubQuery Projects ist absolut kostenlos – es ist unsere Art, der Community etwas zurückzugeben. To learn how to host your project with us, please check out the <a href="https://academy.subquery.network/run_publish/publish.html">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">HOST IHRES PROJEKTS</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Für weitere häufig gestellte Fragen sehen Sie bitte unsere <router-link :to="{path: '/faqs/faqs.html'}">FAQ's</router-link> Seite.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Integration in Ihre Custom-Chain?</h5>
        <p>Egal, ob Sie eine neue Parachain oder eine völlig neue Blockchain auf Substrate aufbauen – SubQuery kann Ihnen dabei helfen, die Daten Ihrer Chain zu indizieren und Fehler zu beheben. SubQuery ist so konzipiert, dass es sich einfach in eine benutzerdefinierte substratbasierte Chain integrieren lässt.</p>
        <span class="more">
          <router-link :to="{path: '/build/manifest.md#custom-substrate-and-cosmos-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Unterstützen und beitragen</h5>
        <p>Haben Sie eine Frage oder möchten Sie mehr erfahren oder wie Sie einen Beitrag leisten können? Wir würden uns freuen, von dir zu hören. Bitte kontaktieren Sie uns per E-Mail oder Social Media über die untenstehenden Links. Benötigen Sie technisches Know-how? Treten Sie unserer Discord-Community bei und erhalten Sie Unterstützung von unseren leidenschaftlichen Community-Mitgliedern. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">NEHMEN SIE AN DER GESPRÄCH AUF DISCORD BEI</a>
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
