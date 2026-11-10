
export const PROJECTS = [
  {
    id: 'tcm',
    name: 'TC&TM',
    icon: '📋',
    title: 'Team Collaboration and Task Manager',
    blurb:
      'Full-stack collaboration platform featuring team management, Kanban task tracking, real-time chat, role-based access, notifications and activity logging.',
    stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: [
      'JWT authentication and REST APIs with Django REST Framework',
      'WebSocket messaging using Django Channels and Redis',
      'File uploads using Cloudflare R2',
      'Dockerized deployment with Docker Compose and Railway',
      'CI/CD with GitHub Actions',
    ],
    links: {
      demo: 'https://frontend-production-499f.up.railway.app/',
      github: 'https://github.com/Shivrajsinghk/Team-Collaboration-and-Task-Manager',
    },
  },

  {
    id: 'shop',
    name: 'E-Comm',
    icon: '🛒',
    title: 'E-Commerce Web Application',
    blurb:
      'Full-stack e-commerce application with user authentication, product catalog management and shopping cart functionality.',
    stack: ['React', 'Django', 'JavaScript'],
    highlights: [
      'User authentication and product management',
      'Django REST APIs for backend operations',
      'Responsive React frontend',
    ],
    links: {
      demo: 'https://e-commerce-hy3v.vercel.app/',
      github: 'https://github.com/Shivrajsinghk/E-commerce',
    },
  },

  {
    id: 'resume',
    name: 'Resume Evaluator',
    icon: '📄',
    title: 'Resume Evaluator',
    blurb:
      'LLM-powered resume screening tool that evaluates candidates against job requirements and ranks them based on their match scores.',
    stack: ['Python', 'Groq API', 'Pydantic', 'PyPDF', 'python-docx'],
    highlights: [
      'Extracts structured candidate information from PDF and DOCX resumes',
      'Uses Groq API with openai/gpt-oss-20b for LLM-powered evaluation',
      'Identifies matching skills, missing skills and experience fit',
      'Generates match scores and ranks candidates by suitability',
      'Uses Pydantic for structured data validation',
    ],
    links: {
      demo: '',
      github: 'https://github.com/Shivrajsinghk/Resume-Evaluator',
    },
  },

  {
    id: 'neo',
    name: 'Neo AI',
    icon: '🤖',
    title: 'AI Portfolio – Neo',
    blurb:
      'AI-powered portfolio chatbot that lets recruiters interact with Neo to learn about Shivraj’s skills, projects, experience and background.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Groq API', 'Docker'],
    highlights: [
      'Streams AI-generated responses using FastAPI and Groq',
      'Uses four Markdown knowledge files for grounded responses',
      'Implements prompt-injection protection and IP-based rate limiting',
      'Windows 7-inspired interface with Aero-style glass design',
      'Uses a system-prompt-based architecture without RAG or a vector database',
    ],
    links: {
      demo: 'https://ai-portfolio-frontend-27t3.onrender.com',
      github: 'https://github.com/Shivrajsinghk/AI-Portfolio',
    },
  },
];

export const ICONS = [
  ...PROJECTS.map(p => ({ ...p, type: 'project' })),
  { id: 'about', name: 'About Me', icon: '👤', type: 'about' },
];
