# Orígenes de datos dinámicos

Hay casos en los que no se conoce todos los parámetros de una fuente de datos cuando se inicia un proyecto. Un ejemplo de ello es una fábrica de contratos que creará nuevas instancias de contrato en una fecha posterior. Es imposible saber cuáles serán las direcciones del contrato antes de tiempo. Aquí es donde entra en juego dinámicamente la capacidad de crear nuevas fuentes de datos.

## El campo `de plantillas`

Para poder utilizar fuentes de datos dinámicas necesitas tener al menos una versión de `0.2.1`. Si estás en `0.2.0` todo lo que necesitas hacer es cambiar la specVersion. Si estás en una versión inferior, entonces deberías actualizar a `0.2.0` primero con `subql migrate`.

Spec versión `0.2.1` introduce un nuevo campo `plantillas`. Las plantillas son las mismas que las fuentes de datos con un par de diferencias.

* Necesitan un `nombre` para identificar la plantilla
* `startBlock` ya no es necesario. Esto se establecerá en el bloque que la fuente de datos es creada
* En el caso de una fuente de datos personalizada el campo de `. opciones de procesador` también se puede rellenar parcialmente, el resto de las opciones se proporcionarán cuando se instaure la fuente de datos.

## Ejemplo de proyecto

La mejor manera de mostrar cómo utilizar una fuente de datos dinámica es con un ejemplo.

El siguiente ejemplo es un cambio descentralizado que tiene un contrato de fábrica que despliega un nuevo contrato cuando se añade un par de operaciones. Cuando el proyecto es ejecutado no es posible conocer las direcciones de todo contrato de pareja de operaciones que se han creado o se crearán. Las fuentes de datos pueden ser creadas dinámicamente por un manejador de mapeo de una plantilla con el fin de indexar los contratos del par de operaciones recién creados.


### `proyecto.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
descripción: ''
repository: ''
schema:
  file: ./schema. raphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: ". Tipos. aml"
dataources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    procesador:
      archivo: '. node_modules/@subql/contrat-processors/dist/moonbeam.
      opciones:
        abi: exchangeFactory
        dirección: '0x000000000000000000000000000000000000000000000000000000000000'
    activos:
      exchangeFactory:
        file: . src/exchangeFactory.abi.json
    mapeo:
      archivo: ./dist/index. s
      handlers
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filtro:
            topics:
              - newTradingPair(address exchange, dirección token1, dirección token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: '. node_modules/@subql/contrat-processors/dist/moonbeam.
      opciones:
        abi: tradingPair
        # no conocemos la dirección en este punto, se proporcionará cuando se instancien
    activos:
      tradingPair:
        archivo: . src/tradingPair.abi.json
    mapeo:
      archivo: . dist/index. s
      handlers:
        - handler: handleLiquidityAdded
          kind: susstrate/MoonbeamEvent
          filtro:
            temas:
              - liquidityAdded(proveedor de direcciones, monto uint256 uint256 monto2)
```

### `mappingHandlers.ts`

```ts
// Esta función es definida usando el comando `subql codegen` cli
importar { createTradingPairDatasource } desde '.. types';
importar {MoonbeamEvent} desde '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = evento. rgs;

  // Crear una nueva fuente de datos proporcionando la dirección del contrato de intercambio de pareja de trading
  espera createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promesa<void> {
  /* mapeando implementación de fuction aquí */
}
```


## Ver fuentes de datos dinámicas de un proyecto

Las fuentes dinámicas de datos se almacenan en los metadatos del proyecto. Si necesitas ver qué detalles puedes consultarlos a continuación:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Resultado
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

