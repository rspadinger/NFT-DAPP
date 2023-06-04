// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Solution_ReferenceTypes {   
    int[] public arr1 = [-1,0,1];

    struct Voter {
        bool hasAlreadyVoted;
        uint vote;
    }

    mapping(address => Voter) public voters;   
    
    function changeValues(uint index, int newValue) external {         
        int[] storage arr2 = arr1;
        if(index >= arr2.length) {
            arr2.push(newValue);
        } else {
            arr2[index] = newValue; 
        }              
    }

    function vote(uint userVote) external {
        Voter memory myVote = Voter(true, userVote);
        voters[msg.sender] = myVote;
    }
}