# 📝 Todo Summary Bot

A web app that lets users add, edit, and delete todos — and with one click, summarizes the todo list using Cohere AI and sends the summary to a Slack channel via webhook.

**UI Snapshot**

*front-end*
![Screenshot_20250522_090353](https://github.com/user-attachments/assets/e2c601cd-e1a7-44e8-9a97-043bb4e96fdf)

*slack*

![Screenshot_20250522_090413](https://github.com/user-attachments/assets/feecf23e-41eb-4527-beee-1ab7199fb6a7)


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
