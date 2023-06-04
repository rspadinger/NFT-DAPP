// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ValueTypes {
    uint public myUint256;
    uint8 private myUint8 = 1;
    int public myInt256 = -1;
    bool public myBoolean;
    address public myAddress;

    constructor() payable {
        myAddress = msg.sender;
    }
    
    function changeValue(uint newValue) external {
        myUint256 = newValue;
    }

    function getContractBalance() external view returns(uint) {
        return address(this).balance;
    }

    function transferETH() external {    
        payable(myAddress).transfer(address(this).balance);

        //recommended way to transfer funds
        //(bool success,) = myAddress.call{value: address(this).balance}("");
        //require(success, "Transfer Failed!");
    }    
}