// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Solution_ValueTypes {
    uint public myValue;
    address private myAddress;

    constructor() payable {
        myAddress = msg.sender;
        myValue = 5;
    }
    
    function changeValue(uint newValue) external {
        myValue = newValue;
    }

    function withdraw(address withdrawAddress) external {          
        (bool success,) = withdrawAddress.call{value: address(this).balance}("");
        require(success, "Transfer Failed!");
    }    
}