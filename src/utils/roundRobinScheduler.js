const generateRoundRobinMatches = (teams) => {
  const matches = [];
  const numTeams = teams.length;

  if (numTeams < 2) {
    return matches;
  }

  let scheduleTeams = [...teams];
  if (numTeams % 2 !== 0) {
    scheduleTeams.push(null); // Add a dummy team for odd number of teams
  }

  const numAdjustedTeams = scheduleTeams.length;
  const numRounds = numAdjustedTeams - 1;

  for (let round = 0; round < numRounds; round++) {
    for (let i = 0; i < numAdjustedTeams / 2; i++) {
      const team1 = scheduleTeams[i];
      const team2 = scheduleTeams[numAdjustedTeams - 1 - i];

      if (team1 && team2) {
        matches.push({
          id: `${team1.id}-${team2.id}-${round}`,
          team1: team1.name,
          team2: team2.name,
          score1: null,
          score2: null,
          winner: null,
          status: 'scheduled',
        });
      }
    }

    // Rotate teams for the next round (except the first team)
    const lastTeam = scheduleTeams.pop();
    scheduleTeams.splice(1, 0, lastTeam);
  }

  return matches;
};

module.exports = { generateRoundRobinMatches };
