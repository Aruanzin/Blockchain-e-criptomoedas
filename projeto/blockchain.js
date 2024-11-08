const crypto = require('crypto');
const fs = require('fs');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).digest('hex');
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Bloco minerado: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
        this.difficulty = 2;
        this.loadBlocksFromFile('blocks.json');
    }

    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Bloco Gênesis", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    saveBlocksToFile(filename) {
        const blocks = this.chain.map(block => ({
            hash: block.hash,
            previousHash: block.previousHash,
            nonce: block.nonce,
            data: block.data
        }));
        fs.writeFileSync(filename, JSON.stringify(blocks, null, 4));
        console.log(`Blocos salvos no arquivo ${filename}`);
    }

    loadBlocksFromFile(filename) {
        if (fs.existsSync(filename)) {
            const data = fs.readFileSync(filename, 'utf8');
            const blocks = JSON.parse(data);
            this.chain = blocks.map(block => new Block(block.index, block.timestamp, block.data, block.previousHash));
        } else {
            this.chain = [this.createGenesisBlock()];
        }
    }

    isDataUnique(data) {
        return !this.chain.some(block => JSON.stringify(block.data) === JSON.stringify(data));
    }
}

module.exports = Blockchain;
module.exports.Block = Block;