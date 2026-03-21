# MERN AI Flow Task - Complete Guide

## Project Overview
This is a full-stack MERN application that allows users to:
1. Type a prompt into a text box
2. Click "Run Flow" to get an AI response
3. See the input and response connected by a visual flow diagram using React Flow
4. Save prompts and responses to MongoDB

## Tech Stack
- **Frontend**: React + React Flow + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **AI**: OpenRouter API

---

## Step 1: Get Required API Keys & URLs

### 1.1 OpenRouter API Key
1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up (free account)
3. Go to Settings → API keys
4. Create a new API key
5. Copy the key (you'll need it in `.env`)

### 1.2 MongoDB Connection URL
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Drivers"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority`)
6. Replace `username` and `password` with your MongoDB credentials

---

## Step 2: Installation & Setup

### 2.1 Backend Setup

#### Navigate to backend directory:
```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Update `.env` file:
Open `backend/.env` and fill in your values:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/mern-task-db?retryWrites=true&w=majority
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**What to change:**
- `MONGODB_URI`: Replace with your MongoDB Atlas connection string
- `OPENROUTER_API_KEY`: Replace with your OpenRouter API key
- `PORT`: (Optional) Change if 5000 is in use
- `FRONTEND_URL`: Keep as is for local development

#### Start the backend server:
```bash
npm start
```
or for development with auto-reload:
```bash
npm run dev
```

You should see: `Server running on port 5000`

---

### 2.2 Frontend Setup

#### Open a new terminal and navigate to frontend:
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Update `.env` file (if needed):
Open `frontend/.env`. For local development, the default values should work:

```
VITE_API_URL=http://localhost:5000
```

**What to change:**
- `VITE_API_URL`: The URL where your backend is running (keep as is for local development)

#### Start the frontend development server:
```bash
npm run dev
```

You should see: `Local: http://localhost:5173`

---

## Step 3: Run the Application

### Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Output:
```
MongoDB connected successfully
Server running on port 5000
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Output:
```
Local:   http://localhost:5173
```

### Open in Browser:
Go to `http://localhost:5173`

---

## How to Use

1. **Enter Text**: Type your question or prompt in the text area on the left
2. **Click "Run Flow"**: The app sends your prompt to the backend, which contacts OpenRouter's Gemini AI, and displays the response in the right node
3. **Save Query**: Click "Save Query" to save the prompt and response to MongoDB

---

## Custom Values Reference

| Variable | Location | Example | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | `backend/.env` | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/db?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `OPENROUTER_API_KEY` | `backend/.env` | `sk-or-v1-xxxxxxxxxxxxxxxx` | Your OpenRouter API key |
| `PORT` | `backend/.env` | `5000` | Port for backend server |
| `FRONTEND_URL` | `backend/.env` | `http://localhost:5173` | Frontend URL (for CORS) |
| `VITE_API_URL` | `frontend/.env` | `http://localhost:5000` | Backend API URL |

---

## API Endpoints

### POST `/api/ask-ai`
Send a prompt to the AI and get a response.

**Request:**
```json
{
  "prompt": "What is the capital of France?"
}
```

**Response:**
```json
{
  "response": "The capital of France is Paris."
}
```

---

### POST `/api/queries/save`
Save a prompt and response to the database.

**Request:**
```json
{
  "prompt": "What is the capital of France?",
  "response": "The capital of France is Paris."
}
```

**Response:**
```json
{
  "message": "Query saved successfully",
  "data": {
    "_id": "...",
    "prompt": "...",
    "response": "...",
    "createdAt": "..."
  }
}
```

---

### GET `/api/queries/all`
Retrieve all saved queries from the database.

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "prompt": "...",
      "response": "...",
      "createdAt": "..."
    }
  ]
}
```

---

## Project Structure

```
mern-task/
├── backend/
│   ├── models/
│   │   └── Query.js
│   ├── routes/
│   │   ├── ai.js
│   │   └── queries.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── InputNode.jsx
    │   │   ├── InputNode.css
    │   │   ├── ResultNode.jsx
    │   │   └── ResultNode.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Check your `MONGODB_URI` in `.env`
- Make sure your IP is whitelisted in MongoDB Atlas (go to Security → Network Access)
- Verify your username and password are correct

### "API key not valid" or "401 error"
- Copy your OpenRouter API key again from [openrouter.ai/keys](https://openrouter.ai/)
- Make sure there are no extra spaces

### "Frontend can't reach backend"
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env` matches your backend URL
- Check CORS is enabled in `backend/server.js`

### Port already in use
- In `backend/.env`, change `PORT` to a different port (e.g., 5001)
- Update `VITE_API_URL` in `frontend/.env` to match the new backend port

---

## Free Resources Used

- **OpenRouter API**: Free tier with Gemini 2.0 Flash Lite model
- **MongoDB**: Free tier (512MB storage)
- **React & Node.js**: Open source

---

## Next Steps (Optional Enhancements)

- Add authentication/login
- Deploy to Vercel (frontend) and Render (backend)
- Add more node types and flow logic
- Implement query history view
- Add real-time updates with WebSockets

