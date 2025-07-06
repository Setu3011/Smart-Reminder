const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const sendMail = require('./sendMail');

const startCron = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const dueReminders = await Reminder.find({ time: { $lte: now }, sent: false });

    for (const reminder of dueReminders) {
      await sendMail(reminder.email, 'Your Reminder', reminder.message);
      reminder.sent = true;
      await reminder.save();
      console.log(\`Sent reminder to \${reminder.email}\`);
    }
  });
};

module.exports = { startCron };
