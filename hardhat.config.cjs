require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("./tasks/block-number.cjs");
require("hardhat-gas-reporter");

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia-example";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "p4tk3y";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "3th4p1k3y";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "c01n";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    // Use yarn hardhat run scripts/deploy.js --network sepolia to use sepolia
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.24",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY, // comment for no api call
        // L1: "polygon", // Default: ethereum
    },
};
