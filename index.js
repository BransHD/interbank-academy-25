const fs = require('fs');
const csv = require('csv-parse');

fs.readFile('data.csv', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo csv, error: ', err);
    return;
  }
  csv.parse(
    data,
    {
      delimiter: ',', //Delimitador de columnas
      columns: true, //Si tiene encabezado
    },
    (error, data) => {
      if (error) {
        console.error('Error procesando el archivo CSV:', error);
        return;
      }
      reportes(data); //Llamar a la función reportes con los datos procesados
    }
  );
});

//Obtener:

/*Balance Final:
1) Suma de los montos de las transacciones de tipo "Crédito" menos la suma de los montos de las transacciones de tipo "Débito".
2) Transacción de Mayor Monto: Identificar el ID y el monto de la transacción con el valor más alto.
3) Conteo de Transacciones: Número total de transacciones para cada tipo ("Crédito" y "Débito").
*/
function reportes(data) {
  let montoCreditos = 0;
  let montoDebitos = 0;

  let mayorMonto = 0;
  let idTransaccion = null;

  let countCreditos = 0;
  let countDebitos = 0;

  data.forEach((objData) => {
    if (parseFloat(objData.monto) > mayorMonto) {
      mayorMonto = parseFloat(objData.monto);
      idTransaccion = objData.id;
    }
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
  const balance = montoCreditos - montoDebitos;

  console.log('***************************************************************************************');
  console.log('El reporte de Procesamiento de transacciones es el siguiente:');
  console.log('balance final: ', balance.toFixed(2));
  console.log('La transacción de mayor monto es: ', mayorMonto.toFixed(2), 'con ID: ', idTransaccion);
  console.log('El total de transaccciones son: Créditos: ', countCreditos, ' y Débitos: ', countDebitos);
  console.log('***************************************************************************************');
}
