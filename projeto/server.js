const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const Block = require('./blockchain').Block;
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const acessoBlockchain = new Blockchain();

// Função para monitorar o arquivo temperatura.json
function monitorTemperatureFile() {
    const filePath = path.join(__dirname, 'dados/temperaturas.json');
    let lastContent = '';

    fs.watchFile(filePath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            const newContent = fs.readFileSync(filePath, 'utf8');
            if (newContent !== lastContent) {
                lastContent = newContent;
                const temperaturas = JSON.parse(newContent);
                temperaturas.forEach(temp => {
                    const data = { timestamp: temp.timestamp, temperatura: temp.temperatura };
                    if (acessoBlockchain.isDataUnique(data)) {
                        acessoBlockchain.addBlock(new Block(acessoBlockchain.chain.length, new Date().toISOString(), data));
                    }
                });
                acessoBlockchain.saveBlocksToFile('blocks.json');
            }
        }
    });
}

monitorTemperatureFile();

app.get('/', (req, res) => {
    res.render('index', { numEntries: 1 });
});

app.post('/register', (req, res) => {
    const numEntries = parseInt(req.body.numEntries, 10);
    const entries = [];

    for (let i = 0; i < numEntries; i++) {
        const nome = req.body[`nome_${i}`];
        const dia = req.body[`dia_${i}`];
        const hora = req.body[`hora_${i}`];

        if (nome && dia && hora) {
            const data = { nome, dia, hora };
            if (acessoBlockchain.isDataUnique(data)) {
                acessoBlockchain.addBlock(new Block(acessoBlockchain.chain.length, new Date().toISOString(), data));
                entries.push(data);
            } else {
                entries.push({ ...data, error: 'Entrada duplicada. Não será registrada.' });
            }
        }
    }

    acessoBlockchain.saveBlocksToFile('blocks.json');

    res.render('result', { entries, blockchain: acessoBlockchain });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});