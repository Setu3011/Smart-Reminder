const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

router.post('/', async (req, res) => {
  const { email, message, time } = req.body;
  try {
    const reminder = new Reminder({ email, message, time });
    await reminder.save();
    res.status(200).json({ success: true, reminder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
