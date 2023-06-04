// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//TODO create an ERC721 contract that inherits from the OpenZeppelin ERC721URIStorage and Ownable contracts
contract MyNFT {
    //TODO create  aprivate vaariable called _tokenIds of type Counter 
    // and make sure all the members that are defined on Counters can be used on that variable 
    
    //TODO call the base constructor with the following props for the token name and symbol: MyNFT & MNFT
    constructor() {}

    //TODO make sure, this function is of external visibility can only be called by the ontract owner
    function mintNFT(address recipient, string tokenURI)  {
        //TODO each time a new token is minted, the _tokenIds needs to be increased by 1
        // call the _mint function that is defined on the base ERC71 contract and mint an NFT to the recipient
        // call the _setTokenURI function that is defined in the ERC721URIStorage contract to set the provided URI to the newly minted token
        
    }
}
