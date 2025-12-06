const mongoose = require('mongoose');

const getHealth = (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    db: dbStatus,
  });
};

module.exports = { getHealth };
