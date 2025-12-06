const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health');
const organizerRoutes = require('./routes/organizer');
const userRoutes = require('./routes/user');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Enable CORS for a specific origin
app.use(cors());

// JSON parser middleware
app.use(express.json());

// Load routes
app.use('/health', healthRoutes);
app.use('/organizer', organizerRoutes);
app.use('/user', userRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
