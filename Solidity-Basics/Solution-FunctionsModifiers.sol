// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Solution_Functions {
    string public myString;
    address public owner;
    uint public timeLimit;

    /// the delay to call this function has passed
    /// @param callTime The timestamp when the function was called
    error TooLate(uint callTime);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized");
        _;
    }

    modifier onlyBefore(uint _time) {
        if(block.timestamp > _time) 
            revert TooLate(block.timestamp);
        _;
    }

    constructor() {
        owner = msg.sender;
        timeLimit = block.timestamp + 2 minutes;
    }

    function changeString(string memory _str) public onlyOwner() onlyBefore(timeLimit) {
        myString = _str;
    }

    function add2Values(uint _valueA, uint _valueB) public pure returns(uint) {
        uint add = _valueA + _valueB;        
        return add;
    } 
}