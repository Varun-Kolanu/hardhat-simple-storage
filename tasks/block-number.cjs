const { task } = require("hardhat/config.js");

task("block-number", "Prints the current block number").setAction(
    async (_, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current Block Number: ${blockNumber}`);
    },
);
