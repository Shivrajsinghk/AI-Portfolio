import { useEffect, useState } from 'react'

const EMAIL = 'shivraj2726@gmail.com'
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent('Hello from your portfolio')}`

const LINKS = [
  { label: 'Resume', href: 'https://drive.google.com/file/d/1VGuplBiCDwYlk7gK51Rd-EhvEu4RAmDZ/view?usp=drive_link' },
  { label: 'GitHub', href: 'https://github.com/Shivrajsinghk' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shivrajsinghkushwah' },
  { label: 'Email', href: GMAIL },
]
const btn =
  'whitespace-nowrap rounded border border-white/30 bg-white/10 px-4 py-1 text-xs text-white hover:bg-white/25'

export default function Taskbar() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="flex h-11 shrink-0 items-center gap-2 border-t border-white/50 bg-slate-900/55 px-2 backdrop-blur-md">
      <div className="orb mr-2 shrink-0">S</div>
      <nav className="flex flex-1 gap-3 overflow-x-auto">
        {LINKS.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={btn}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="shrink-0 text-center text-[11px] leading-tight text-white">
        <div>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
        <div className="hidden sm:block">{now.toLocaleDateString()}</div>
      </div>
    </footer>
  )
}
