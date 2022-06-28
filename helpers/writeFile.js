const { writeFile } = require('fs').promises;

const writeFIle = async (talker) => {
  await writeFile('./talker.json', JSON.stringify(talker));
};

module.exports = writeFIle;