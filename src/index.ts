import * as CryptoJS from "crypto-js";

class Block {
    static calculateBlockHash = (
        index :number,
        previousHash :string,
        timestamp :number,
        data :string,
        ):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
        
        static validateStructure = (aBlock: Block): boolean => 
            typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash == "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";

        public index: number;
        public hash: string;
        public previousHash: string;
        public data: string;
        public timestamp: number; 

        constructor(
            index: number,
            hash: string,
            previoushash: string,
            data: string,
            timestamp: number)
            {
                this.index = index;
                this.hash = hash;
                this.previousHash = previoushash;
        this.data = data;
        this.timestamp = timestamp;
        }
}


const genesisBlock: Block = new Block(0, "202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = ():Block[] => blockchain;
//마지막 블록 구하기
const getLatestBlock = ():Block => blockchain[blockchain.length - 1];
//새로운 타임스탬프
const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000);
//
const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
      newIndex,
      previousBlock.hash,
      newTimestamp,
      data
    );
    const newBlock: Block = new Block(
      newIndex,
      newHash,
      previousBlock.hash,
      data,
      newTimestamp
    );
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );
//Block구조체 확인
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean =>{
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    } else {
        return true;
    }
};
//Block을 마지막 열에 추가
const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

createNewBlock("one_block");
createNewBlock("second_block");
createNewBlock("third_block");

console.log(blockchain)

export{}