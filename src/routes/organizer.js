const express = require('express');
const { createTournament, getTournamentMatches, updateMatchScore } = require('../services/organizerService');

const router = express.Router();

router.post('/tournaments', async (req, res) => {
  try {
    const { name, number_of_teams, venue, kind_of_match } = req.body;
    const tournament = await createTournament(name, number_of_teams, venue, kind_of_match);
    res.status(201).json(tournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

router.patch('/match/:matchId/score', async (req, res) => {
  try {
    const { matchId } = req.params;
    const { score1, score2, winner } = req.body;
    const updatedMatch = await updateMatchScore(matchId, score1, score2, winner);
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
