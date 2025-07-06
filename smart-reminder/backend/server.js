const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const reminderRoutes = require('./controllers/reminderController');
const cronJobs = require('./utils/cron');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/reminders', reminderRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    cronJobs.startCron(); // Start the reminder checker
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
