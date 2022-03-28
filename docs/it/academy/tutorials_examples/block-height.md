# Come iniziare da un'altezza di blocco diversa?

## Guida video

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Introduction

Per impostazione predefinita, tutti i progetti iniziali iniziano a sincronizzare la blockchain dal blocco di genesi. In parole chiare, dal blocco 1. Per grandi catene di blocco, questo può in genere richiedere giorni o anche settimane per la sincronizzazione completa.

Per avviare la sincronizzazione di un nodo SubQuery da un'altezza diversa da zero, è sufficiente modificare il file project.yaml e modificare la chiave startBlock.

Di seguito è riportato un file project.yaml in cui il blocco iniziale è stato impostato su 1.000.000

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery. etwork/sq/subquery/dictionary-polkadot
dataFonti:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mappatura:
      gestori:
        - gestore: handleBlock
          kind: substrate/BlockHandler
```

## Perché non cominciare da zero?

La ragione principale è che può ridurre il tempo per sincronizzare la blockchain. Questo significa che se sei interessato alle transazioni solo negli ultimi 3 mesi, puoi solo sincronizzare gli ultimi 3 mesi vale la pena di significare meno tempo di attesa e puoi iniziare il tuo sviluppo più velocemente.

## Quali sono gli inconvenienti di non partire da zero?

Lo svantaggio più ovvio sarà che non sarete in grado di interrogare i dati sulla blockchain per i blocchi che non avete.

## Come capire l'altezza attuale della blockchain?

Se si utilizza la rete Polkadot, è possibile visitare < 0 > https ://polkascan.io/</0 >, selezionare la rete e quindi visualizzare la figura «Blocco finalizzato».

## Devo fare una ricostruzione o un codegen?

No. Poiché si sta modificando il file project.yaml, che è essenzialmente un file di configurazione, non sarà necessario ricostruire o rigenerare il codice tipografico.
