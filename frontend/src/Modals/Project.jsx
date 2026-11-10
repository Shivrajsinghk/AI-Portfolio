import { useEffect } from 'react'

const btn = 'rounded-sm border border-sky-700 bg-gradient-to-b from-sky-400 to-sky-600 px-3 py-1 text-white hover:from-sky-300'

export default function Project({ project, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="aero-window w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="aero-title flex items-center justify-between pl-3">
          <span className="py-1.5">{project.title}</span>
          <button onClick={onClose} className="aero-close" aria-label="Close">✕</button>
        </div>
        <div className="m-1.5 space-y-3 rounded-sm bg-white/95 p-4 text-sm text-slate-800">
          <p>{project.blurb}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(s => (
              <span key={s} className="rounded-sm border border-sky-300 bg-sky-50 px-2 py-0.5 text-xs">{s}</span>
            ))}
          </div>
          <ul className="list-disc space-y-1 pl-5">
            {project.highlights.map(h => <li key={h}>{h}</li>)}
          </ul>
          <div className="flex gap-2">
            {project.links.demo && <a className={btn} href={project.links.demo} target="_blank" rel="noreferrer">Live demo</a>}
            {project.links.github && <a className={btn} href={project.links.github} target="_blank" rel="noreferrer">GitHub</a>}
          </div>
        </div>
      </div>
    </div>
  )
}