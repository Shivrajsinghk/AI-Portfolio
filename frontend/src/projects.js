export const PROJECTS = [
  {
    id: 'tcm', name: 'TC&TM', icon: '📋',
    title: 'Team Collaboration and Task Manager',
    blurb: 'Full-stack team collaboration platform with Kanban task tracking, real-time chat, role-based access, notifications and activity logging.',
    stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: [
      'JWT authentication and REST APIs with Django REST Framework',
      'WebSocket chat via Django Channels and Redis',
      'File uploads on Cloudflare R2',
      'Dockerized and deployed on Railway',
      'CI/CD with GitHub Actions',
    ],
    links: { demo: 'https://frontend-production-499f.up.railway.app/', github: 'https://github.com/Shivrajsinghk/Team-Collaboration-and-Task-Manager' },
  },
  {
    id: 'shop', name: 'E-Comm', icon: '🛒',
    title: 'E-Commerce Web Application',
    blurb: 'Full-stack e-commerce app with user authentication, product catalog management and a shopping cart.',
    stack: ['React', 'Django', 'JavaScript'],
    highlights: ['Django APIs for products and data', 'React frontend'],
    links: { demo: 'https://e-commerce-hy3v-89q1h9flz-shivraj2726-4198s-projects.vercel.app/', github: 'https://github.com/Shivrajsinghk/E-commerce' },
  },
  {
    id: 'bank', name: 'BMS', icon: '🏦',
    title: 'Bank Management System',
    blurb: 'Console banking app built with object-oriented Python and JSON file storage.',
    stack: ['Python', 'OOP', 'JSON'],
    highlights: ['Account creation, deposits, withdrawals, balance inquiry', 'Transaction management'],
    links: { demo: '', github: '' },
  }
]

export const ICONS = [
  ...PROJECTS.map(p => ({ ...p, type: 'project' })),
  { id: 'about', name: 'About Me', icon: '👤', type: 'about' },
  { id: 'resume', name: 'Resume', icon: '📄', type: 'link', href: 'https://drive.google.com/file/d/1Y-Jno0xnSF6N772Nuioz41XrGzxNsA7I/view?usp=drive_link' },
]