
import React from 'react';
import { AudioItem } from '../types';

interface AudioPlayerProps {
  item: AudioItem | null;
  isPlaying: boolean;
  onToggle: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ item, isPlaying, onToggle }) => {
  if (!item) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex items-center gap-4 shadow-2xl">
        <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover shadow-lg" />
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-bold truncate">{item.title}</h4>
          <p className="text-white/50 text-[10px] truncate">{item.subtitle || 'Fluxx Stream'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-white/80 hover:text-white transition-colors">
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button 
            onClick={onToggle}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} ml-0.5`}></i>
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
