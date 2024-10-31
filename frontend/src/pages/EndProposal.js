import React, { useState } from "react";
import axios from "axios";

const EndProposal = () => {
  const [proposalId, setProposalId] = useState("");

  const handleEndProposal = async (e) => {
    e.preventDefault();
    const sender = "YOUR_WALLET_ADDRESS"; // Replace with actual wallet address
    await axios.post("http://localhost:5000/endProposal", {
      proposalId,
      sender,
    });
    alert("Proposal ended successfully!");
  };

  return (
    <form onSubmit={handleEndProposal}>
      <input
        type="number"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        placeholder="Proposal ID"
        required
      />
      <button type="submit">End Proposal</button>
    </form>
  );
};

export default EndProposal;
