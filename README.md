# ResumeAI — AI-Powered Resume & Portfolio Builder

<div align="center">

**Build stunning, ATS-optimized resumes and portfolio websites in minutes — powered by AI.**

[Live Demo](#) · [Features](#-features) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

### 🤖 AI-Powered Content
- Transform plain English into professional bullet points
- AI-enhanced summaries with strong action verbs
- ATS keyword optimization
- Resume score checker with improvement suggestions

### 🎨 5 Premium Templates
| Template | Style | Best For |
|----------|-------|----------|
| **Minimal** | Clean & simple | All industries |
| **Corporate** | Professional business | Corporate roles |
| **Creative** | Bold & colorful | Design & creative |
| **Tech** | Terminal/code theme | Developers & engineers |
| **Executive** | Sophisticated premium | Senior leadership |

### 📄 Smart Resume Builder
- Multi-step intelligent form (7 sections)
- Real-time live preview (split-screen)
- One-click PDF export
- Save & manage multiple resumes

### 🌐 Portfolio Generator
- Auto-generate a portfolio website from resume data
- Unique public URLs (e.g., `/portfolio/john-doe`)
- Dark developer-style UI with animations
- Hero, About, Skills, Projects, Experience, Contact sections

### 💰 Freemium Model
- **Free**: 1 resume, 2 templates, basic AI
- **Pro ($12/mo)**: Unlimited resumes, all templates, portfolio, advanced AI
- **Enterprise ($29/mo)**: Team collaboration, custom branding, API access

### 🔐 Authentication
- Email/password sign up & login
- Google & GitHub OAuth
- User dashboard with saved resumes

### 🎯 Additional Features
- Dark mode toggle
- Fully responsive (mobile-first)
- Smooth Framer Motion animations
- Glassmorphism UI effects
- SEO optimized

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (optional — app works with localStorage)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd resumeai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# (Optional) Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No* | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | No* | Auth secret key |
| `OPENAI_API_KEY` | No | OpenAI API key for AI features |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GITHUB_CLIENT_ID` | No | GitHub OAuth client ID |

*Required for production with auth & database features.

> **Note:** The app works fully without external APIs — it uses intelligent local AI processing for content enhancement.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **State** | Zustand |
| **Database** | PostgreSQL + Prisma |
| **Auth** | NextAuth.js |
| **PDF** | html2canvas + jsPDF |
| **AI** | Built-in AI engine (+ optional OpenAI) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── ai/route.ts          # AI enhancement API
│   │   └── resumes/route.ts     # Resume CRUD API
│   ├── auth/page.tsx            # Login/Signup page
│   ├── builder/page.tsx         # Resume builder (split-screen)
│   ├── dashboard/page.tsx       # User dashboard
│   ├── portfolio/[slug]/page.tsx # Public portfolio pages
│   ├── globals.css              # Design system & styling
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── builder/
│   │   ├── ats-score.tsx        # ATS score checker
│   │   ├── resume-form.tsx      # Multi-step form
│   │   ├── resume-preview.tsx   # Live preview
│   │   └── template-selector.tsx # Template picker
│   ├── layout/
│   │   ├── navbar.tsx           # Navigation bar
│   │   └── footer.tsx           # Footer
│   ├── templates/
│   │   └── resume-templates.tsx # 5 resume templates
│   └── ui/
│       ├── badge.tsx            # Badge component
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       └── input.tsx            # Input & Textarea components
├── lib/
│   ├── ai.ts                   # AI processing engine
│   ├── store.ts                # Zustand state management
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
└── prisma/
    └── schema.prisma            # Database schema
```

---

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Vercel Environment Variables
Set these in your Vercel project settings:
- `DATABASE_URL` (use Vercel Postgres or Neon)
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- Any OAuth provider keys

---

## 📝 License

MIT License — feel free to use this for your own projects.

---

<div align="center">
  <strong>Built with ❤️ by ResumeAI</strong>
</div>
