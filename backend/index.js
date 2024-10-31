const express = require("express");
const Web3 = require("web3");
const contractABI = require("./contracts/VotingWithRestaking.json");
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

const app = express();
app.use(express.json());

const web3 = new Web3("YOUR_INFURA_OR_ALCHEMY_URL");
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Import routes
const votingRoutes = require("./routes/voting");
app.use("/api/voting", votingRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
