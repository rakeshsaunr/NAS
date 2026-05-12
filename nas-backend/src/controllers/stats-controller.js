const Stat = require('../models/Stats-model');

exports.incrementVisits = async (req, res, next) => {
  try {
    const stat = await Stat.findOneAndUpdate(
      { key: 'visits' },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );
    res.json({ totalVisits: stat.value });
  } catch (err) { next(err); }
};
