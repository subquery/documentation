# Tutorials & Beispiele

Hier listen wir unsere Tutorials auf und erkunden verschiedene Beispiele, die Ihnen helfen, auf einfachste und schnellste Weise in Betrieb zu gehen.

## Tutorials



## SubQuery-Beispielprojekte

| Beispiel                                                                                              | Beschreibung                                                                                                                                     | Themen                                                                                                                         |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| [extrinsischer-finalisierter-Block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Indiziert extrinsische Elemente, damit sie nach ihrem Hash abgefragt werden können                                                               | Das einfachste Beispiel mit einer __Blockhandler__-Funktion                                                                    |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                              | Indiziert den Zeitstempel jedes abgeschlossenen Blocks                                                                                           | Eine weitere einfache __Call-Handler__-Funktion                                                                                |
| [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)                      | Indiziert den geringsten Staking-Betrag, der für die Wahl eines Validators erforderlich ist.                                                     | Kompliziertere __Blockhandler__-Funktion, die __externe Aufrufe__ an `@polkadot/api` für zusätzliche On-Chain-Daten durchführt |
| [sum-reward](https://github.com/subquery/tutorials-sum-reward)                                        | Indizes, die Anleihen, Belohnungen und Schrägstriche aus den Ereignissen des abgeschlossenen Blocks abstecken                                    | Kompliziertere __Ereignishandler__ mit einer __eins-zu-viele__-Beziehung                                                       |
| [entity-relation](https://github.com/subquery/tutorials-entity-relations)                             | Indiziert Saldoübertragungen zwischen Konten, indiziert auch das Dienstprogramm BatchAll, um den Inhalt der extrinsischen Aufrufe herauszufinden | __Eins-zu-Viele__- und __Viele-zu-Viele__-Beziehungen und komplizierte __extrinsische Handhabung__                             |
| [Kitty](https://github.com/subquery/tutorials-kitty-chain)                                            | Indiziert Geburtsdaten von Kitties.                                                                                                              | Komplexe __Aufrufhandler__ und __Ereignishandler__ mit indizierten Daten aus einer __benutzerdefinierten Chain__               |
