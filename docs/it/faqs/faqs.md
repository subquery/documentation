# Domande frequenti

## Cos'è SubQuery?

SubQuery è un progetto open source che permette agli sviluppatori di indicizzare, trasformare e interrogare i dati della catena Substrate per alimentare le loro applicazioni.

SubQuery fornisce anche l'hosting gratuito di progetti di produzione per gli sviluppatori, eliminando la responsabilità di gestire l'infrastruttura e lasciando che gli sviluppatori facciano ciò che sanno fare meglio: costruire.

## Qual è il modo migliore per iniziare con SubQuery?

Il modo migliore per iniziare con SubQuery è provare il nostro [tutorial Ciao Mondo](../quickstart/helloworld-localhost.md). Questa è una semplice passeggiata di 5 minuti per scaricare il modello iniziale, costruire il progetto e poi usare Docker per eseguire un nodo sul tuo localhost ed eseguire una semplice query.

## Come posso contribuire o dare un feedback a SubQuery?

Amiamo i contributi e i feedback della comunità. Per contribuire al codice, fai un fork del repository di interesse e apporta le tue modifiche. Poi invia un PR o una Pull Request. Oh, non dimenticare di fare anche dei test! Controlla anche le nostre linee guida sui contributi (TBA).

Per dare un feedback, contattateci a hello@subquery.network o saltate sul nostro [canale discord](https://discord.com/invite/78zg8aBSMG)

## Quanto costa ospitare il mio progetto in SubQuery Projects?

Ospitare il tuo progetto in SubQuery Projects è assolutamente gratuito - è il nostro modo di restituire alla comunità. Per imparare come ospitare il tuo progetto con noi, controlla il tutorial [Hello World (SubQuery hosted)](../quickstart/helloworld-hosted.md).

## Cosa sono gli slot di distribuzione?

Gli slot di distribuzione sono una caratteristica dei [progetti SubQuery](https://project.subquery.network) che è l'equivalente di un ambiente di sviluppo. Per esempio, in qualsiasi organizzazione di software c'è normalmente un ambiente di sviluppo e un ambiente di produzione come minimo (ignorando localhost che è). Di solito sono inclusi ambienti aggiuntivi come staging e pre-prod o anche QA, a seconda delle esigenze dell'organizzazione e del loro set up di sviluppo.

SubQuery ha attualmente due slot disponibili. Uno slot di messa in scena e uno slot di produzione. Questo permette agli sviluppatori di distribuire la loro SubQuery nell'ambiente di staging e, se tutto va bene, "promuovere in produzione" con un clic di un pulsante.

## Qual è il vantaggio di uno slot di messa in scena?

Il vantaggio principale dell'uso di uno slot di staging è che ti permette di preparare una nuova release del tuo progetto SubQuery senza esporlo pubblicamente. Puoi aspettare che lo slot di staging reindicizzi tutti i dati senza influenzare le tue applicazioni di produzione.

Lo slot di staging non è mostrato al pubblico nell'[Explorer](https://explorer.subquery.network/) e ha un URL unico che è visibile solo a te. E naturalmente, l'ambiente separato vi permette di testare il vostro nuovo codice senza influenzare la produzione.

## What are Polkadot's Extrinsics?

Se avete già familiarità con i concetti di blockchain, potete pensare alle estrinsecazioni come paragonabili alle transazioni. Più formalmente, però, un estrinseco è un pezzo di informazione che proviene dall'esterno della catena ed è incluso in un blocco. Ci sono tre categorie di estrinsecazioni. Sono eredità, transazioni firmate e transazioni non firmate.

Le estrinsecazioni intrinseche sono pezzi di informazione che non sono firmati e inseriti in un blocco solo dall'autore del blocco.

Le estrinsecazioni delle transazioni firmate sono transazioni che contengono una firma del conto che ha emesso la transazione. Si trova a pagare una tassa per avere la transazione inclusa nella catena.

Le transazioni non firmate sono transazioni che non contengono la firma del conto che ha emesso la transazione. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. A causa di questo, la coda delle transazioni manca di una logica economica per prevenire lo spam.

Per maggiori informazioni, clicca [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Qual è l'endpoint della rete Kusama?

Il network.endpoint per la rete Kusama è `wss://kusama.api.onfinality.io/public-ws`.

## Qual è l'endpoint della rete Polkadot mainnet?

Il network.endpoint per la rete Polkadot è `wss://polkadot.api.onfinality.io/public-ws`.

## Come posso sviluppare iterativamente il mio schema di progetto?

Un problema noto con lo sviluppo di uno schema di progetto che cambia è che quando si lancia il nodo Subquery per il test, i blocchi precedentemente indicizzati saranno incompatibili con il nuovo schema. Per sviluppare iterativamente gli schemi i blocchi indicizzati memorizzati nel database devono essere cancellati, questo può essere ottenuto lanciando il nodo con il flag `--force-clean`. Per esempio:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Nota che si raccomanda di usare `--force-clean` quando si cambia il `startBlock` nel manifesto del progetto (`project.yaml`) per iniziare la reindicizzazione dal blocco configurato. Se `startBlock` viene cambiato senza un `--force-clean` del progetto allora l'indicizzatore continuerà l'indicizzazione con il `startBlock` configurato in precedenza.
