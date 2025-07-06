document.getElementById('reminderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const time = document.getElementById('time').value;
  const button = document.getElementById('submitBtn');

  const res = await fetch('http://localhost:5000/api/reminders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, message, time })
  });

  if (res.ok) {
    button.classList.add('clicked');
    document.getElementById('response').innerText = "Reminder set successfully!";
  } else {
    document.getElementById('response').innerText = "Error setting reminder.";
  }
});
