const generateUniqueId = async () => {
  const { v4: uuidv4 } = await import('uuid');
  return uuidv4();
};

module.exports = { generateUniqueId };
