import Web3 from "web3";
import VotingWithRestakingABI from "../contracts/VotingWithRestaking.json";

const web3 = new Web3(window.ethereum);
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const votingContract = new web3.eth.Contract(
  VotingWithRestakingABI,
  contractAddress
);

export { web3, votingContract };
