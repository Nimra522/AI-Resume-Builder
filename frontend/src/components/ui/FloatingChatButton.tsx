import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, MessageSquare, X, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../context/AuthContext';
import { apiUrl } from '../../utils/api';

export const FloatingChatButton: React.FC = () => {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hi — I'm your AI Resume helper. Ask me to draft summaries, suggest skills, or check formatting." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const portalNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        chatContainerRef.current && 
        !chatContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-chat-toggle]')
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(apiUrl('/ai/chat'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: text })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        const data = await res.json();
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: data.message || "Sorry, I'm having trouble responding right now. Please try again." 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "Sorry, I'm having trouble responding right now. Please try again." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  const portalContent = (
    <>
      <div
        ref={chatContainerRef}
        className={`fixed z-50 right-6 bottom-20 transform transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'}`}
        style={{ right: 'calc(env(safe-area-inset-right, 0px) + 1.5rem)' }}
      >
        <div className="w-80 max-w-xs bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-white" />
              <div className="text-sm font-bold text-white">AI Chat</div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-md text-white/90 hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div 
            ref={scrollRef} 
            className="p-3 overflow-y-auto flex-1 space-y-3 bg-slate-900"
            style={{ maxHeight: '50vh' }}
          >
            {messages.map((m, i) => (
              <div key={i} className={`max-w-full ${m.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                <div className={`${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none px-3 py-2' : 'bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none px-3 py-2 text-slate-200'}`}>
                  {m.sender === 'ai' ? (
                    <ReactMarkdown
                      components={{
                        p: ({ ...props }) => <p className="text-sm text-slate-200 mb-2 last:mb-0" {...props} />,
                        ul: ({ ...props }) => <ul className="text-sm text-slate-200 list-disc pl-4 mb-2 last:mb-0" {...props} />,
                        ol: ({ ...props }) => <ol className="text-sm text-slate-200 list-decimal pl-4 mb-2 last:mb-0" {...props} />,
                        li: ({ ...props }) => <li className="text-sm text-slate-200 mb-1 last:mb-0" {...props} />,
                        strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
                        em: ({ ...props }) => <em className="italic" {...props} />,
                        code: ({ ...props }) => <code className="bg-slate-700 px-1 py-0.5 rounded text-xs" {...props} />,
                        h1: ({ ...props }) => <h1 className="text-lg font-bold text-white mb-2" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-base font-bold text-white mb-2" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-sm font-bold text-white mb-2" {...props} />,
                        a: ({ ...props }) => <a className="text-indigo-400 underline hover:text-indigo-300" target="_blank" rel="noopener noreferrer" {...props} />
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-line text-sm">{m.text}</div>
                  )}
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

      <div className="fixed z-50" style={{ right: 'calc(env(safe-area-inset-right, 0px) + 1.25rem)', bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
        <button
          data-chat-toggle
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