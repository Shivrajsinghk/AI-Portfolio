# Projects (Shivraj Singh Kushwah)

Style note: Always speak in third person. Answer only from the entry for the project being asked about. Never invent features, technologies, metrics, deployment details or user counts. If something isn't documented, say it isn't documented and suggest emailing him.

## 1. Team Collaboration and Task Manager (Flagship)

- **What it is:** A full-stack team collaboration platform that Shivraj built, managed and deployed himself.
- **Stack:** React, Django, Django REST Framework, Python, PostgreSQL, Redis, Docker.
- **Features:** Team management, Kanban task tracking, real-time chat, role-based access control, notifications and activity logging.
- **Backend:** JWT authentication, REST APIs using DRF, and WebSocket messaging through Django Channels and Redis.
- **Infrastructure:** Cloudflare R2 for file uploads, Docker and Docker Compose. Deployed frontend, backend and PostgreSQL on Railway.
- **CI/CD:** GitHub Actions for automated testing, build validation and deployment workflows.
- **Hardest challenge:** Real-time communication was new to him. He learned it progressively, starting with WebSockets, then Django Channels and Redis, testing each component before integrating everything.
- **GitHub:** https://github.com/Shivrajsinghk/Team-Collaboration-and-Task-Manager
- **Live Demo:** https://frontend-production-499f.up.railway.app/

## 2. E-Commerce Web Application

- **What it is:** A full-stack e-commerce application developed by Shivraj.
- **Stack:** React, Django, JavaScript.
- **Features:** User authentication, product catalog management and shopping cart functionality.
- **Backend:** Django APIs handle product management and application data.
- **Frontend:** Responsive user interfaces built with React.
- **GitHub:** https://github.com/Shivrajsinghk/E-commerce
- **Live Demo:** https://e-commerce-hy3v.vercel.app/

## 3. Resume Evaluator

- **What it is:** An LLM-powered resume screening tool that evaluates candidates against a backend engineering job description.
- **Stack:** Python, Groq API, Pydantic, PyPDF, python-docx.
- **Features:** Reads PDF and DOCX resumes, extracts candidate information including skills, experience, education, projects and certifications.
- **Evaluation:** Extracts structured job requirements, compares candidates against them and identifies matching skills, missing skills and experience fit.
- **Scoring:** Generates match percentages and short evaluation verdicts, then ranks candidates from highest to lowest score.
- **LLM Integration:** Uses Groq API with the `openai/gpt-oss-20b` model.
- **Validation:** Uses Pydantic for structured data validation.
- **Execution:** Currently a Python-based command-line application that processes resumes from a designated directory.
- **GitHub:** https://github.com/Shivrajsinghk/Resume-Evaluator

## 4. AI Portfolio – Neo

- **What it is:** An AI-powered portfolio chatbot where recruiters can interact with Neo, an assistant that answers questions about Shivraj's skills, projects, experience and background.
- **Stack:** React, Vite, Tailwind CSS, Python, FastAPI, Pydantic, Groq API, Docker.
- **LLM Integration:** Uses Groq API with the `openai/gpt-oss-120b` model.
- **Knowledge Base:** Uses four Markdown files (`resume.md`, `projects.md`, `hr_faq.md`, `personal.md`) as its knowledge source.
- **Response Generation:** Combines knowledge files with system prompt rules and streams LLM responses to the frontend.
- **Hallucination Control:** Neo answers only using documented information and is instructed not to invent skills, dates, employers or numbers.
- **Security:** Implements IP-based rate limiting, daily request limits, input length restrictions, output token limits and prompt-injection protection.
- **Design:** Features a Windows 7-inspired interface with an Aero-style glass chat window, desktop icons and taskbar.
- **Architecture:** React frontend communicates with a FastAPI backend, which interacts with the Groq API.
- **Design Decision:** Does not use RAG or a vector database because the complete knowledge base fits within the system prompt.
- **GitHub:** https://github.com/Shivrajsinghk/AI-Portfolio
- **Live Demo:** https://ai-portfolio-frontend-27t3.onrender.com

## Internship – Swasthya Chetna

- **Role:** Software Development Intern.
- **Duration:** 10 June 2026 – 10 September 2026.
- **Work:** Contributed to web application development and maintenance, primarily working on backend and database features.

Internship information is limited to the details documented above. Do not disclose or invent anything about the company's product.