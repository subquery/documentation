<link rel="stylesheet" href="/assets/style/welcome.css" as="style" />
<div class="top2Sections">
  <section class="welcomeWords">
    <div class="main">
      <div>
        <h2 class="welcomeTitle">Welcome to SubQuery <span>University</span></h2>
        <p>Esplora e trasforma i dati della catena per creare dApps intuitivi più velocemente!</p>
        <p><strong>SubQuery now supports both Polkadot and Avalanche</strong></p>
      </div>
    </div>
  </section>
  <section class="startSection main">
    <div>
      <h2 class="title">Guida Introduttiva</h2>
      <p>Comprendere la SubQuery mettendo mano a un esempio tradizionale di Hello World. Utilizzando un progetto modello in un ambiente Docker, è possibile attivare rapidamente un nodo e iniziare a interrogare una blockchain in pochi minuti con alcuni semplici comandi. Utilizzando un progetto modello in un ambiente Docker, è possibile attivare rapidamente un nodo e iniziare a interrogare una blockchain in pochi minuti con alcuni semplici comandi.
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
            <span>Esercitazioni ed esempi</span>
            <p>Learning by doing in our Academy. Esercitazioni ed esempi su come creare vari progetti SubQuery.</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/create/introduction.html'}">
          <div>
            <img src="/assets/img/docsIcon.svg" />
            <span>Documenti di riferimento tecnico</span>
            <p>Scritto dagli sviluppatori per gli sviluppatori. Trova ciò di cui hai bisogno per costruire dapps impressionanti rapidamente.</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="https://static.subquery.network/whitepaper.pdf" target="_blank">
          <div>
            <img src="/assets/img/networkIcon.svg" />
            <span>The SubQuery Network</span>
            <p>SubQuery’s decentralised future. Per saperne di più su come gli indicizzatori e i consumatori vengono premiati.
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
        <div class="title">Cos'è SubQuery?</div>
        <div class="content">
          <p>SubQuery è un progetto open source che consente agli sviluppatori di indicizzare, trasformare e interrogare i dati della catena di substrati per ottimizzare le applicazioni.</p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Qual è il modo migliore per iniziare con SubQuery?</div>
        <div class="content">
          <p>The best way to get started with SubQuery is to try out our <a href="/quickstart/quickstart.html">Quick Start tutorial</a>. Questo è un semplice 5 min passeggiata attraverso il download del modello di avvio, la costruzione del progetto, e poi utilizzando Docker per eseguire un nodo sul vostro localhost ed eseguire una semplice query. </p>
        </div>
      </li>
      <li>
        <div class="title">Come posso contribuire o fornire feedback a SubQuery?</div>
        <div class="content">
          <p>Amiamo i contributi e il feedback della comunità. Per contribuire al codice, forgiare il repository di interesse e apportare le modifiche desiderate. Quindi inviate una PR o una richiesta di estrazione. Oh, non dimenticare di fare il test pure! Controlla anche le nostre linee guida sui contributi (in arrivo a breve). </p>
          <span class="more">
            <router-link :to="{path: '/faqs/faqs.html#what-is-the-best-way-to-get-started-with-subquery'}">READ MORE</router-link>
          </span>
        </div>
      </li>
      <li>
        <div class="title">Quanto costa ospitare il progetto in Progetti SubQuery?
</div>
        <div class="content">
          <p>Ospitare il tuo progetto in SubQuery Projects è assolutamente gratuito - è il nostro modo di restituire alla comunità. To learn how to host your project with us, please check out the <a href="/quickstart/quickstart.html">Hello World (SubQuery Hosted)</a> tutorial.</p>
          <span class="more">
            <router-link :to="{path: '/run_publish/publish.html'}">HOSTING YOUR PROJECT</router-link>
          </span>
        </div>
      </li>
    </ul><br>
    Per ulteriori domande frequenti, consulta il nostro <router-link :to="{path: '/faqs/faqs.html'}">FAQs</router-link> pagina.    
  </div>
</section>
<section class="main">
  <div>
    <div class="lastIntroduce lastIntroduce_1">
        <h5>Integrazione con la tua catena personalizzata?</h5>
        <p>Che tu stia costruendo una nuova paracadute o una blockchain completamente nuova su Substrate - SubQuery può aiutarti a indicizzare e risolvere i dati della tua catena. SubQuery è progettato per integrarsi facilmente con una catena personalizzata basata su substrato.</p>
        <span class="more">
          <router-link :to="{path: '/create/mapping.html#custom-substrate-chains'}">LEARN HOW TO INTEGRATE WITH YOUR CHAIN</router-link>
        </span>
    </div>
    <div class="lastIntroduce lastIntroduce_2">
        <h5>Supporta, contribuisci</h5>
        <p>Avete una domanda o siete interessati a sapere di più o come potete contribuire? Gradiremmo sapere cosa ne pensi! Vi preghiamo di contattarci via e-mail o social media dai link qui sotto. Hai bisogno di competenze tecniche? Unitevi alla nostra comunità Discord e ricevete il supporto dei nostri appassionati membri della comunità. </p>
        <a class="more" target="_blank" href="https://discord.com/invite/subquery">ISCRIVITI ALLA CONVERSAZIONE SULLA DISCORDA</a>
    </div>
    </div>
</section>
<section class="main connectSection">
  <div class="email">
    <span>Contattaci</span>
    <a href="mailto:hello@subquery.network">hello@subquery.network</a>
  </div>
  <div>
    <div>Seguimi sui social:</div>
    <div class="connectWay">
      <a href="https://discord.com/invite/78zg8aBSMG" target="_blank" class="connectDiscord">discord</a>
      <a href="https://twitter.com/subquerynetwork" target="_blank" class="connectTwitter">twitter</a>
      <a href="https://medium.com/@subquery" target="_blank" class="connectMedium">medium</a>
      <a href="https://t.me/subquerynetwork" target="_blank" class="connectTelegram">telegramma</a>
      <a href="https://github.com/OnFinality-io/subql" target="_blank" class="connectGithub">github</a>
      <a href="https://matrix.to/#/#subquery:matrix.org" target="_blank" class="connectMatrix">matrice</a>
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
