# Terminología

![terminología](/assets/img/terminology.png)

## **Reservando espacio**

Acto de un Indexador asignando SQT a un proyecto determinado.

### **Reasignando**

Una operación combinada de remover fichas apuestadas de un proyecto y asociarlo inmediatamente con otro proyecto (entra en vigor al final de la próxima Era). Esto está representado/expresado como un porcentaje de la SQT vinculada al índice.

## **Bonding**

Acto de depósito de SQT en un contrato global de apuesta, realizado por un Indexador o un Delegator

### **En desvinculación**

Acto de un Indexador o un Delegator retirando SQT del contrato global de apuesta.

Se trata efectivamente de una transferencia de SQT del contrato global de apuestas al monedero del Indexer o del Delegador. En otras palabras, esto puede ser considerado como el Indexador o el Delegador retirando parte o toda su apuesta. Tenga en cuenta que se aplica un período de bloqueo cuando las fichas no están vinculadas.

## **Delegando**

Acto de un Delegator asignando SQT al contrato global de apuestas, y luego asignando SQT a un Indexer. Tenga en cuenta que delegar y unir son operaciones atómicas.

### **.**

Acto de retirar SQT de un Indexador al final de una Era y luego retirar ese SQT del contrato global de acopio a una dirección de cartera. Esto está sujeto a un período de bloqueo.

### **Redelegante**

Acto de un Delegator reasignando SQT de un Indexador a otro Indexador. Redelegar no requiere que las fichas no sean elegadas y está en cola para que surtan efecto al final de la Era.

## **Generación de interés**

Acto de asignación de fichas de un Indexador en un contrato de apuesta global y en el propio contrato del Indexador.

### **Quitando la participación**

Acto de un Indexador retirando su SQT. Esto activa un “periodo de bloqueo” de 28 días. El indexador puede reiniciarse para cancelar este proceso y devolver sus tokens de período de bloqueo al contrato de apuesta.

### **Descanso**

Acto del Indexador restando SQT durante el período de bloqueo para devolver las fichas de período bloqueado al contrato de apuesta.

---

## **Ratio de Contrato**

La suma del valor diario de los contratos (definido como valor del contrato/período) no puede exceder una proporción con su participación total (indexador + delegador).

## **Era**

Período o duración de tiempo donde las configuraciones y ajustes permanecen constantes y los cálculos se llevan a cabo. Por ejemplo, durante una Era:

- la tasa de la Comisión del Indexador no se puede cambiar durante una Era.

## **Ratio de deelegación del indexador**

La cantidad que un Indexador puede “tomar prestado” o apalancarse de los Delegadores. Esta proporción todavía está por determinar.

## **Periodo de bloqueo**

Período en el que las fichas no están vinculadas a la espera de la retirada. Durante este período, los tokens no ganan ninguna recompensa. Actualmente, el período de bloqueo se define como 28 días.
