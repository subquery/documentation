# Indexadores

## ¿Qué es un índexador?

Un Indexador es un participante en la red de SubQuery que es responsable de indexar los datos de la cadena de bloques y proporcionar estos datos a sus clientes.

Los indexadores desempeñan un papel muy importante dentro de la red de SubQuery. Como parte de un negocio de datos-as-a-service, un Indexer convierte el poder computacional y de red en beneficios.

## Toma de Indexador

Con el fin de obtener recompensas de los ingresos por consulta como un Indexador se propone que los Indexadores deben apostar SQT contra un Proyecto de Subconsulta particular al que están prestando el servicio. La función de producción Cobb-Douglas se utilizará para determinar las recompensas distribuidas a cada Indexador.

SubQuery planea agregar una restricción a la red donde un indexador debe colocar una cantidad mínima de SQT en el fondo de recompensas pertinente para poder participar en su correspondiente Acuerdo Abierto. También deben apostar una cantidad mínima en un contrato de apuesta equivalente para cualquier Contrato Cerrado de la misma forma. Este valor mínimo apostado por el indexador debe ser un porcentaje determinado del valor de recompensa por Era del Acuerdo lo que significa que para renovar el Acuerdo a volúmenes más altos, el indexador también debe aumentar su participación. Cuando la participación de un índice disminuya bajo esta cantidad mínima, no podrán renovar el Acuerdo al precio existente.

Si un Indexador es detectado mal (tal como proporcionando datos no válidos, incompletos o incorrectos), son susceptibles de reasignar una porción de su SQT apostada (en el ip de premio en particular) al Tesoro de la Fundación SubQuery, disminuyendo sus participaciones de SQT apuestadas en la red y, por lo tanto, su potencial recompensa. Dado que la participación asignada del índice está determinada por un porcentaje de su SQT total, esto tendrá un flujo en efecto a todos los demás pozos de recompensa en los que sea parte el indexador.

## ¿Cómo se recompensa a los indexadores?

Los indexadores son recompensados en SQT de dos maneras:
- Recompensas de los grupos de recompensas SQT basados en la distribución definida por la Función de Producción Cobb-Douglas
- Recompensas directas de cuota de consulta SQT de acuerdos cerrados en los que un indexador es parte

Los indexadores son recompensados con las comisiones que los consumidores pagan por proporcionar datos de blockchain que el Consumidor ha solicitado. Un Indexador recibirá todas las cuotas de un Contrato Cerrado. De lo contrario, los honorarios se dividen en base a la cantidad de trabajo realizado (solicitudes atendidas) y la cantidad de SQT delegado - esta división se determina aplicando la Función de Producción Cobb-Douglas.

Puede haber múltiples grupos de recompensas simultáneamente activos para un determinado índice. El trabajo del indexador es asignar su SQT apuestado y delegado entre estos grupos (en términos de un porcentaje de su total SQT). Habrá un fondo de recompensas para cada proyecto que el Indexador acepte PAYG, y un fondo de recompensas por cada Acuerdo de Mercado del que sea parte el Indexador.

## Atracción de Delegadores

Los indexadores pueden aumentar su potencial de ganancias atrayendo a los Delegadores. Los deelegadores son poseedores de fichas SQT que pueden delegar sus fichas a Indexadores para obtener recompensas adicionales. Los indexadores utilizan estos tokens adicionales para aumentar la cantidad que asignan a proyectos de su elección. Esto permite a los indexadores aumentar sus ganancias.

Los indexadores fijan la tasa de la Comisión del Indexador (ICR) que es el porcentaje que ganan. El resto se reparte entonces entre el Indexer y todos los Delegadores proponiendo una cantidad apuesta/delegada. Por lo tanto, los Indexadores tienen que decidir la proporción de beneficios que un Indexer desea conservar frente a la cantidad a compartir con sus Delegadores. Un ICR más bajo será más atractivo para los Delegers.

Por ejemplo, Indexer A ha establecido un ICR del 80% y ha recibido SQT de 8 Delegators. Esto significa que los 8 Delegadores más el propio Indexer recibirán una parte del 20% restante de lo que el Indexador ha ganado. La parte se dividirá proporcionalmente entre ellos. Tenga en cuenta que los Delegadores deben haber delegado sus fichas para toda la Era para ser elegibles para estas recompensas. Para obtener más información sobre las recompensas de los Delegadores, consulte [Delegadores](./delegators.md).

## Convertirse en un indexador

Para convertirse en un indexador en la red de subconsultas, el indexador debe poseer el hardware necesario, ejecutar los servicios de subconsulta requeridos, tener una red de acceso público a través de una IP estática o un nombre de dominio, y registrarse como un índice.

### Habilidad de indexador

En general, un Indexer debe ser un usuario de ordenador técnicamente competente. Sin embargo, la simplicidad de la red SubQuery y los frameworks propuestos permiten incluso a un desarrollador junior participar con éxito.

Un usuario básico debería estar familiarizado con la provisión y administración de servidores, la instalación de las herramientas CLI de SubQuery, la administración de bases de datos y la red básica. Los usuarios más experimentados pueden ejecutar nodos en un entorno agrupado, incorporar monitoreos y alertas y también una gestión de redes más avanzada.

Por último, las partes interesadas deberían estar dispuestas a invertir tiempo en el mantenimiento de sus nodos de indexación e infraestructura.

