require('dotenv').config(); // Load environment variables
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 5000; // Get port from .env or default to 5000

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tournament System API',
      version: '1.0.0',
      description: 'API documentation for the Node.js tournament system using Express and file-based JSON database.',
    },
    servers: [
      {
        url: `http://localhost:${5000}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Tournament: {
          type: 'object',
          required: ['name', 'number_of_teams', 'venue', 'kind_of_match'],
          properties: {
            id: { type: 'string', description: 'Unique ID of the tournament' },
            name: { type: 'string', description: 'Name of the tournament' },
            number_of_teams: { type: 'number', description: 'Number of teams in the tournament' },
            venue: { type: 'string', description: 'Venue of the tournament' },
            kind_of_match: { type: 'string', description: 'Type of match (e.g., Football)' },
            teams: { type: 'array', items: { type: 'string' }, description: 'Array of team IDs' },
            matches: { type: 'array', items: { type: 'string' }, description: 'Array of match IDs' },
          },
          example: {
            id: 'uuid-tournament-1',
            name: 'Summer Championship',
            number_of_teams: 8,
            venue: 'City Stadium',
            kind_of_match: 'Football',
            teams: ['uuid-team-1', 'uuid-team-2'],
            matches: ['uuid-match-1', 'uuid-match-2'],
          },
        },
        Team: {
          type: 'object',
          required: ['id', 'name', 'tournamentId'],
          properties: {
            id: { type: 'string', description: 'Unique ID of the team' },
            name: { type: 'string', description: 'Name of the team' },
            tournamentId: { type: 'string', description: 'ID of the tournament the team belongs to' },
          },
          example: {
            id: 'uuid-team-1',
            name: 'Team 1',
            tournamentId: 'uuid-tournament-1',
          },
        },
        Match: {
          type: 'object',
          required: ['id', 'team1', 'team2', 'tournamentId'],
          properties: {
            id: { type: 'string', description: 'Unique ID of the match' },
            team1: { type: 'string', description: 'Name of the first team' },
            team2: { type: 'string', description: 'Name of the second team' },
            score1: { type: 'number', nullable: true, description: 'Score of the first team' },
            score2: { type: 'number', nullable: true, description: 'Score of the second team' },
            winner: { type: 'string', nullable: true, description: 'Name of the winning team' },
            status: { type: 'string', enum: ['scheduled', 'completed'], default: 'scheduled', description: 'Status of the match' },
            tournamentId: { type: 'string', description: 'ID of the tournament the match belongs to' },
          },
          example: {
            id: 'uuid-match-1',
            team1: 'Team 1',
            team2: 'Team 2',
            score1: 2,
            score2: 1,
            winner: 'Team 1',
            status: 'completed',
            tournamentId: 'uuid-tournament-1',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
