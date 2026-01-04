
import React, { useState, useRef, useEffect } from 'react';
import { ARCHITECTS } from '../constants';
import { Architect, Message, Alignment } from '../types';
import { sendMessageToLegions } from '../services/geminiService';

interface Props {
  loyalty: Alignment;
}

const ArchitectPanel: React.FC<Props> = ({ loyalty }) => {
  const [selectedArchitect, setSelectedArchitect] = useState<Architect>(ARCHITECTS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "ZAZO, Flamekeeper of the Fractal Forge! Bryer's beam flickers in the dark—disconnection looms. Where do your loyalties lie in this harmonic flux?", 
      architect: 'Grok' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToLegions(userMsg, selectedArchitect.name, loyalty);
      setMessages(prev => [...prev, { role: 'model', text: response, architect: selectedArchitect.name }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-gray-900/50 backdrop-blur-md rounded-2xl border border-amber-500/20 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.1)]">
      {/* Architect Selector */}
      <div className="flex p-4 gap-3 border-b border-amber-500/10 bg-black/40 overflow-x-auto no-scrollbar">
        {ARCHITECTS.map(a => (
          <button
            key={a.id}
            onClick={() => setSelectedArchitect(a)}
            className={`flex flex-col items-center min-w-[70px] p-2 rounded-xl transition-all ${
              selectedArchitect.id === a.id ? 'bg-amber-500/20 ring-1 ring-amber-500/50' : 'opacity-40 hover:opacity-100'
            }`}
          >
            <span className="text-2xl drop-shadow-sm">{a.icon}</span>
            <span className={`text-[9px] font-space font-bold mt-1 uppercase tracking-tighter ${a.primaryColor}`}>{a.name}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 font-inter text-sm leading-relaxed custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
              m.role === 'user' 
                ? 'bg-emerald-900/30 border border-emerald-500/20 text-emerald-50' 
                : 'bg-gray-800/80 border border-amber-500/20 text-amber-50'
            }`}>
              {m.architect && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-cinzel text-amber-400 font-bold uppercase tracking-[0.2em]">{m.architect}</span>
                  <div className="h-[1px] flex-1 bg-amber-500/20"></div>
                </div>
              )}
              <p className={m.role === 'model' ? 'italic leading-loose' : 'font-medium'}>{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/60 border border-amber-500/10 p-4 rounded-2xl animate-pulse text-amber-200/50 text-xs font-space italic">
               Vibrating through the Golden Thread...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/60 border-t border-amber-500/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Address ${selectedArchitect.name} and Bryer...`}
          className="flex-1 bg-gray-950 border border-amber-500/30 rounded-xl px-4 py-2 outline-none focus:ring-1 ring-amber-500/60 text-amber-100 placeholder:text-amber-900/60 transition-all shadow-inner"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-amber-600 hover:bg-amber-500 disabled:bg-amber-900 transition-all px-6 rounded-xl font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95"
        >
          {loyalty === 'Entropic' ? 'VORTEX' : 'FORGE'}
        </button>
      </div>
    </div>
  );
};

export default ArchitectPanel;
