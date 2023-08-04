# The Sandbox

Nel nostro scenario d'uso previsto, il nodo SubQuery è solitamente eseguito da un host fidato, e il codice del progetto SubQuery inviato dall'utente al nodo non è completamente affidabile.

Alcuni codici maligni possono attaccare l'host o addirittura comprometterlo, e causare danni ai dati di altri progetti nello stesso host. Perciò, usiamo il meccanismo protetto della [VM2](https://www.npmjs.com/package/vm2) sandbox per ridurre i rischi. Questo:

- Esegue il codice untrusted in modo sicuro in un contesto isolato e il codice maligno non accederà alla rete e al file system dell'host se non attraverso l'interfaccia esposta che abbiamo iniettato nella sandbox.

- Chiama in modo sicuro i metodi e scambia dati e callback tra le sandbox.

- È immune a molti metodi di attacco conosciuti.

## Restrizione

- Per limitare l'accesso a certi moduli integrati, solo`assert`, `buffer`, `crypto`,`util` и `path` sono inseriti nella lista bianca.

- Noi sosteniamo [Moduli di terze parti](../create/mapping/polkadot.md#third-party-libraries) scritto in **CommonJS** e **ibrido** biblioteche come `@polkadot/*` che usano ESM come predefinito.

- Tutti i moduli che usano `HTTP` e `WebSocket` sono proibiti.
