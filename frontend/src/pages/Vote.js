import React, { useState } from "react";
import axios from "axios";

const Vote = () => {
  const [proposalId, setProposalId] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();
    const sender = "YOUR_WALLET_ADDRESS"; // Replace with actual wallet address
    await axios.post("http://localhost:5000/vote", { proposalId, sender });
    alert("Vote cast successfully!");
  };

  return (
    <form onSubmit={handleVote}>
      <input
        type="number"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        placeholder="Proposal ID"
        required
      />
      <button type="submit">Vote</button>
    </form>
  );
};

export default Vote;
