# Funzionamento di un dizionario SubQuery

L'idea di un progetto di dizionario generico è quella di indicizzare tutti i dati di una blockchain e registrare gli eventi, gli estrinsechi e i relativi tipi (modulo e metodo) in un database in ordine di altezza del blocco. Un altro progetto può quindi interrogare questo punto finale < 0 > network.dictionary </0 > anziché quello predefinito < 0 > network.endpoint </0 > definito nel file manifesto.

L'endpoint < 0 > network.dictionary </0 > è un parametro facoltativo che, se presente, rileverà e utilizzerà automaticamente. < 0 > network.endpoint </0 > è obbligatorio e non verrà compilato se non è presente.

Prendendo come esempio il dizionario < 0 > SubQuery </0 > del progetto, il file < 1 > schema </1 > definisce le entità 3; estrinseco, eventi, specVersion. Queste 3 entità contengono 6, 4 e 2 campi rispettivamente. Quando questo progetto è in esecuzione, questi campi sono riflessi nelle tabelle del database.

![tabella extrinsics](/assets/img/extrinsics_table.png) ![tabella eventi](/assets/img/events_table.png) ![tabella specversion](/assets/img/specversion_table.png)

I dati della blockchain vengono quindi memorizzati in queste tabelle e indicizzati per le prestazioni. Il progetto viene quindi ospitato in Progetti SubQuery e il punto finale API è disponibile per essere aggiunto al file manifesto.

## Come incorporare un dizionario nel progetto?

Aggiungere < 0 > dizionario: https ://api.subquery.network/sq/subquery/dictionary-polkadot </0 > alla sezione di rete del manifesto. Eg:

```shell
network:
  endpoint: wss://polkadot.api.onfinality.io/public ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
```

## Cosa succede quando un dizionario NON è usato?

Quando un dizionario NON viene utilizzato, un indicizzatore preleva tutti i dati di blocco tramite l'api polkadot in base al flag < 0 > batch-size </0 > che è 100 per impostazione predefinita e lo inserisce in un buffer per l'elaborazione. In seguito, l'indicizzatore prende tutti questi blocchi dal buffer e, durante l'elaborazione dei dati del blocco, verifica se l'evento e l'estrinseco in questi blocchi corrispondono al filtro definito dall'utente.

## Cosa succede quando si utilizza un dizionario?

Quando viene usato un dizionario, l'indicizzatore prima prenderà come parametri i filtri chiamata e evento e li unirà in una query di GraphQL. Usa quindi l'API del dizionario per ottenere un elenco di altezze di blocco rilevanti solo che contiene gli eventi specifici ed estrinseci. Spesso questo è sostanzialmente inferiore a 100 se viene utilizzato il valore predefinito.

Ad esempio, immaginate una situazione in cui state indicizzando gli eventi di trasferimento. Non tutti i blocchi hanno questo evento (nell'immagine sottostante non ci sono eventi di trasferimento nei blocchi 3 e 4).

![Attacco dizionario](/assets/img/dictionary_blocks.png)

Il dizionario permette al vostro progetto di saltare questo in modo piuttosto che cercare in ogni blocco per un evento di trasferimento, salta ai soli blocchi 1, 2 e 5. Questo perché il dizionario è un riferimento pre-calcolato a tutte le chiamate e gli eventi in ogni blocco.

Ciò significa che l'utilizzo di un dizionario può ridurre la quantità di dati che l'indicizzatore ottiene dalla catena e ridurre il numero di blocchi “indesiderati” memorizzati nel buffer locale. Ma rispetto al metodo tradizionale, aggiunge un ulteriore passo per ottenere i dati dall'API del dizionario.

## Quando un dizionario NON è utile?

Quando < 0 > gestori di blocchi </0 > vengono utilizzati per raccogliere dati da una catena, ogni blocco deve essere elaborato. Pertanto, l'utilizzo di un dizionario in questo caso non offre alcun vantaggio e l'indicizzatore passa automaticamente all'approccio predefinito non dizionario.

Inoltre, quando si tratta di eventi o di eventi estrinseci che si verificano o esistono in ogni blocco come < 0 > timestamp.set </0 >, l'utilizzo di un dizionario non offrirà alcun vantaggio aggiuntivo.
