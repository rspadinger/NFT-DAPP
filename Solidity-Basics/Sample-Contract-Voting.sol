// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    address public owner;
    uint public electionEndTime;
    bool public electionHasEnded;

    struct Voter {
        bool allowedToVote;
        bool voted;
        uint vote;
    }

    struct Proposal {
        uint id;
        uint voteCount;
    }

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    event UserHasVoted(address indexed voter, uint proposal);
    event ElectionEnded(uint winningProposalId, uint winningVoteCount);

    ///The user has already voted
    error UserHasAlreadyVoted(address voter);
    ///The end of the election has already been callled
    error EndElectionAlreadyCalled();

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized to perform this action");
        _;
    }

    modifier onlyBefore(uint time) {
        require(block.timestamp < time, "Too late!");
        _;
    }

    modifier onlyAfter(uint time) {
        require(block.timestamp > time, "Too early!");
        _;
    }

    constructor(uint[] memory proposalIds, uint votingTime) {
        owner = msg.sender;
        voters[owner].allowedToVote = true;
        electionEndTime = block.timestamp + votingTime;

        for (uint i = 0; i < proposalIds.length; i++) {
            proposals.push(Proposal(proposalIds[i], 0));
        }
    }

    function giveRightToVote(address voter) external onlyOwner onlyBefore(electionEndTime) {
        if (voters[voter].voted) revert UserHasAlreadyVoted(voter);
        voters[voter].allowedToVote = true;
    }

    function vote(uint proposal) external onlyBefore(electionEndTime) {
        Voter storage sender = voters[msg.sender];
        require(sender.allowedToVote == true, "Has no right to vote");
        if (sender.voted) revert UserHasAlreadyVoted(msg.sender);

        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += 1;

        emit UserHasVoted(msg.sender, proposal);
    }

    function winningProposal() public view returns (uint winningProposalId, uint winningVoteCount) {
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposalId = proposals[p].id;
            }
        }
    }

    function endElection() external onlyOwner onlyAfter(electionEndTime) {
        if (electionHasEnded) revert EndElectionAlreadyCalled();

        electionHasEnded = true;
        (uint winningProposalId, uint winningVoteCount) = winningProposal();
        emit ElectionEnded(winningProposalId, winningVoteCount);
    }
}
