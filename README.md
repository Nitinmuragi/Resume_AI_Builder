# 🚀 AI-Powered Resume Builder

A full-stack web application where registered users can create, manage, and maintain **multiple professional resumes** with an integrated **ATS Keyword Matching Engine** — helping users optimize their resumes before applying to jobs.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Auth** | Email/Mobile + Password login, JWT sessions, forgot/reset password |
| 👤 **Profile Module** | Master data profile — fill once, reuse across all resumes |
| 📄 **Resume Builder** | 4 professional templates, live preview, drag-and-drop sections |
| 🎯 **ATS Matching** | Paste a JD → get match %, matched keywords (green), missing keywords (red) |
| 📋 **Multiple Resumes** | Up to 12 resumes per account, clone/version system |
| 📥 **PDF Export** | High-fidelity PDF matching the on-screen template exactly |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + Redux Toolkit |
| Backend | Node.js + Express.js |
| Database | MySQL + Sequelize ORM |
| Auth | JWT + bcrypt.js |
| PDF | Puppeteer (server-side) |
| NLP/ATS | Node `natural` library (TF-IDF + fuzzy matching) |
| Storage | Cloudinary (photos, PDFs) |

---

## 📁 Project Structure

```
Resume Builder/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── api/         # Axios API clients
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── templates/   # Resume template components (4 templates)
│   │   ├── store/       # Redux store & slices
│   │   └── hooks/       # Custom React hooks
│   └── package.json
│
└── server/          # Node.js + Express backend
    ├── src/
    │   ├── config/      # DB & Cloudinary config
    │   ├── models/      # Sequelize models
    │   ├── controllers/ # Route handlers
    │   ├── routes/      # Express routers
    │   ├── middlewares/ # JWT auth, error handler
    │   ├── services/    # NLP engine, PDF, upload
    │   └── utils/       # Stopwords, validators
    └── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18.x
- MySQL 8.x running locally
- (Optional) Cloudinary account for file storage

### 1. Clone / open the project

```bash
cd "Resume Builder"
```

### 2. Setup the Backend

```bash
cd server
cp .env.example .env
# Edit .env with your MySQL credentials, JWT secret, Cloudinary keys
npm install
npm run dev
```

The server starts at **http://localhost:5000**

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend starts at **http://localhost:5173**

### 4. Configure `.env` (server)

```env
PORT=5000
NODE_ENV=development

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=resume_builder
DB_USER=root
DB_PASS=yourpassword

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (for password reset - optional for dev)
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
```

> **Note:** The database tables are auto-created on server start (Sequelize sync with `alter: true`). 4 resume templates are seeded automatically on first run.

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Body |
|---|---|---|
| POST | `/api/auth/register` | `{ fullName, email, password }` or `{ fullName, mobile_no, password }` |
| POST | `/api/auth/login` | `{ email, password }` or `{ mobile_no, password }` |
| POST | `/api/auth/forgot-password` | `{ email }` |
| POST | `/api/auth/reset-password` | `{ token, newPassword }` |

### Profile
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profile` | Get full profile with all sub-entities |
| PUT | `/api/profile` | Update personal info |
| POST | `/api/profile/skills` | Add skill |
| DELETE | `/api/profile/skills/:id` | Remove skill |
| POST | `/api/profile/languages` | Add language |
| POST | `/api/profile/education` | Add education entry |
| POST | `/api/profile/experience` | Add experience |
| POST | `/api/profile/projects` | Add project |
| POST | `/api/profile/certifications` | Add certification |

### Resumes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/resumes` | List all user's resumes |
| POST | `/api/resumes` | Create new resume (max 12 enforced) |
| GET | `/api/resumes/:id` | Get specific resume |
| PUT | `/api/resumes/:id` | Update resume |
| DELETE | `/api/resumes/:id` | Delete resume |
| POST | `/api/resumes/:id/duplicate` | Clone as new version |
| GET | `/api/resumes/:id/export-pdf` | Download PDF |

### ATS Matching
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ats/check` | `{ resume_id, jd_text, jd_title? }` → returns score + keywords |
| GET | `/api/ats/history/:resume_id` | ATS check history for a resume |

### Templates
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/templates` | List all 4 templates |
| GET | `/api/templates/:id` | Get specific template |

---

## 🎯 ATS Matching Algorithm

```
Input: Resume JSON + Job Description text

Step 1: Preprocess (lowercase, remove stopwords/punctuation, tokenize)
Step 2: Extract JD keywords via TF-IDF + skills_master dictionary lookup
Step 3: Extract resume keywords from skills, experience, projects
Step 4: Match:
        - Exact token match (normalized)
        - Fuzzy match via Levenshtein distance ≤ 2
Step 5: Score = (matched / total_jd_keywords) × 100
Output: score, matched_keywords[], missing_keywords[], suggestions[]
```

---

## 🗺️ Development Roadmap

| Phase | Status | Scope |
|---|---|---|
| Phase 1 | ✅ | DB schema + Auth + Profile CRUD |
| Phase 2 | ✅ | Template selection + Resume builder |
| Phase 3 | ✅ | PDF export + Dashboard |
| Phase 4 | ✅ | ATS Keyword Matching engine |
| Phase 5 | ✅ | Drag-and-drop sections, resume duplication |
| Phase 6 | 🔲 | Deploy (Vercel + Render + Railway MySQL) |
| Phase 7 | 🔲 | Python NLP microservice / LLM semantic matching |

---

## 📜 License

MIT — built for personal/portfolio use.
