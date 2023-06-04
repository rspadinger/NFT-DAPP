// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Functions {
    uint public value;
    address public owner;
    uint public timeLimit;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized");
        _;
    }

    modifier onlyAfter(uint _time) {
        require(block.timestamp > _time, "Too early!");
        _;
    }

    constructor() {
        owner = msg.sender;
        timeLimit = block.timestamp + 1 minutes;
    }

    function changeValue(uint _value) public onlyOwner() onlyAfter(timeLimit) {
        value = _value;
    }

    //simple view function => cannot change state
    function multiplyValue(uint _value) external view returns (uint) {
        return value * _value;
    }

    //simple pure function => cannot read from state
    function addAndMultiply(uint _valueA, uint _valueB) public pure returns(uint, uint) {
        uint add = _valueA + _valueB;
        uint mult = _valueA * _valueB;
        return (add, mult);
    } 
}