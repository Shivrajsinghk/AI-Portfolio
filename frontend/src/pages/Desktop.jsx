import { useState } from 'react'
import Chat from '../components/Chat'
import Taskbar from '../components/Taskbar'
import About from '../Modals/About'
import Project from '../Modals/Project'
import { ICONS } from '../projects'

const iconClass =
  'flex w-20 shrink-0 flex-col items-center gap-1 rounded border border-transparent p-1.5 hover:border-white/50 hover:bg-white/20'

function IconBody({ icon }) {
  return (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/70 bg-linear-to-b from-white/70 to-sky-300/60 text-2xl shadow-lg">
        {icon.icon}
      </span>
      <span className="text-center text-xs text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]">
        {icon.name}
      </span>
    </>
  )
}

export default function Desktop() {
  const [open, setOpen] = useState(null)
  const [chatOpen, setChatOpen] = useState(() => window.innerWidth >= 768)

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <main className="relative min-h-0 flex-1 overflow-hidden">
        <div
  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-300 ${
    chatOpen ? 'md:pl-36 md:pr-120' : ''
  }`}
>
  <h1
    className={`select-none px-4 text-center font-['Londrina_Solid'] font-black tracking-wide text-white [text-shadow:0_0_22px_rgba(255,255,255,0.5),0_4px_14px_rgba(0,40,120,0.85)] ${
      chatOpen ? 'text-5xl lg:text-6xl xl:text-7xl' : 'text-6xl md:text-8xl'
    }`}
  >
    Shivraj's Portfolio
  </h1>
</div>
        <nav className="flex gap-1 overflow-x-auto p-2 md:w-36 md:flex-col md:overflow-visible md:p-4">
          {ICONS.map(icon =>
            icon.type === 'link' ? (
              <a key={icon.id} href={icon.href} target="_blank" rel="noreferrer" className={iconClass}>
                <IconBody icon={icon} />
              </a>
            ) : (
              <button key={icon.id} onClick={() => setOpen(icon)} className={iconClass}>
                <IconBody icon={icon} />
              </button>
            )
          )}
        </nav>

        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/70 bg-linear-to-b from-sky-300 to-sky-600 px-5 py-3 font-semibold text-white shadow-xl hover:from-sky-200"
          >
            💬 Ask Neo
          </button>
        )}

        <div
          className={`absolute inset-y-0 right-0 z-30 w-full p-2 transition-all duration-300 md:w-115 md:p-4 ${
            chatOpen ? 'translate-x-0' : 'invisible translate-x-full'
          }`}
        >
          <div className="aero-window flex h-full flex-col overflow-hidden">
            <div className="aero-title flex items-center justify-between pl-3">
              <span className="py-1.5">Chat with Neo</span>
              <button onClick={() => setChatOpen(false)} className="aero-close" aria-label="Close chat">✕</button>
            </div>
            <div className="mx-1.5 mb-1.5 min-h-0 flex-1 overflow-hidden rounded-sm border border-slate-500/60">
              <Chat />
            </div>
          </div>
        </div>
      </main>

      <Taskbar />
      {open && (open.type === 'about'
        ? <About onClose={() => setOpen(null)} />
        : <Project project={open} onClose={() => setOpen(null)} />)}
      </div>
  )
}