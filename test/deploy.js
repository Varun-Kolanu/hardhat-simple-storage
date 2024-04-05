// describe: keyword
import { assert, expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
        await simpleStorage.deploymentTransaction().wait(1);
    }); // runs before each test

    // tests
    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.fetch();
        const expectedValue = "0";
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue);
    });

    it("Should update to 6 when we call store", async function () {
        const expectedValue = "6";
        const transaction = await simpleStorage.store(6);
        transaction.wait(2);
        const updatedValue = await simpleStorage.fetch();
        assert.equal(updatedValue.toString(), expectedValue);
    });
});

// To run: yarn hardhat test
// To run a specific test by searching: yarn hardhat test --grep store (searches for test which includes store)
// Or if you put it.only(), it runs only that test
