import pkg from "hardhat";
const { ethers, run, network } = pkg;

// The network and private keys are run by default from hardhat
async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage"); // ethers from hardhat knows that SimpleStorage is in contracts folder
    console.log("Deploying...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    console.log(`Deployed contract to: ${simpleStorage.target}`);
    // console.log(network.config);
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for 1 block confirmations...");
        await simpleStorage.deploymentTransaction().wait(1);
        await verify(simpleStorage.target, {});
    }

    const currentValue = await simpleStorage.fetch();
    console.log(`Current Value: ${currentValue}`);
    const txResponse = await simpleStorage.store(6);
    await txResponse.wait(1);
    const updatedValue = await simpleStorage.fetch();
    console.log(`Current Value: ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgsParams: args,
        });
    } catch (error) {
        if (error.message.toLowercase().includes("already verified")) {
            console.error("Already verified!");
        } else {
            console.error(error);
        }
    }
}

main()
    .then((_) => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
