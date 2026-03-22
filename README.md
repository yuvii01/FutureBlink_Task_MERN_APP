# MERN AI Flow App

A full-stack web application that lets you ask AI questions and visualize the prompt-response flow using React Flow.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free)
- OpenRouter API key (free)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/mern-task.git
cd mern-task
npm install
```

### 2. Configure Environment Variables

**Backend** - Create/Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-task-db?retryWrites=true&w=majority
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend** - Create/Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Run the Application

**Option A: Run Both Together** (Recommended)
```bash
npm run dev
```

**Option B: Run Separately**

Terminal 1 (Backend):
```bash
npm run backend
```

Terminal 2 (Frontend):
```bash
npm run frontend
```

### 4. Open in Browser
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 🔧 Available Commands

```bash
npm run dev              # Run backend + frontend together
npm run backend          # Run backend only  
npm run frontend         # Run frontend only
npm run install-all      # Install all dependencies
npm run build            # Build frontend for production
```

---

## 📚 Get Your API Keys

### MongoDB Atlas (Database)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (free tier)
4. Click "Connect" → "Drivers"
5. Copy your connection string
6. Replace `username:password` with your credentials

### OpenRouter API (AI)
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up (free)
3. Go to Settings → API keys
4. Create and copy your API key

---

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Check `MONGODB_URI` in `backend/.env`
- Whitelist your IP in MongoDB Atlas (Network Access)

**API Connection Error**
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`

**Port Already in Use**
- Change `PORT` in `backend/.env` to another port (e.g., 5001)
- Update `VITE_API_URL` in `frontend/.env` accordingly

---

## 📦 Tech Stack

- **Frontend**: React + React Flow + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **AI**: OpenRouter API

---

## 📱 Deploy to Render

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for step-by-step deployment guide.

---

## 📄 License

MIT


