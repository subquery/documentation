# Delegadores

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## ¿Qué es un Delegador?

Un Delegator es un rol de red no técnica en SubQuery Network y es una gran manera de empezar a participar en SubQuery Network. Este rol permite a los Delegadores "delegar" su SQT a uno o más Indexadores y ganar recompensas (similares a la apuesta).

Sin elegantes, es probable que los indexadores ganen menos recompensas porque tendrán menos SQT que asignar. Por lo tanto, los Indexers compiten para atraer a los Delegadores ofreciendo una parte competitiva de las recompensas de un Indexer.

## Requisitos para ser un Delegador

Una de las mejores cosas de ser un Delegator es que no necesitas ningún desarrollador, programación o experiencia técnica. La comprensión básica de SubQuery Network es todo lo que se requiere para convertirse en un Delegator.

## Beneficios de ser un Delegador

Hay varios beneficios de convertirse en un Delegador:

- **Fácil de comenzar**: Requiere poco conocimiento técnico, Los descalificadores sólo necesitan adquirir fichas SQT y luego aprender el proceso de delegar las fichas a su Indexer(s) preferido(s).
- **Contribuir a la red**: Delegar a los Indexadores es una forma de apoyar las solicitudes de servicio de trabajo de un Indexer a los consumidores. A cambio, los Delegadores son recompensados con SQT.
- **Gana recompensas**: Los elegadores pueden poner su SQT a trabajar delegando su SQT a los Indexadores y ganando una parte del paquete de recompensas.
- **No hay una delegación mínima**: No hay una delegación mínima requerida para ser un Delegador. Esto significa que cualquiera puede unirse sin importar cuánto SQT uno tiene.

## ¿Cómo se recompensa a los delegadores?

Para atraer a los Delegadores a apoyar su trabajo, los Indexadores ofrecen a los Delegadores una parte de las recompensas que ganan. El Indexador anunciará una tasa de Comisión del Indexador, donde los ingresos restantes se repartirán dentro de la totalidad de la delegación/fondo de apuestas proporcionalmente al valor individual delegado/apostado en el albergue.

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. Los indexadores son libres de fijar esta tasa a cualquier valor que deseen. Un porcentaje más alto indica que los Indexadores tienen más ganancias. Un porcentaje menor indica que los Indexadores comparten más de sus ganancias con sus Distribuidores.

Los desempleados sólo recibirán ingresos por apostar Eras de las que formaron parte durante todo el período. Por ejemplo, si se unen a una era participante a mediados del período correspondiente. entonces no ganarán ningún ingreso de Cuota de Consulta por esa Era particular.

Si un indexador desea aumentar el tipo de Comisión del Indexador que ofrecen a sus deselegantes, Ellos deben anunciar esto para toda una era de apuestas. El Indexador podrá reducir su tasa de Comisión del Indexador en cualquier momento para elevar más delegados SQT para participar a corto plazo. Los dedos pueden retirar o deseleccionar su cantidad apostada en cualquier momento pero perderán cualquier recompensa ganada en la Era (ya que no formaron parte del grupo de delegaciones durante toda la duración de la Era).

## ¿Cómo seleccionar indexadores?

You need to assess a few things when deciding on what Indexer to choose.

Los indexadores fijan la tasa de la Comisión del Indexador (ICR) que es el porcentaje que ganan. El resto se reparte entonces entre el Indexer y todos los Delegadores proponiendo una cantidad apuesta/delegada. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

Por ejemplo, Indexer A ha establecido un ICR del 80% y ha recibido SQT de 8 Delegators. Esto significa que los 8 Delegadores más el propio Indexer recibirán una parte del 20% restante de lo que el Indexador ha ganado. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Ciclo de vida de deelegación

Los delegadores delegan (depósito) SQT en el contrato de un índice.

Los delegadores pueden entonces decidir cuánto redelegar a cada Indexador de su elección.

El delegador puede deseleccionar (retirar) los tokens de vuelta a su cartera. Esto activará un período de bloqueo de 28 días.

Después de completar el período de desbloqueo, los tokens están disponibles para retirar/reclamar.

## Riesgos de ser un delegador

A pesar de que no se considera un papel arriesgado, ser un Delegador incluye algunos riesgos que deben ser conscientes.

1. Riesgo de volatilidad de mercado: Las fluctuaciones constantes en el mercado es un riesgo que afecta no sólo a SQT, sino a todos los tokens en el mercado general de criptomonedas. Adoptar un enfoque a largo plazo puede reducir este tipo de riesgos.
2. Los constantes ajustes de parámetros de apuesta por parte de los Indexadores y las tarifas de las delegaciones pueden aumentar el riesgo para un Delegador. Por ejemplo, un Delegator podría perder un cambio en los parámetros de apuesta, resultando en un rendimiento inferior al esperado. Para reducir este riesgo, cuando los Indexadores disminuyen sus parámetros de estancia, sólo entrará en vigor una vez que se haya completado la siguiente Era completa, dando tiempo a los delegados para que evalúen y hagan cualquier cambio.
3. Indice de rendimiento deficiente: es posible que los Delegators puedan seleccionar los Indexadores que tienen un desempeño deficiente y, por lo tanto, proporcionar un rendimiento deficiente de la inversión a los Delegadores. Por lo tanto, se anima a los dedores a hacer el Indexer debido diligencia en los índices potenciales. También está disponible un Índice de Reputación para ayudar a los Delegadores a comparar los Indexadores entre sí.

Una vez que se encuentre un (los) índice(s) preferido(s), debe realizarse la diligencia debida para comprobar la reputación y fiabilidad de un índice. Se podrían realizar evaluaciones para evaluar si el Indexador está activo en la comunidad, si el Indexador ayuda a otros miembros, si es posible ponerse en contacto con el Indexador, y si el Indexador está actualizado con el protocolo y las actualizaciones del proyecto.
