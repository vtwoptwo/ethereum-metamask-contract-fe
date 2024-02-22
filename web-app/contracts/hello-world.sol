// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // Event declaration for logging
    event SaidHelloTo(string name);

    // Struct to hold each greeting occurrence
    struct Greeting {
        string name;
        uint256 timestamp;
    }

    // Array to hold all greetings
    Greeting[] public greetings;

    // Function to return a simple "Hello World" message
    function sayHello() public pure returns (string memory) {
        return "Hello World";
    }
    
    // Modified function to include transaction history tracking
    function sayHelloTo(string memory name) public {
        // Log the greeting occurrence with an event
        emit SaidHelloTo(name);

        // Store the greeting occurrence in the array
        greetings.push(Greeting(name, block.timestamp));
    }

    // Function to retrieve the total number of greetings
    function getGreetingCount() public view returns (uint) {
        return greetings.length;
    }

    // Function to retrieve a specific greeting by index
    function getGreeting(uint index) public view returns (string memory name, uint256 timestamp) {
        require(index < greetings.length, "Index out of bounds");
        Greeting memory greeting = greetings[index];
        return (greeting.name, greeting.timestamp);
    }
}
