const { readJsonFile } = require('./jsonService');

const getAllTournaments = async () => {
  return readJsonFile('tournaments.json');
};

const getTournamentMatches = async (tournamentId) => {
  const tournaments = await readJsonFile('tournaments.json');
  const matches = await readJsonFile('matches.json');

  const tournament = tournaments.find(t => t.id === tournamentId);
  if (!tournament) {
    throw new Error('Tournament not found.');
  }

  return matches.filter(match => match.tournamentId === tournamentId);
};

const getMatchDetails = async (matchId) => {
  const matches = await readJsonFile('matches.json');
  const match = matches.find(m => m.id === matchId);
  if (!match) {
    throw new Error('Match not found.');
  }
  return match;
};

module.exports = {
  getAllTournaments,
  getTournamentMatches,
  getMatchDetails,
};
