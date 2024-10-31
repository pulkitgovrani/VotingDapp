const express = require("express");
const {
  createProposal,
  vote,
  executeProposal,
  getProposal,
} = require("../controllers/votingController");

const router = express.Router();

router.post("/create", createProposal);
router.post("/vote", vote);
router.post("/execute", executeProposal);
router.get("/:id", getProposal);

module.exports = router;
