const express = require('express');
const { getAllTournaments, getTournamentMatches, getMatchDetails } = require('../services/userService');

const router = express.Router();

router.get('/tournaments', async (req, res) => {
  try {
    const tournaments = await getAllTournaments();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/matches/:tournamentId', async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const matches = await getTournamentMatches(tournamentId);
    res.status(200).json(matches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/match/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await getMatchDetails(matchId);
    res.status(200).json(match);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
