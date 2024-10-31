const Web3 = require("web3");
const contractABI = require("../contracts/VotingWithRestaking.json"); // ABI of the deployed contract
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const web3 = new Web3("YOUR_INFURA_OR_ALCHEMY_URL");
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function createProposal(req, res) {
  const { description, duration, sender } = req.body;
  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods
      .createProposal(description, duration)
      .send({ from: sender });
    res.status(200).send("Proposal created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function stake(req, res) {
  const { amount, sender } = req.body;

  try {
    await contract.methods.stake(amount).send({ from: sender });
    res.status(200).send("Stake successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function vote(req, res) {
  const { proposalId, sender } = req.body;

  try {
    await contract.methods.vote(proposalId).send({ from: sender });
    res.status(200).send("Vote successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function endProposal(req, res) {
  const { proposalId, sender } = req.body;

  try {
    await contract.methods.endProposal(proposalId).send({ from: sender });
    res.status(200).send("Proposal ended successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function withdrawStake(req, res) {
  const { sender } = req.body;

  try {
    await contract.methods.withdrawStake().send({ from: sender });
    res.status(200).send("Stake withdrawn successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getVoteCount(req, res) {
  const proposalId = req.params.proposalId;
  try {
    const count = await contract.methods.getVoteCount(proposalId).call();
    res.status(200).json({ voteCount: count });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createProposal,
  stake,
  vote,
  endProposal,
  withdrawStake,
  getVoteCount,
};
