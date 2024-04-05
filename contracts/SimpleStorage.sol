// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19; // line ends with semicolon

// EVM: Ethereum Virtual Machine
// Avalanche, Fantom, Polygon: compatible with evms

// ^0.8.7 -> ok for all >= 0.8.7
// >=0.8.7 <0.9.0 : range
// The SPDX... is used for License
// contract is a keyword in solidity similar to class

// Every Smart contract has an address like our wallet has
// A transaction occurs whenever a contract deploys
contract SimpleStorage {
    // boolean, uint, int, address, bytes

    bool isEven = true;
    uint256 p = 123; // uint8, uint256 etc. uint256 is default 256 -> bits (32 bytes). unit -> min: 8
    string s = "Hello World";
    int256 x = -5;
    address myAddress = 0x7CBe11Ea157A26799643ea2c91e0A393f69D226e;
    bytes32 y = "hello"; // 0x126322, 32 is max

    uint256 public a; // a = 0: is default
    // public creates a getter function which returns the value
    // private: only visible to current contract
    // external: external members can see
    // internal: contrct and children can see (default)
    // Variables are function calls
    // gas proportional to computation

    struct People {
        string name;
        uint favNumber;
    }

    People public person = People({name: "Varun", favNumber: 5});

    People[] public people; // dynamic array

    // People[3] public temp; // static array

    function store(uint256 _num) public virtual {
        a = _num;
    }

    // view, pure and simple variable getters doesn't take gas since they are just to view a state
    // view and pure can't modify a state
    function fetch() public view returns (uint256) {
        return a;
    }

    // evm can access and store information in six places
    // calldata: temporary variables (only upto calling) + no modification
    // memory: temporary + can be modified
    // storage: permanent (default): can't be given to params

    // Location types can only be given to arrays, structs or mapping types because it don't know where it will lie.
    // As string is an array of bytes, it is given memory
    function addPerson(string memory _name, uint256 _favNum) public {
        People memory newPerson = People(_name, _favNum);
        // people.push(People(_name, _favNum));
        people.push(newPerson);
        nameToFavnum[_name] = _favNum;
    }

    // Mapping
    mapping(string => uint256) public nameToFavnum;
}
