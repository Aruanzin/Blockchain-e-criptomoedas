const fs = require('fs');

// Função para gerar uma temperatura aleatória entre -10°C e 40°C
function gerarTemperaturaAleatoria() {
  return (Math.random() * 50 - 10).toFixed(2); // Gera valores entre -10 e 40 com duas casas decimais
}

// Array para armazenar as temperaturas
let temperaturas = [];

// Função para registrar a temperatura no arquivo JSON
function registrarTemperatura() {
  const temperaturaAtual = {
    timestamp: new Date(),
    temperatura: gerarTemperaturaAleatoria()
  };
  
  temperaturas.push(temperaturaAtual);

  // Grava o array de temperaturas em um arquivo JSON
  fs.writeFile('temperaturas.json', JSON.stringify(temperaturas, null, 2), (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo:', err);
    } else {
      console.log('Temperatura registrada:', temperaturaAtual);
    }
  });
}

// Executa a função a cada 10 segundos
setInterval(registrarTemperatura, 10000);
