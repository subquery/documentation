# Pubblica il tuo progetto SubQuery

## Vantaggi di ospitare il tuo progetto con SubQuery
- Eseguiremo i tuoi progetti SubQuery per te in un servizio pubblico ad alte prestazioni, scalabile e gestito
- Questo servizio viene fornito alla comunità gratuitamente!
- Puoi rendere i tuoi progetti pubblici in modo che siano elencati nel [SubQuery Explorer](https://explorer.subquery.network) e chiunque nel mondo possa vederli
- Siamo integrati con GitHub, quindi chiunque nelle tue organizzazioni GitHub sarà in grado di visualizzare i progetti condivisi dell'organizzazione

## Crea il tuo primo progetto

#### Accesso ai progetti SubQuery

Prima di iniziare, assicurati che il tuo progetto SubQuery sia online in un repository GitHub pubblico. Il file `schema.graphql` deve essere nella radice della vostra directory.

Per creare il tuo primo progetto, vai a [progetto.subquery.network](https://project.subquery.network). Dovrai autenticarti con il tuo account GitHub per accedere.

Al primo accesso, ti verrà chiesto di autorizzare SubQuery. Abbiamo bisogno solo del tuo indirizzo email per identificare il tuo account, e non usiamo nessun altro dato dal tuo account GitHub per altre ragioni. In questo passo, puoi anche richiedere o concedere l'accesso al tuo account GitHub Organization in modo da poter pubblicare i progetti SubQuery sotto la tua GitHub Organization invece del tuo account personale.

![Revocare l'approvazione di un account GitHub](/assets/img/project_auth_request.png)

SubQuery Projects è dove gestisci tutti i tuoi progetti ospitati caricati sulla piattaforma SubQuery. È possibile creare, eliminare e persino aggiornare i progetti da questa applicazione.

![Accesso ai progetti](/assets/img/projects-dashboard.png)

Se hai un account dell'organizzazione GitHub collegato, puoi usare il selettore sull'intestazione per passare dal tuo account personale a quello dell'organizzazione GitHub. I progetti creati in un account dell'organizzazione GitHub sono condivisi tra i membri di quell'organizzazione GitHub. Per collegare il tuo account GitHub Organization, puoi [seguire i passi qui](#add-github-organization-account-to-subquery-projects).

![Passare da un account GitHub all'altro](/assets/img/projects-account-switcher.png)

#### Crea il tuo primo progetto

Cominciamo cliccando su "Create Project". Sarai portato al modulo Nuovo progetto. Inserisci i seguenti dati (puoi cambiarli in futuro):
- **Account GitHub:** Se hai più di un account GitHub, seleziona con quale account sarà creato questo progetto. I progetti creati in un account dell'organizzazione GitHub sono condivisi tra i membri di quell'organizzazione.
- **Nome**
- **Sottotitolo**
- **Descrizione**
- **GitHub Repository URL:** Questo deve essere un URL GitHub valido per un repository pubblico che ha il tuo progetto SubQuery. Il file `schema.graphql` deve essere nella root della tua directory ([imparare di più sulla struttura delle directory](../create/introduction.md#directory-structure)).
- **Nascondi progetto:** Se selezionato, questo nasconderà il progetto dall'esploratore pubblico di SubQuery. Tieni questo non selezionato se vuoi condividere la tua SubQuery con la comunità! ![Crea il tuo primo progetto](/assets/img/projects-create.png)

Crea il tuo progetto e lo vedrai nella lista del tuo progetto SubQuery. *Ci siamo quasi! Abbiamo solo bisogno di distribuire una nuova versione di esso.*

![Progetto creato senza distribuzione](/assets/img/projects-no-deployment.png)

#### Distribuisci la tua prima versione

Mentre la creazione di un progetto imposterà il comportamento di visualizzazione del progetto, è necessario distribuire una versione di esso prima che diventi operativo. Il deploy di una versione innesca una nuova operazione di indicizzazione SubQuery per iniziare, e imposta il servizio di query richiesto per iniziare ad accettare le richieste GraphQL. Qui puoi anche distribuire nuove versioni a progetti esistenti.

Con il tuo nuovo progetto, vedrai un pulsante Deploy New Version. Fai clic su questo e compila le informazioni richieste sull'installazione:
- **Commit Hash della nuova versione:** Da GitHub, copia l'hash completo di commit della versione del codice del tuo progetto SubQuery che vuoi distribuire
- **Indexer Version:** Questa è la versione del servizio del nodo di SubQuery su cui si vuole eseguire questa SubQuery. Vedere [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Questa è la versione del servizio di query di SubQuery su cui si vuole eseguire questa SubQuery. Vedere [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Distribuisci il tuo primo progetto](https://static.subquery.network/media/projects/projects-first-deployment.png)

Se distribuito con successo, vedrai l'indicizzatore iniziare a lavorare e riferire il progresso dell'indicizzazione della catena corrente. Questo processo può richiedere tempo fino a raggiungere il 100%.

## Passi successivi - Collegati al tuo progetto
Una volta che il tuo deployment è stato completato con successo e i nostri nodi hanno indicizzato i tuoi dati dalla catena, sarai in grado di connetterti al tuo progetto tramite l'endpoint GraphQL Query visualizzato.

![Progetto distribuito e sincronizzato](/assets/img/projects-deploy-sync.png)

In alternativa, puoi cliccare sui tre puntini accanto al titolo del tuo progetto e visualizzarlo su SubQuery Explorer. Lì puoi usare il parco giochi in-browser per iniziare - [leggi di più su come usare il nostro Explorer qui](../query/query.md).

![Progetti nell'esploratore di subquery](/assets/img/projects-explorer.png)

## Aggiungere l'account dell'organizzazione GitHub ai progetti SubQuery

È comune pubblicare il tuo progetto SubQuery sotto il nome del tuo account GitHub Organization piuttosto che il tuo account GitHub personale. In qualsiasi momento puoi cambiare il tuo account attualmente selezionato su [Progetti SubQuery](https://project.subquery.network) usando il selettore di account.

![Passare da un account GitHub all'altro](/assets/img/projects-account-switcher.png)

Se non riesci a vedere il tuo account dell'organizzazione GitHub elencato nello switcher, potrebbe essere necessario concedere l'accesso a SubQuery per la tua organizzazione GitHub (o richiederlo a un amministratore). Per fare questo, devi prima revocare i permessi dal tuo account GitHub all'applicazione SubQuery. Per farlo, accedi alle impostazioni del tuo account su GitHub, vai su Applicazioni, e sotto la scheda Applicazioni autorizzate OAuth, revoca SubQuery - [Puoi seguire i passi esatti qui](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Non preoccuparti, questo non cancellerà il tuo progetto SubQuery e non perderai nessun dato.**

![Revocare l'accesso all'account GitHub](/assets/img/project_auth_revoke.png)

Una volta che hai revocato l'accesso, esci da [Progetti SubQuery](https://project.subquery.network) e accedi di nuovo. Dovresti essere reindirizzato ad una pagina intitolata *Autorizza SubQuery* dove puoi richiedere o concedere l'accesso di SubQuery al tuo account GitHub Organization. Se non hai i permessi di amministratore, devi fare una richiesta per un amministratore che lo abiliti per te.

![Revoke approval of a GitHub account](/assets/img/project_auth_request.png)

Una volta che questa richiesta è stata approvata dal tuo amministratore (o se sei in grado di concederla tu stesso), vedrai l'account GitHub Organization corretto nel commutatore di account.
