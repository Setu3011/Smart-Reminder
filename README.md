# ⏰ SmartReminder

SmartReminder is a full-stack reminder app that lets users set email-based reminders using a web interface. Built with **Node.js**, **MongoDB**, and **Vanilla JS**, it features an automated **CI/CD pipeline** using **Jenkins**, **Docker**, and deployment to **AWS EC2**.

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3 (Responsive)
- JavaScript (Vanilla)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Nodemailer (Email sending)
- node-cron (Background scheduler)

### DevOps
- Docker
- Docker Compose
- Jenkins (CI/CD pipeline)
- GitHub
- AWS EC2 (Deployment)

---

## 🚀 Features

- ✅ Users can set reminders with date, time, message, and email
- ✅ Reminders are saved in MongoDB
- ✅ `node-cron` checks every minute for due reminders
- ✅ Emails sent via Gmail SMTP using Nodemailer
- ✅ Responsive UI with confirmation feedback
- ✅ Jenkins automates pull → build → test → deploy
- ✅ Dockerized frontend, backend, and database
