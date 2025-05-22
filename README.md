# 📝 Todo Summary Bot

A web app that lets users add, edit, and delete todos — and with one click, summarizes the todo list using Cohere AI and sends the summary to a Slack channel via webhook.

**UI Snapshot**

![Screenshot_20250522_033021](https://github.com/user-attachments/assets/1a8732b8-f5e1-4ba4-a886-139982281943)



## 🚀 Tech Stack

**Frontend:**
- Vite + React
- Axios
- Tailwind CSS

**Backend:**
- Node.js + Express
- Cohere AI SDK
- Slack Incoming Webhook
- dotenv, cors

---

## ✨ Features

- ✅ Add new todos
- ✅ Edit existing todos inline
- ✅ Delete todos with a single click
- ✅ View current todo list
- ✅ Summarize the entire list using Cohere's LLM
- ✅ Automatically send the summary to a configured Slack channel
- ✅ Responsive and modern UI using Tailwind CSS

---

## 📦 Folder Structure

```bash
todo-summary-bot/
├── todo-frontend/      # React + Vite app
├── todo-backend/       # Node.js + Express API
├── README.md
