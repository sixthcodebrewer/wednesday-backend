const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db');

const readJsonFile = async (filename) => {
  const filePath = path.join(dbPath, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
    return [];
  }
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

const writeJsonFile = async (filename, data) => {
  const filePath = path.join(dbPath, filename);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { readJsonFile, writeJsonFile };
