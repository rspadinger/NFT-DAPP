// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ReferenceTypes {   
    uint[] public myArray1 = [1,2,3];
    string public myString;

    struct Deposit {
        uint amount;
        uint timestamp;
    }

    mapping(address => uint) public balances;
    mapping(address => Deposit) public latestDeposit;    
    
    function changeValues() external {  
        myString = "Hello";

        uint[] storage myArray2 = myArray1;
        myArray2[0] = 5;               
    }

    function deposit() external payable {
        Deposit memory myDeposit = Deposit(msg.value, block.timestamp);
        latestDeposit[msg.sender] = myDeposit;

        balances[msg.sender] += msg.value;
    }
}