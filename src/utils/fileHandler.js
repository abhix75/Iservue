const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../solidMatters.json');

const saveSolidMatterToFile = (matter) => {
  let solidMatters = readSolidMattersFromFile();
  solidMatters.push(matter);
  fs.writeFileSync(filePath, JSON.stringify(solidMatters, null, 2));
};

const readSolidMattersFromFile = () => {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(filePath));
};

module.exports = { saveSolidMatterToFile, readSolidMattersFromFile };
