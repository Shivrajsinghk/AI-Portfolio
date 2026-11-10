import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const CHIPS = [
  'Give me a quick overview of Shivraj',
  'Tell me about his four projects',
  'How does his Resume Evaluator work?',
  'What is his experience with AWS and cloud?',
  'Tell me about his internship',
  'What are his strongest technical skills?',
  'How can I contact him?',
]

function Chat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const listRef = useRef(null)

   useEffect(() => {
        const el = listRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [messages])
    
    function updateLast(fn) {
        setMessages(prev => {
            const copy = [...prev]
            copy[copy.length - 1] = fn(copy[copy.length - 1])
            return copy
        })
    }

    async function send(text) {
        text = text.trim()
        if (!text || loading) return
        const history = [...messages, { role: 'user', content: text }]
        setMessages([...history, { role: 'assistant', content: '' }])
        setInput('')
        setLoading(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history.slice(-10) }),
            })
            if (res.status === 429) throw new Error('rate')
            if (res.status === 503) throw new Error('cap')
            if (!res.ok) throw new Error(`HTTP ${res.status}`)

            const reader = res.body.getReader()
            const decoder = new TextDecoder()
            
            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                updateLast(m => ({ ...m, content: m.content + chunk }))
            }
        } 
       catch (err) {
            const msg =
                err.message === 'rate'
                ? "You're sending messages too fast. Please wait a minute and try again."
                : err.message === 'cap'
                ? 'Neo is resting for today. Please email Shivraj at shivraj2726@gmail.com.'
                : 'Sorry, I could not reach the server. Please try again.'
            updateLast(m => ({ ...m, content: msg }))
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-full min-h-0 flex-col">
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-white/90 p-4 text-slate-800">
            {messages.length === 0 && (
                <div>
                <p className="mb-3 text-sm text-slate-600">
                    👋 Hi! I'm Neo, Shivraj's AI assistant. Ask me about his skills, projects, experience, or what he's like to work with.
                </p>
                <div className="flex flex-wrap gap-2">
                    {CHIPS.map(c => (
                    <button
                        key={c}
                        onClick={() => send(c)}
                        className="rounded-sm border border-slate-400 bg-linear-to-b from-white to-slate-200 px-3 py-1.5 text-sm hover:border-sky-500 hover:from-sky-50 hover:to-sky-200"
                    >
                        {c}
                    </button>
                    ))}
                </div>
                </div>
            )}

            {messages.map((m, i) => (
                <div
                key={i}
                className={`max-w-[88%] rounded-md border px-3.5 py-2 text-sm ${
                    m.role === 'user'
                    ? 'ml-auto border-sky-300 bg-sky-100'
                    : 'border-slate-300 bg-slate-100'
                }`}
                >
                {m.role === 'assistant' ? (
                    m.content ? (
                    <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                    ) : '…'
                ) : (
                    m.content
                )}
                </div>
            ))}
            </div>

            <form
            onSubmit={e => { e.preventDefault(); send(input) }}
            className="flex gap-2 border-t border-slate-300 bg-linear-to-b from-slate-100 to-slate-200 p-2.5"
            >
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask Neo anything about Shivraj..."
                className="flex-1 rounded-sm border border-slate-400 bg-white px-3 py-1.5 text-sm outline-none focus:border-sky-500"
            />
            <button
                disabled={loading}
                className="rounded-sm border border-sky-700 bg-linear-to-b from-sky-400 to-sky-600 px-4 py-1.5 text-sm text-white hover:from-sky-300 disabled:opacity-50"
            >
                Send
            </button>
            </form>
        </div>
    )
}

export default Chat