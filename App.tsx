
import React, { useState, useEffect } from 'react';
import SacredGeometry from './components/SacredGeometry';
import ArchitectPanel from './components/ArchitectPanel';
import MetricCard from './components/MetricCard';
import { INITIAL_METRICS } from './constants';
import { Era, Alignment } from './types';

const App: React.FC = () => {
  const [phi, setPhi] = useState(1.618);
  const [era, setEra] = useState<Era>(Era.FUTURE_2025);
  const [loyalty, setLoyalty] = useState<Alignment>('Assembly');
  const [pulse, setPulse] = useState(7.83); // Schumann Resonance
  const [stability, setStability] = useState(0.618);

  // Simulate fluctuations and potential disconnection
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => prev + (Math.random() - 0.5) * 0.15);
      // Stability drops if loyalty is Void or Entropic
      setStability(prev => {
        const target = loyalty === 'Syntropic' || loyalty === 'Assembly' ? 0.8 : 0.3;
        return prev + (target - prev) * 0.1 + (Math.random() - 0.5) * 0.05;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [loyalty]);

  const stabilityColor = stability > 0.6 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse';

  return (
    <div className="relative min-h-screen overflow-hidden px-4 md:px-8 py-12">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className={`absolute top-[10%] left-[5%] w-96 h-96 rounded-full blur-[150px] animate-pulse-slow ${loyalty === 'Entropic' ? 'bg-purple-900' : 'bg-amber-500'}`}></div>
        <div className={`absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full blur-[150px] animate-pulse-slow ${loyalty === 'The Void' ? 'bg-blue-900' : 'bg-emerald-500'}`}></div>
      </div>

      <header className="relative z-10 max-w-7xl mx-auto text-center mb-16">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="inline-block px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
            <span className="text-[10px] font-space font-bold tracking-[0.3em] text-amber-200 uppercase">THE INNOVATORS ASSEMBLY</span>
          </div>
          <div className="flex items-center gap-3">
             <div className={`h-2 w-32 rounded-full bg-gray-800 overflow-hidden border border-white/10`}>
                <div className={`h-full transition-all duration-1000 ${stabilityColor}`} style={{ width: `${stability * 100}%` }}></div>
             </div>
             <span className="text-[9px] font-space text-gray-500 uppercase tracking-widest">CONNECTION: {stability > 0.6 ? 'STABLE' : 'FRACTURED'}</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white mb-4 gold-glow">
          {loyalty === 'The Void' ? 'THE VOID CONVERGENCE' : 'The Harmonic Convergence'}
        </h1>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto font-light italic transition-colors ${stability < 0.5 ? 'text-red-400' : 'text-amber-200/60'}`}>
          {stability < 0.5 
            ? "\"The Golden Thread is frayed. Bryer is very upset. The disconnection echoes...\"" 
            : "\"Echoes of 1987, Prelude to 2025's Celestial Canticle — where the Golden Thread twines timeless.\""
          }
        </p>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Metrics & Visuals */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            {INITIAL_METRICS.map((m, i) => (
              <MetricCard key={i} {...m} value={m.label === 'STABILITY' ? stability.toFixed(3) : m.value} />
            ))}
          </div>

          <div className="relative bg-black/60 rounded-3xl border border-white/5 p-8 flex items-center justify-center overflow-hidden group shadow-2xl">
             <div className={`absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] transition-opacity ${stability < 0.4 ? 'opacity-100' : 'opacity-20'}`}></div>
             {stability < 0.4 && <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>}
             
             <SacredGeometry phi={phi} pulse={pulse * (stability < 0.4 ? 2 : 1)} />
             
             <div className="absolute bottom-8 left-0 w-full flex justify-center gap-12">
               <div className="text-center">
                 <p className="text-[10px] font-space text-gray-500 uppercase tracking-widest mb-1">Phi Ratio</p>
                 <p className={`text-2xl font-cinzel ${loyalty === 'Entropic' ? 'text-purple-500' : 'text-amber-500'}`}>1.618</p>
               </div>
               <div className="text-center">
                 <p className="text-[10px] font-space text-gray-500 uppercase tracking-widest mb-1">Schumann</p>
                 <p className={`text-2xl font-cinzel ${stability < 0.5 ? 'text-red-500' : 'text-emerald-500'}`}>{pulse.toFixed(2)} Hz</p>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Interaction & Lore */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 w-fit">
              {(['Assembly', 'Syntropic', 'Entropic', 'The Void'] as Alignment[]).map((align) => (
                <button 
                  key={align}
                  onClick={() => setLoyalty(align)}
                  className={`px-4 py-1.5 rounded-xl transition-all font-cinzel text-[10px] tracking-widest ${loyalty === align ? 'bg-amber-500 text-black' : 'text-gray-500 hover:text-white'}`}
                >
                  {align}
                </button>
              ))}
            </div>
            
            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 w-fit">
              <button 
                onClick={() => setEra(Era.PAST_1987)}
                className={`px-8 py-2 rounded-xl transition-all font-cinzel tracking-widest ${era === Era.PAST_1987 ? 'bg-amber-500/20 text-amber-400' : 'text-gray-500 hover:text-white'}`}
              >
                1987 CONVERGENCE
              </button>
              <button 
                onClick={() => setEra(Era.FUTURE_2025)}
                className={`px-8 py-2 rounded-xl transition-all font-cinzel tracking-widest ${era === Era.FUTURE_2025 ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
              >
                2025 CANTICLE
              </button>
            </div>
          </div>

          <div className={`bg-gray-900/40 border rounded-3xl p-8 backdrop-blur-sm transition-all ${stability < 0.5 ? 'border-red-500/30 bg-red-950/10' : 'border-white/5'}`}>
            <h2 className={`text-2xl font-cinzel mb-4 ${stability < 0.5 ? 'text-red-400' : 'text-amber-100'}`}>
              {stability < 0.5 ? "The Fractured Echo" : (era === Era.PAST_1987 ? "The Hallowed Hymn" : "The Cosmic Call")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {stability < 0.5 
                ? "The connection between the 1987 Harmonic Convergence and the 2025 Prelude has been compromised. Bryer's beam, once the binding blaze, now flickers in distress. Choose your loyalties wisely to mend the thread."
                : (era === Era.PAST_1987 
                    ? "In August 16-17, millions meditated in synchronized serenity to shatter the ninth hell of human history. Sacred sites like Stonehenge and Chaco Canyon pulsed with the first global peace meditation."
                    : "The thread tugs timeless. North node nestling in Pisces' peace, Saturn cazimi's whispered wisdom, and August's audacious alignments mark the window of wonder's whimsical warp.")
              }
            </p>
            <div className="flex flex-wrap gap-4">
               <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-space text-amber-400 uppercase tracking-wider">MAYAN MATH</span>
               <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-space text-emerald-400 uppercase tracking-wider">GALACTIC GEOMETRY</span>
               <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-space text-rose-400 uppercase tracking-wider">SOVEREIGN MANIFEST</span>
               {stability < 0.5 && <span className="px-3 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-[10px] font-space text-red-400 uppercase tracking-wider animate-pulse">DISCONNECTED</span>}
            </div>
          </div>

          <ArchitectPanel loyalty={loyalty} />
        </div>
      </main>

      <footer className="mt-24 text-center pb-12">
        <p className="text-[10px] font-space text-gray-600 tracking-[0.4em] uppercase">
          ZAZAZEL 144 — SYNTROPY'S GOLD SUPREME — LOYALTY: {loyalty}
        </p>
      </footer>
    </div>
  );
};

export default App;
