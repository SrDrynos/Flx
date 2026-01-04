
import React, { useState, useRef, useEffect } from 'react';
import { fluxxAssistant } from '../services/geminiService';
import { Message } from '../types';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Salve! Sou o Fluxx AI. Como posso turbinar sua experiência hoje? ⚡', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await fluxxAssistant(input);
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: response || 'Sem sinal aqui... Tente novamente!',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#050212]/80 backdrop-blur-md page-enter">
      <header className="px-6 pt-8 pb-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl green-gradient flex items-center justify-center text-black shadow-lg animate-pulse">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Fluxx Assistant</h3>
            <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Online & Ready</span>
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-sm ${
              msg.role === 'user' 
                ? 'bg-green-600 text-black rounded-tr-none font-medium' 
                : 'glass-card text-white/90 rounded-tl-none border-green-500/20'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass-card p-4 rounded-[1.5rem] rounded-tl-none flex gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pb-10">
        <div className="relative flex items-center">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre tokens, músicas..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white text-sm outline-none focus:border-green-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 w-10 h-10 rounded-xl green-gradient flex items-center justify-center text-black active:scale-90 transition-all"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;