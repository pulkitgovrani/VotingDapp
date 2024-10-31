// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingWithRestaking is Ownable {
    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 endTime;
        bool exists;
        bool ended;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public stakes;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    uint256 public proposalCount;
    IERC20 public stakingToken;

    event ProposalCreated(uint256 proposalId, string description, uint256 endTime);
    event Voted(address indexed voter, uint256 proposalId, uint256 stakeAmount);
    event ProposalEnded(uint256 proposalId, uint256 finalVoteCount);
    event StakeWithdrawn(address indexed user, uint256 amount);

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    function createProposal(string memory description, uint256 duration) external onlyOwner {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            description: description,
            voteCount: 0,
            endTime: block.timestamp + duration,
            exists: true,
            ended: false
        });
        emit ProposalCreated(proposalCount, description, proposals[proposalCount].endTime);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        stakes[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function vote(uint256 proposalId) external {
        require(proposals[proposalId].exists, "Proposal does not exist");
        require(!hasVoted[msg.sender][proposalId], "You have already voted for this proposal");
        require(block.timestamp < proposals[proposalId].endTime, "Voting period has ended");
        
        uint256 stakeAmount = stakes[msg.sender];
        require(stakeAmount > 0, "No stake to vote");

        hasVoted[msg.sender][proposalId] = true;
        proposals[proposalId].voteCount += stakeAmount;
        emit Voted(msg.sender, proposalId, stakeAmount);
    }

    function endProposal(uint256 proposalId) external onlyOwner {
        require(proposals[proposalId].exists, "Proposal does not exist");
        require(!proposals[proposalId].ended, "Proposal has already ended");
        require(block.timestamp >= proposals[proposalId].endTime, "Voting period is not over yet");

        proposals[proposalId].ended = true;
        emit ProposalEnded(proposalId, proposals[proposalId].voteCount);
    }

    function withdrawStake() external {
        uint256 amount = stakes[msg.sender];
        require(amount > 0, "No stake to withdraw");
        stakes[msg.sender] = 0;
        stakingToken.transfer(msg.sender, amount);
        emit StakeWithdrawn(msg.sender, amount);
    }

    function getVoteCount(uint256 proposalId) external view returns (uint256) {
        return proposals[proposalId].voteCount;
    }
}
