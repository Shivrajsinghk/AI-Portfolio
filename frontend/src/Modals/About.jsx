
import { useEffect } from 'react'

export default function AboutModal({ onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="aero-window w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="aero-title flex items-center justify-between pl-3">
          <span className="py-1.5">About Me</span>
          <button
            onClick={onClose}
            className="aero-close"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="m-1.5 space-y-3 rounded-sm bg-white/95 p-4 text-sm text-slate-800">
          <h2 className="text-lg font-semibold">
            Shivraj Singh Kushwah
          </h2>

          <p>
            B.Tech Computer Science student at IPS Academy, Indore
            (2023–2027). I recently completed my Software Development
            Internship at Swasthya Chetna (June–September 2026),
            where I primarily worked on backend and database features.
          </p>

          <p>
            I enjoy building full-stack applications, solving problems,
            and learning new technologies by putting them into practice.
          </p>

          <p>
            Outside coding, I write my own songs, rap and sing.
            I also enjoy stepping away from screens with a pen and paper.
          </p>

          <p className="text-slate-600">
            📍 Indore, India &nbsp;·&nbsp; 🗣️ English, Hindi
          </p>
        </div>
      </div>
    </div>
  )
}
