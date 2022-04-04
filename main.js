/* import the sha-256 function */
const SHA256 = require("crypto-js/sha256");

class Block {
    /* this constructor will receive the properties of this block and so
         each block will have an index a timestamp some data and the previous hash */
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    /* calculate the hash function of this block so it's going to 
          take the properties of this block run them through them hash function and then
          return the hash this will identify our block on the blockchain */
    calculateHash() {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    /* the constructor is responsible for initializing our blockchain */
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    /* this method create Genesis block and this is going to return a new block */
    createGenesisBlock() {
        return new Block(0,"01/01/2021", "Genesis Block", "0");
    }

    /* add an add block method that will receive in block now the get latest block method */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let WesamCoin = new Blockchain();
WesamCoin.addBlock(new Block(1, "01/04/2022", { amount: 4 }));
WesamCoin.addBlock(new Block(2, "03/04/2022", { amount: 10 }));

console.log(JSON.stringify(WesamCoin, null,4));

console.log('Is blockshain valid?' + WesamCoin.isChainValid());
