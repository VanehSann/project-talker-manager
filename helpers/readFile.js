const { readFile } = require('fs').promises;

const readFIle = async () => {
  const talker = await readFile('./talker.json', 'utf8');
  return JSON.parse(talker);
};

module.exports = readFIle;