# Le bac à sable

Dans le scénario d'utilisation que nous envisageons, le nœud SubQuery est généralement exécuté par un hôte de confiance, et le code du projet SubQuery soumis par l'utilisateur au nœud n'est pas entièrement fiable.

Un code malveillant est susceptible d'attaquer l'hôte ou même de le compromettre, et de causer des dommages aux données d'autres projets dans le même hôte. Par conséquent, nous utilisons le mécanisme sécurisé de sandbox [VM2](https://www.npmjs.com/package/vm2) pour réduire les risques. Celui-ci :

- Exécute le code non fiable en toute sécurité dans un contexte isolé et le code malveillant n'accèdera pas au réseau et au système de fichiers de l'hôte, sauf par l'interface exposée que nous avons injectée dans le bac à sable.

- Appelle des méthodes de manière sécurisée et échange des données et des callbacks entre sandboxes.

- Est immunisé contre de nombreuses méthodes d'attaque connues.


## Restriction

- Pour limiter l'accès à certains modules intégrés, seuls `assert`, `buffer`, `crypto``, util` et `path` sont sur la liste blanche.

- Nous supportons les [modules tiers](../create/mapping.md#third-party-libraries) écrits en **CommonJS** et les bibliothèques **hybrides** comme `@polkadot/*` qui utilisent ESM par défaut.

- Tout module utilisant `HTTP` et `WebSocket` sont interdit.
