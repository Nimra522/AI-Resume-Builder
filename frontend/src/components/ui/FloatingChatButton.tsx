import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, MessageSquare, X, Loader2 } from 'lucide-react';

export const FloatingChatButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hi — I'm your AI Resume helper. Ask me to draft summaries, suggest skills, or check formatting." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const portalNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    // create a portal container attached to document.body so the fixed positioning
    // is always relative to the viewport and not affected by ancestor transforms
    const node = document.createElement('div');
    node.setAttribute('id', 'floating-chat-portal');
    portalNodeRef.current = node;
    document.body.appendChild(node);
    return () => {
      if (portalNodeRef.current && portalNodeRef.current.parentNode) {
        portalNodeRef.current.parentNode.removeChild(portalNodeRef.current);
      }
      portalNodeRef.current = null;
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Simple canned response logic
      const q = text.toLowerCase();
      let reply = "I can help with that — can you share more details?";
      if (q.includes('summary')) reply = 'Try this summary:\n\n"Results-driven professional with X years of experience delivering measurable impact. Skilled in ..."';
      if (q.includes('skills')) reply = 'Suggested skills: React, TypeScript, Node.js, SQL, Agile, Communication.';
      if (q.includes('ats') || q.includes('score')) reply = 'ATS tip: keep section headers standard, avoid images, and use plain text for contact details.';

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  const portalContent = (
    <>
      {/* Chat Panel (dark themed) */}
      <div
        className={`fixed z-50 right-6 bottom-20 transform transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'}`}
        style={{ right: 'calc(env(safe-area-inset-right, 0px) + 1.5rem)' }}
      >
        <div className="w-80 max-w-xs bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-white" />
              <div className="text-sm font-bold text-white">AI Chat</div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-md text-white/90 hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="p-3 flex-1 overflow-y-auto h-64 space-y-3 bg-slate-900">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-full ${m.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                <div className={`${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none px-3 py-2' : 'bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none px-3 py-2 text-slate-200'}`}>
                  <div className="whitespace-pre-line text-sm">{m.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center gap-2 text-xs text-slate-300">
                <Loader2 className="animate-spin text-slate-300" size={14} /> Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-3 py-2 text-sm text-slate-100 focus:outline-none"
            />
            <button type="submit" className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full disabled:opacity-50" disabled={!input.trim()}>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button (fixed bottom-right, respects safe-area) */}
      <div className="fixed z-50" style={{ right: 'calc(env(safe-area-inset-right, 0px) + 1.25rem)', bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
        <button
          onClick={() => setOpen(prev => !prev)}
          title={open ? 'Close chat' : 'Open chat'}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MessageSquare size={22} />
        </button>
      </div>
    </>
  );

  if (!portalNodeRef.current) return null;
  return createPortal(portalContent, portalNodeRef.current);
};

export default FloatingChatButton;
