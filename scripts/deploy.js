import pkg from "hardhat";
const { ethers } = pkg;

// The network and private keys are run by default from hardhat
async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage"); // ethers from hardhat knows that SimpleStorage is in contracts folder
    console.log("Deploying...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    console.log(`Deployed contract to: ${simpleStorage.target}`);
}

main()
    .then((_) => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
