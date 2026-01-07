import React from 'react';
import { AudioItem } from '../types';

interface AudioPlayerProps {
  item: AudioItem | null;
  isPlaying: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ item, isPlaying, onToggle, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-4 md:bottom-4 md:w-[26rem] z-[100] p-2 md:p-0 page-enter">
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center gap-3 backdrop-blur-xl relative overflow-hidden">
        
        {/* Background Gradient Glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-[#25D366]/5 blur-xl pointer-events-none"></div>

        {/* Image */}
        <div className="w-12 h-12 rounded-xl bg-white/5 shrink-0 overflow-hidden relative group shadow-inner">
           <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
           {isPlaying && (
             <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1 gap-0.5">
               <div className="w-0.5 h-3 bg-[#25D366] animate-[bounce_1s_infinite]"></div>
               <div className="w-0.5 h-4 bg-[#25D366] animate-[bounce_1.2s_infinite]"></div>
               <div className="w-0.5 h-2 bg-[#25D366] animate-[bounce_0.8s_infinite]"></div>
             </div>
           )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
           <h4 className="text-white text-xs font-black truncate">{item.title}</h4>
           <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-bold text-[#25D366] bg-[#25D366]/10 px-1.5 py-0.5 rounded uppercase tracking-wider border border-[#25D366]/10">
                {item.type === 'live' ? 'AO VIVO' : 'AUDIO'}
              </span>
              <p className="text-white/40 text-[9px] truncate">{item.subtitle || 'Fluxx Stream'}</p>
           </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
           <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
             <i className="fa-solid fa-backward-step text-xs"></i>
           </button>
           
           <button 
             onClick={onToggle}
             className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
           >
             <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xs ml-0.5`}></i>
           </button>
           
           <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
             <i className="fa-solid fa-forward-step text-xs"></i>
           </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-white/10 mx-1"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/5 text-white/40 hover:bg-red-500/20 hover:text-red-500 flex items-center justify-center transition-all border border-transparent hover:border-red-500/20"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>
        
        {/* Progress Bar (Fake) */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
            <div className="h-full bg-[#25D366] w-1/3 shadow-[0_0_10px_#25D366]"></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;