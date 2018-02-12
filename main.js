const SHA256 = require('crypto-js/sha256');

//block implementation
class Block{
    constructor (index, timestamp,data,prevHAsh=''){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.prevHAsh = prevHAsh;
        this.hash = "";
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.prevHAsh + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(diff){
        while(this.hash.substring(0, diff) !== Array(diff + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash)
    }
}

//the blockchain itself
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.diff = 5;
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2018", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.prevHAsh = this.getLatestBlock().hash;
        newBlock.mineBlock(this.diff);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            var currentBlock = this.chain[i].hash;
            var prevBlock = this.chain[i-1].hash;

            if(currentBlock.hash !== this.calculateHash.calculateHash()){
                return false;
            }

            if(currentBlock.prevHAsh !== prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let coin = new BlockChain();
coin.addBlock(new Block(1, "02/01/2018",{amount:4}));
coin.addBlock(new Block(2, "03/01/2018",{amount:2}));
coin.addBlock(new Block(3, "04/01/2018",{amount:7}));
