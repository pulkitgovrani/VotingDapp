import React, { useState } from "react";
import axios from "axios";

const CreateProposal = () => {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sender = "YOUR_WALLET_ADDRESS"; // Replace with actual wallet address
    await axios.post("http://localhost:5000/createProposal", {
      description,
      duration,
      sender,
    });
    alert("Proposal created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Proposal description"
        required
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration in seconds"
        required
      />
      <button type="submit">Create Proposal</button>
    </form>
  );
};

export default CreateProposal;
