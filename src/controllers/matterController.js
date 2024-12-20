const matterService = require('../services/matterService');

const createMatter = async (req, res) => {
  try {
    const matter = await matterService.createMatter();
    res.status(201).json(matter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const updatedMatter = await matterService.updateState(id, state);
    res.status(200).json(updatedMatter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMatters = async (req, res) => {
  try {
    const matters = await matterService.getMatters();
    res.status(200).json(matters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMatter = async (req, res) => {
  try {
    const { id } = req.params;
    await matterService.deleteMatter(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const countMattersByState = async (req, res) => {
  try {
    const counts = await matterService.countMattersByState();
    res.status(200).json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createMatter, updateState, getMatters, deleteMatter,countMattersByState };
