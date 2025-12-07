const { generateUniqueId } = require('../utils/idGenerator');
const { generateRoundRobinMatches } = require('../utils/roundRobinScheduler');
const { readJsonFile, writeJsonFile } = require('./jsonService');

const createTournament = async (name, number_of_teams, venue, kind_of_match) => {
  // Input validation
  if (!name || !number_of_teams || !venue || !kind_of_match) {
    throw new Error('Missing required tournament fields.');
  }
  if (typeof number_of_teams !== 'number' || number_of_teams <= 1) {
    throw new Error('Number of teams must be a number greater than 1.');
  }

  const tournaments = await readJsonFile('tournaments.json');
  const teams = await readJsonFile('teams.json');
  const matches = await readJsonFile('matches.json');

  const tournamentId = await generateUniqueId(); // Await the async function
  const newTeams = [];
  for (let i = 0; i < number_of_teams; i++) {
    const teamId = await generateUniqueId();
    const teamName = `Team ${String.fromCharCode(65 + i)}`; // Generate A, B, C...
    newTeams.push({ id: teamId, name: teamName, tournamentId });
  }

  const tournamentMatches = await Promise.all(generateRoundRobinMatches(newTeams).map(async match => ({
    ...match,
    id: await generateUniqueId(), // Generate unique ID for each match
    tournamentId,
  })));

  const newTournament = {
    id: tournamentId,
    name,
    number_of_teams,
    venue,
    kind_of_match,
    teams: newTeams.map(team => team.id),
    matches: tournamentMatches.map(match => match.id),
  };

  tournaments.push(newTournament);
  teams.push(...newTeams);
  matches.push(...tournamentMatches);

  await writeJsonFile('tournaments.json', tournaments);
  await writeJsonFile('teams.json', teams);
  await writeJsonFile('matches.json', matches);

  return newTournament;
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

const updateMatchScore = async (matchId, score1, score2, winner) => {
  // Input validation
  if (score1 === undefined || score2 === undefined || !winner) {
    throw new Error('Missing score or winner for match update.');
  }
  if (typeof score1 !== 'number' || typeof score2 !== 'number' || score1 < 0 || score2 < 0) {
    throw new Error('Scores must be non-negative numbers.');
  }

  const matches = await readJsonFile('matches.json');
  const matchIndex = matches.findIndex(match => match.id === matchId);

  if (matchIndex === -1) {
    throw new Error('Match not found.');
  }

  matches[matchIndex].score1 = score1;
  matches[matchIndex].score2 = score2;
  matches[matchIndex].winner = winner;
  matches[matchIndex].status = 'completed';

  await writeJsonFile('matches.json', matches);

  return matches[matchIndex];
};

module.exports = {
  createTournament,
  getTournamentMatches,
  updateMatchScore,
};
