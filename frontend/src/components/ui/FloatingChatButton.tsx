import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, MessageSquare, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useClickOutside } from '../../hooks/useClickOutside';

export const FloatingChatButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hi — I'm your AI Resume helper. Ask me to draft summaries, suggest skills, or check formatting." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const portalNodeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      try {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      } catch (e) {
        // fallback for older browsers
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
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

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMessage = { sender: 'user' as const, text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Send request to backend
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || localStorage.getItem('resume_ai_token')}`
        },
        body: JSON.stringify({
          message: text,
          history: messages // send previous messages for context
        })
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  useClickOutside(containerRef, () => {
    if (open) setOpen(false);
  });

  const portalContent = (
    <div ref={containerRef}>
      {/* Chat Panel (dark themed) */}
      <div
        className={`fixed z-50 right-6 bottom-20 transform transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'}`}
        style={{ right: 'calc(env(safe-area-inset-right, 0px) + 1.5rem)' }}
      >
        <div className="w-80 max-w-xs bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col" style={{ height: 480 }}>
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-white" />
              <div className="text-sm font-bold text-white">AI Chat</div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-md text-white/90 hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="p-3 flex-1 overflow-y-auto space-y-3 bg-slate-900">
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

          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-900 flex-shrink-0">
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
    </div>
  );

  if (!portalNodeRef.current) return null;
  return createPortal(portalContent, portalNodeRef.current);
};

export default FloatingChatButton;
