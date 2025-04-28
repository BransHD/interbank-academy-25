const fs = require('fs');
const csv = require('csv-parse');

//Lectura del archivo csv
fs.readFile('data.csv', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo csv, error: ', err);
    return;
  }
  //Procesamiento del archivo csv
  csv.parse(
    data, //Datos a procesar
    {
      delimiter: ',', //Delimitador de columnas
      columns: true, //Si tiene encabezado
    },
    (error, resultado) => {
      if (error) {
        console.error('Error procesando el archivo CSV:', error);
        return;
      }
      reportes(resultado); //Pasar los datos procesados a la función reportes
    }
  );
});

/*
Desafio Interbank Academy 25 - Procesamiento de transacciones:
1)Balance Final: Suma de los montos de las transacciones de tipo "Crédito" menos la suma de los montos de las transacciones 
de tipo "Débito".
2) Transacción de Mayor Monto: Identificar el ID y el monto de la transacción con el valor más alto.
3) Conteo de Transacciones: Número total de transacciones para cada tipo ("Crédito" y "Débito").
*/
function reportes(data) {
  // Inicialización de variables
  let montoCreditos = 0;
  let montoDebitos = 0;

  let mayorMonto = 0;
  let idTransaccion = null;

  let countCreditos = 0;
  let countDebitos = 0;

  //Iteración de cada transacción
  data.forEach((objData) => {
    //Validación para verificar el mayor monto e idenficar el id de transacción
    if (parseFloat(objData.monto) > mayorMonto) {
      mayorMonto = parseFloat(objData.monto);
      idTransaccion = objData.id;
    }
    //Validación para verificar el tipo de transacción, contar los tipos de transacción y sumar los montos de cada tipo
    switch (objData.tipo) {
      case 'Crédito':
        montoCreditos += parseFloat(objData.monto);
        countCreditos++;
        break;
      case 'Débito':
        montoDebitos += parseFloat(objData.monto);
        countDebitos++;
        break;
      default:
        console.log('Tipo de transacción no reconocido: ', objData.tipo);
    }
  });
  //Calculo del balance final
  const balance = montoCreditos - montoDebitos;

  //Impresión de resultados
  console.log('***************************************************************************************');
  console.log('El reporte de Procesamiento de transacciones es el siguiente:');
  console.log('balance final: ', balance.toFixed(2));
  console.log('La transacción de mayor monto es: ', mayorMonto.toFixed(2), 'con ID: ', idTransaccion);
  console.log('El total de transaccciones son: Créditos: ', countCreditos, ' y Débitos: ', countDebitos);
  console.log('***************************************************************************************');
}
