// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ErrorHandling { 

    uint private valueThatNeverChanges = 1;

    /// the provided amount for the purchase is incorrect
    /// the product costs 1 ETH
    /// @param provided The amount provided by the user
    error WrongAmount(uint provided);

    function buySomethingFor1ETH_Require() public payable {       
        require(msg.value != 1 ether, "Incorrect amount.");
        
        // code to perform the purchase...
    }

    function buySomethingFor1ETH_Revert() public payable {        
        if (msg.value != 1 ether)
            revert WrongAmount(msg.value);
                
        // code to perform the purchase...
    }

    function checkInvariant() public  {        
        // bad code that needs to be fixed...
        valueThatNeverChanges = 2;

        assert(valueThatNeverChanges == 1);
                
        // code continues...
    }
}