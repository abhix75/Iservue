const Matter = require('../models/matter');
const { saveSolidMatterToFile } = require('../utils/fileHandler');

const createMatter = async () => {
  const existingSolid = await Matter.findOne({ where: { state: 'solid' } });
  if (existingSolid) throw new Error('Cannot create a new matter until the current one reaches the solid state.');
  
  return await Matter.create();
};

const updateState = async (id, newState) => {
  const matter = await Matter.findByPk(id);
  const PrevMatterState = matter.state;
  if (!matter) throw new Error('Matter not found.');

  if (matter.state === 'solid') throw new Error('Cannot change state from solid.');
  if (matter.state === 'gas' && newState === 'liquid') {
    matter.state = 'liquid';
  } else if (matter.state === 'liquid' && newState === 'solid') {
    matter.state = 'solid';
    saveSolidMatterToFile(matter); // Save to file once solid state is reached
  } else {
    throw new Error('Invalid state transition.');
  }

  matter.changeHistory.push({ from: PrevMatterState, to: newState, timestamp: new Date() });
  await matter.save();
  return matter;
};

const deleteMatter = async (id) => {
  const matter = await Matter.findByPk(id);
  if (!matter) throw new Error('Matter not found.');
  return await matter.destroy();
};

const getMatters = async () => {
  return await Matter.findAll();
};

const countMattersByState = async () => {
  const gasCount = await Matter.count({ where: { state: 'gas' } });
  const liquidCount = await Matter.count({ where: { state: 'liquid' } });
  const solidCount = await Matter.count({ where: { state: 'solid' } });

  return { gas: gasCount, liquid: liquidCount, solid: solidCount };
};


module.exports = { createMatter, updateState, deleteMatter, getMatters ,countMattersByState};
