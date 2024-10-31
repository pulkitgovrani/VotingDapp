import React from "react";
import axios from "axios";

const WithdrawStake = () => {
  const handleWithdraw = async () => {
    const sender = "YOUR_WALLET_ADDRESS"; // Replace with actual wallet address
    await axios.post("http://localhost:5000/withdrawStake", { sender });
    alert("Stake withdrawn successfully!");
  };

  return (
    <div>
      <h2>Withdraw Your Stake</h2>
      <button onClick={handleWithdraw}>Withdraw Stake</button>
    </div>
  );
};

export default WithdrawStake;