### Requisitos de toma

Se espera que los indexadores se aposten y mantengan una cantidad mínima de fichas. Esto es para asegurar que los Indexadores tengan algo de piel en el juego y se comprometan a apoyar la red. SubQuery todavía está por determinar esto, pero es una de nuestras [apariencias de diseño](./design-philosophy.md) que esto sea lo más bajo y accesible posible.

Si un Indexador experimentara un evento barrido y su saldo SQT apuestado cayera por debajo del mínimo requerido, tendrán que recargar su SQT apostada para seguir ganando recompensas de su trabajo.

### Hardware necesario

Los indexadores pueden invertir en su propio hardware de infraestructura o alquilar infraestructura de los gustos de AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Requisitos de mantenimiento/operación

Aquí están algunos de los Indexadores de mantenimiento y/o de requerimientos operativos que deben esperar:

- Actualizar siempre a la última versión del software de Subquery
- Identificar y aprovechar las nuevas oportunidades de indexación
- Actualizar la versión del proyecto a la última y reindexar cuando sea necesario
- Mantenimiento de infraestructura
  - Monitoreo constante y mejora del disco
  - Calcular el tamaño correcto de la consulta y el índice basado en el tráfico
  - Aumentar los servicios de consulta para aumentar el tráfico de ingles

### Infraestructura

El requisito mínimo de infraestructura incluye:

- Al menos un nodo computacional para ejecutar los siguientes servicios:
  - [Servicio de nodo (indexación)](https://www.npmjs.com/package/@subql/node)
  - [Servicio de Consulta](https://www.npmjs.com/package/@subql/query)
  - [Servicio Coordinator Indexer](https://www.npmjs.com/package/@subql/indexer-coordinator)
- Un nodo de base de datos para ejecutar Postgresql db (v12 y superior).

Pronto llegará información más detallada.

## Protección de seguridad & Rendimiento

Las consideraciones de seguridad y rendimiento son las siguientes.

### Carteras Operadoras

Almacenamiento seguro de la frase de semilla de recuperación de cartera de un Indexer es altamente recomendable.

### Cortafuegos

Los indexadores deben tener en mente la seguridad. La seguridad de las infraestructuras, en particular los muros de incendio, debería aplicarse para evitar la exposición pública a los puertos personales.

Las contraseñas seguras deben ser usadas por defecto y las políticas de rotación de contraseñas deben ser consideradas.

### Rendimiento del índice

Para generar rendimientos deseables, los Indexadores deben tener en cuenta diversos factores como:

- el equilibrio entre su propia apuesta y la de los Delegadores.
- el tipo de contrato que se está cumpliendo. El Indexador recibirá todos los honorarios de consulta si es un contrato cerrado. Si está abierto, entonces la recompensa de un Indexador dependerá de cuántos otros Indexadores hay.
- cumplimiento de las especificaciones del Acuerdo de Nivel de Servicio (SLA) (para evitar cortar las penalidades)
- la exactitud de los datos que se están sirviendo para evitar recorte de sanciones

## Seleccionando Proyectos de SubQuery para indexar

Hay varios indicadores que un Indexador debe tener en cuenta al seleccionar un proyecto de SubQuery para indexar.

### Oportunidades de tarifa de consulta

Algunos proyectos tendrán planes abiertos o cerrados anunciados por los consumidores.

Cuando un consumidor anuncia un plan abierto o cerrado para un proyecto, especifican cuánto están dispuestos a pagar por un volumen determinado de solicitudes. Cuanto más un consumidor esté dispuesto a pagar, más atractivo será el proyecto para un Indexador. También proporciona confianza en que probablemente habrá ingresos recurrentes de este proyecto SubQuery.

### Complejidad del proyecto

Los proyectos variarán en los requerimientos de cálculo. Los proyectos simples sólo indicarán unos pocos parámetros, mientras que los proyectos más complicados requerirán más recursos de cálculo y más ancho de banda. Los indexadores necesitan entender la complejidad del proyecto y sus capacidades de hardware.

### Competición de indexador

Proyectos populares que ofrecen un alto volumen de consultas que atraen un gran número de índices. Esto también implica que las recompensas se compartirán entre más personas. La participación de un único Indexer puede ser menor que un proyecto menos popular con una cuota de consulta ligeramente más baja, pero con muchos menos Indexadores.

### Estrategia de precios

Los indexadores deben ser conscientes del coste de su operación y de los ingresos esperados para entender su punto de ruptura. Algunas consideraciones son:

- ¿Cómo deberían los indexadores fijar los precios de sus planes?
- ¿A qué precio pueden los Indexadores aceptar un acuerdo de servicio o no?

### Publicidad

Los indexadores tienen que anunciarse a los Delegadores y a los Consumidores. Los indexadores pueden hacerlo desde su propio sitio web, en los foros de Subconsulta o en cualquier otro lugar que se considere necesario. Algunos ejemplos de la información que se debe proporcionar son:

- El fondo y la experiencia del equipo de Indexador o Indexer
- El enfoque de hardware y por qué proporciona un rendimiento superior
- La política de asistencia al cliente o SLA
- Experiencia de actuaciones históricas

### Customer support

Se recomienda encarecidamente a los indexadores que proporcionen un método de comunicación para que sus clientes informen de indisponibilidad y también proporcionen comentarios.
