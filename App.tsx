
import React, { useState } from 'react';
import { ViewState, AdminSubView, UserAccount, WithdrawalRequest, PendingContent } from './types';
import Chat from './components/Chat';

// --- Mocks e Dados ---
const INITIAL_USERS: UserAccount[] = [
  { id: '1', name: 'Gabriel Silva', role: 'Master', status: 'Ativo', earnings: 54000 },
  { id: '2', name: 'Ana Souza', role: 'Artista', status: 'Ativo', earnings: 12000 },
  { id: '3', name: 'Pedro Lima', role: 'Usuario', status: 'Ativo', earnings: 450 },
  { id: '4', name: 'Carla Menezes', role: 'Criador', status: 'Suspenso', earnings: 0 },
  { id: '5', name: 'Ricardo Mix', role: 'Artista', status: 'Ativo', earnings: 8900 },
];

const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  { id: 'w1', userId: '2', userName: 'Ana Souza', amount: 2500, status: 'Pendente', date: '2024-05-20' },
  { id: 'w2', userId: '5', userName: 'Ricardo Mix', amount: 1200, status: 'Pendente', date: '2024-05-21' },
];

const PROFILE_REELS = Array.from({ length: 9 }, (_, i) => ({
  id: `r${i}`,
  thumb: `https://picsum.photos/400/600?random=${i + 100}`
}));

const PROFILE_RADIOS = [
  { id: 'rd1', name: 'Hyper Pop FM', logo: 'https://picsum.photos/200/200?random=10' },
  { id: 'rd2', name: 'Cyberpunk Radio', logo: 'https://picsum.photos/200/200?random=11' },
  { id: 'rd3', name: 'Fluxx Gold', logo: 'https://picsum.photos/200/200?random=12' },
  { id: 'rd4', name: 'Deep Web Beats', logo: 'https://picsum.photos/200/200?random=13' },
  { id: 'rd5', name: 'NFT Station', logo: 'https://picsum.photos/200/200?random=14' },
];

const PROFILE_STORE = [
  { id: 's1', name: 'Fluxx VIP Pass', price: '500 PROTO', img: 'https://picsum.photos/400/400?random=20' },
  { id: 's2', name: 'Cyber Headphones', price: '1200 PROTO', img: 'https://picsum.photos/400/400?random=21' },
  { id: 's3', name: 'NFT Collectible #04', price: '3000 PROTO', img: 'https://picsum.photos/400/400?random=22' },
  { id: 's4', name: 'Skin Exclusive FLX', price: '850 PROTO', img: 'https://picsum.photos/400/400?random=23' },
];

const PROFILE_ALBUMS = [
  { id: 'alb-1', title: 'GENESIS', artist: 'GABRIEL SILVA', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400' },
  { id: 'alb-2', title: 'CYBER CITY', artist: 'GABRIEL SILVA', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400' },
  { id: 'alb-3', title: 'MOON MISSION', artist: 'GABRIEL SILVA', cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400' },
  { id: 'alb-4', title: 'DEEP WEB', artist: 'GABRIEL SILVA', cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400' },
  { id: 'alb-5', title: 'GREEN GOLD', artist: 'GABRIEL SILVA', cover: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400' },
];

const PROFILE_SONGS = Array.from({ length: 10 }, (_, i) => ({
  id: `tr-${i}`,
  title: `Premium Single ${i + 1}`,
  artist: 'Gabriel Silva',
  duration: '03:45'
}));

// --- Admin Sub-views ---

const AdminSidebar: React.FC<{ current: AdminSubView; onChange: (v: AdminSubView) => void }> = ({ current, onChange }) => {
  const menuItems: { id: AdminSubView; icon: string; label: string }[] = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
    { id: 'users', icon: 'fa-users', label: 'Usuários' },
    { id: 'tokens', icon: 'fa-coins', label: 'Tokens' },
    { id: 'moderation', icon: 'fa-shield-halved', label: 'Moderação' },
    { id: 'store', icon: 'fa-store', label: 'Lojas' },
    { id: 'reports', icon: 'fa-file-invoice', label: 'Relatórios' },
    { id: 'settings', icon: 'fa-satellite-dish', label: 'Lives' },
  ];

  return (
    <div className="w-16 sm:w-20 h-full flex flex-col bg-black/40 border-r border-white/5 py-8 items-center shrink-0">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-6 flex items-center justify-center transition-all relative group ${
            current === item.id 
              ? 'bg-[#25D366] text-black shadow-[0_0_20px_rgba(37,211,102,0.4)]' 
              : 'text-white/20 hover:text-white/40'
          }`}
        >
          <i className={`fa-solid ${item.icon} text-base sm:text-xl`}></i>
          <span className="absolute left-full ml-4 px-2 py-1 bg-[#25D366] text-black text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap uppercase tracking-widest">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// --- View de Reels (Live Experience Fiel às Referências) ---

const ReelsLiveView: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="flex-1 relative bg-black overflow-hidden h-full flex flex-col page-enter">
      {/* Background Video Mock (Vertical Fullscreen) */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=1080" 
          className="w-full h-full object-cover" 
          alt="Live Streamer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
      </div>

      {/* Top Layer: UI Overlays */}
      <div className="relative z-10 p-4 pt-10 flex flex-col gap-2">
        
        {/* Row 1: Profile & Top Viewers */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xl p-1 rounded-full border border-white/10 pr-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full object-cover border-2 border-purple-500" />
              <div className="absolute -bottom-1 -right-1 bg-purple-600 text-[6px] font-black px-1.5 py-0.5 rounded-sm border border-black uppercase">VIP</div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white tracking-tighter">PAOLA_OFFICIAL</span>
              <span className="text-[8px] font-bold text-white/60 flex items-center gap-1">
                <i className="fa-solid fa-gem text-yellow-400 text-[7px]"></i> 3474
              </span>
            </div>
            <button className="ml-2 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs active:scale-90 transition-transform">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 mr-2">
               <div className="w-8 h-8 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center text-[9px] font-black">B 32</div>
               <div className="w-8 h-8 rounded-full border-2 border-pink-400 overflow-hidden"><img src="https://picsum.photos/50/50?random=1" className="w-full h-full object-cover"/></div>
               <div className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden"><img src="https://picsum.photos/50/50?random=2" className="w-full h-full object-cover"/></div>
            </div>
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black text-white">19</div>
            <button className="text-white/80 text-2xl ml-1"><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        {/* Row 2: Ranking Info */}
        <div className="flex justify-between items-center mt-1 px-1">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
            <i className="fa-solid fa-clock text-[#25D366] text-[8px] animate-pulse"></i>
            <span className="text-[9px] font-black text-white/90 uppercase tracking-widest">Ranking por Hora</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 text-[9px] font-black text-white/80 uppercase">
             <i className="fa-solid fa-table-cells-large text-[8px]"></i> mais &gt;
          </div>
        </div>

        {/* Left Side Floating: Festival & Program */}
        <div className="flex flex-col gap-3 mt-4 w-fit">
          <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 p-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-3 w-44">
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase italic leading-none">FESTIVAL</span>
               <span className="text-[6px] font-bold text-white/50 uppercase tracking-tighter">DE DIAMANTES</span>
             </div>
             <div className="flex-1 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-gem text-blue-300 text-xs"></i>
             </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 w-36">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Programação</p>
              <i className="fa-solid fa-chevron-up text-[8px] text-white/20"></i>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-music text-purple-400 text-[8px]"></i>
                <span className="text-[9px] font-bold text-white/80 truncate">sonho</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-heart text-pink-400 text-[8px]"></i>
                <span className="text-[9px] font-bold text-white/80 truncate">romântico</span>
              </div>
              <p className="text-[8px] font-black text-white/40 uppercase mt-2 border-t border-white/5 pt-1">Mais</p>
            </div>
          </div>
        </div>

        {/* Right Side Floating: Desejos & Gifts */}
        <div className="absolute top-24 right-4 flex flex-col gap-3 items-end">
           <div className="bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/5 flex flex-col items-center min-w-[50px]">
             <span className="text-[8px] font-black text-white/60 uppercase">Desejos</span>
             <span className="text-[10px] font-black text-pink-500">0/5</span>
           </div>
           <div className="flex flex-col gap-2">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center relative">
                 <img src="https://picsum.photos/50/50?random=10" className="w-8 h-8 object-contain" />
                 <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] font-black px-1 rounded-full">3</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
                 <i className="fa-solid fa-gift text-lg text-yellow-400"></i>
              </div>
           </div>
           <div className="mt-8 flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 flex items-center justify-center shadow-2xl border-2 border-white/20">
                 <i className="fa-solid fa-box-open text-2xl text-white"></i>
              </div>
              <span className="text-[8px] font-black text-white uppercase tracking-tighter bg-purple-600 px-2 py-0.5 rounded-full">Live Bônus</span>
           </div>
        </div>
      </div>

      {/* Middle Layer: Live Counter & Interactive Prompt */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-none w-full">
        <div className="bg-purple-600/50 backdrop-blur-xl px-10 py-3 rounded-full border border-white/30 flex items-center gap-3 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
           <i className="fa-solid fa-bolt text-yellow-400 text-xl animate-pulse"></i>
           <span className="text-3xl font-black text-white italic tracking-tighter">6.300</span>
        </div>
        <div className="text-center">
           <p className="text-[#25D366] text-sm font-black uppercase tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">AJUDA-ME ⚡</p>
           <p className="text-white text-base font-black uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1">TOQUE NO TROMPETE</p>
           <p className="text-yellow-400 text-2xl font-black uppercase italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">EMBAIXO 👇</p>
        </div>
      </div>

      {/* Bottom Layer: Chat, Disclaimer & Actions */}
      <div className="mt-auto relative z-10 p-4 space-y-4">
        
        {/* Ad Banner (K58 Style) */}
        <div className="bg-white rounded-2xl overflow-hidden w-48 ml-auto border-2 border-orange-500 shadow-2xl relative animate-fadeIn">
          <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center text-[10px] z-10 hover:bg-black transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="h-28 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
          </div>
          <div className="p-3 text-center bg-white">
            <p className="text-xs font-black text-black tracking-tighter">K58.COM</p>
            <p className="text-[9px] text-black/40 font-bold leading-tight my-2">Ganhe muito com pouco investimento inicial...</p>
            <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-[9px] font-black py-2 rounded-lg uppercase shadow-lg active:scale-95 transition-transform">Cadastrar-se agora</button>
          </div>
        </div>

        {/* Dynamic Live Chat & Disclaimer */}
        <div className="max-w-[85%] space-y-3">
          {showDisclaimer && (
            <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/5 relative group">
               <button onClick={() => setShowDisclaimer(false)} className="absolute -top-2 -right-2 text-white/30 hover:text-white transition-colors">
                 <i className="fa-solid fa-circle-xmark text-lg"></i>
               </button>
               <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                 <span className="text-[#25D366] font-black uppercase mr-1">Aviso:</span>
                 Jogo e outros comportamentos impróprios são estritamente proibidos na plataforma Fluxx Stream. Temos o direito de suspender infratores graves.
               </p>
            </div>
          )}

          {/* Simple Floating Chat Mock */}
          <div className="space-y-2 max-h-32 overflow-hidden mask-fade-top">
             <div className="flex gap-2 items-start">
               <span className="text-[10px] font-black text-blue-400 uppercase">Marcos_99:</span>
               <span className="text-[10px] text-white/80 font-medium">Essa live tá absurda! 💎🚀</span>
             </div>
             <div className="flex gap-2 items-start">
               <span className="text-[10px] font-black text-pink-400 uppercase">Ju_FLX:</span>
               <span className="text-[10px] text-white/80 font-medium">Como ganha o token PROTO? ⚡</span>
             </div>
          </div>
        </div>

        {/* Main Interaction Bar */}
        <div className="flex items-center gap-2 pb-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 px-5 py-3.5 flex items-center">
             <input type="text" placeholder="Diga algo..." className="bg-transparent text-white text-xs outline-none w-full placeholder:text-white/30 font-bold" />
          </div>
          
          <button className="w-12 h-12 rounded-full bg-orange-600/90 flex flex-col items-center justify-center text-white border border-white/20 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-coins text-sm"></i>
             <span className="text-[7px] font-black mt-0.5 tracking-tighter">EL PELO</span>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-green-500/80 flex items-center justify-center text-white border border-white/20 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-martini-glass-citrus text-lg"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-microphone-slash text-base"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-ellipsis text-base"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white border border-white/30 animate-pulse active:scale-90 transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)]">
             <i className="fa-solid fa-gift text-lg"></i>
          </button>
        </div>
      </div>

      <style>{`
        .mask-fade-top {
          -webkit-mask-image: linear-gradient(to top, black 80%, transparent 100%);
          mask-image: linear-gradient(to top, black 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

// --- Sub-views de Admin (Dashboard, Users, Moderation, Tokens, Settings) ---

const AdminDashboardView: React.FC = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Usuários Totais', val: '12,482', icon: 'fa-users', trend: '+12%' },
        { label: 'Tokens em Circulação', val: '4.5M', icon: 'fa-coins', trend: '+5%' },
        { label: 'Volume Streaming', val: '1.2M', icon: 'fa-play', trend: '+28%' },
        { label: 'Market Capital', val: 'R$ 540k', icon: 'fa-wallet', trend: '+3%' },
      ].map((stat, i) => (
        <div key={i} className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
               <i className={`fa-solid ${stat.icon} text-green-500/40 text-sm`}></i>
            </div>
            <span className="text-[8px] sm:text-[9px] font-black text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-full">{stat.trend}</span>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-black text-white">{stat.val}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-white/5 p-5 sm:p-6 rounded-3xl border border-white/5 flex flex-col gap-6">
      <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#25D366]">Fluxo Econômico</h3>
      <div className="h-48 flex items-end gap-1 px-1 bg-black/40 rounded-xl p-4">
        {[0.8, 0.4, 0.5, 0.9, 0.7, 1.0, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.2, 0.8, 0.5, 0.9, 0.3, 0.6].map((v, i) => (
          <div key={i} className="flex-1 bg-green-900/40 hover:bg-[#25D366] transition-colors rounded-t-sm" style={{ height: `${v * 100}%` }} />
        ))}
      </div>
    </div>
  </div>
);

const AdminUsersView: React.FC = () => {
  const [users] = useState<UserAccount[]>(INITIAL_USERS);
  const [filter, setFilter] = useState<'Tudo' | 'Artista' | 'Criador' | 'Usuario'>('Tudo');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Gestão de Usuários e Artistas</h3>
          <p className="text-[9px] text-white/40 uppercase mt-1 tracking-widest">Controle total de acessos e privilégios</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#25D366] text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase active:scale-95 transition-all shadow-lg shadow-green-500/20">
            <i className="fa-solid fa-user-plus mr-2"></i> Adicionar Conta
          </button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['Tudo', 'Artista', 'Criador', 'Usuario'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-[#25D366] text-black' : 'bg-white/5 text-white/40 border border-white/5'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.filter(u => filter === 'Tudo' || u.role === filter).map(u => (
          <div key={u.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[#25D366]/30 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[#25D366] font-black text-lg shadow-inner">
                {u.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase truncate text-white">{u.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[8px] font-bold text-white/30 tracking-[0.2em] uppercase">{u.role}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'Ativo' ? 'bg-[#25D366]' : 'bg-red-500'}`}></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-black/20 p-2 rounded-lg text-center">
                <p className="text-[7px] text-white/20 uppercase font-black">Ganhos</p>
                <p className="text-[10px] font-black text-[#25D366]">{u.earnings} <span className="text-[7px]">PROTO</span></p>
              </div>
              <div className="bg-black/20 p-2 rounded-lg text-center">
                <p className="text-[7px] text-white/20 uppercase font-black">Status</p>
                <p className={`text-[9px] font-black uppercase ${u.status === 'Ativo' ? 'text-blue-400' : 'text-red-400'}`}>{u.status}</p>
              </div>
            </div>
            <div className="flex gap-1.5 border-t border-white/5 pt-4">
              <button title="Editar" className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#25D366]/20 text-[#25D366] transition-all border border-white/5"><i className="fa-solid fa-pen-to-square text-xs"></i></button>
              <button title="Bloquear" className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-yellow-500/20 text-yellow-500 transition-all border border-white/5"><i className="fa-solid fa-ban text-xs"></i></button>
              <button title="Banir" className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500/20 text-red-500 transition-all border border-white/5"><i className="fa-solid fa-skull text-xs"></i></button>
              <button title="Remover" className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-600 text-white transition-all border border-white/5"><i className="fa-solid fa-trash-can text-xs"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminModerationView: React.FC = () => {
  const [tab, setTab] = useState<'Músicas' | 'Reels' | 'Rádios' | 'Podcasts'>('Músicas');
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Central de Moderação</h3>
        <button className="bg-[#25D366] text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase active:scale-95 transition-all">
          <i className="fa-solid fa-plus mr-2"></i> Adicionar {tab.slice(0, -1)}
        </button>
      </div>
      <div className="flex gap-4 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit overflow-x-auto scrollbar-hide">
        {['Músicas', 'Reels', 'Rádios', 'Podcasts'].map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${tab === t ? 'bg-[#25D366] text-black' : 'text-white/40 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden group flex flex-col">
            <div className="aspect-video relative overflow-hidden bg-black">
               <img src={`https://picsum.photos/400/225?random=${i + 300}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                 <button className="w-10 h-10 rounded-full bg-[#25D366] text-black shadow-xl"><i className="fa-solid fa-play ml-1"></i></button>
               </div>
               {i % 3 === 0 && (
                 <div className="absolute top-2 left-2 bg-[#25D366] text-black text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">Destaque</div>
               )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="mb-4">
                <p className="text-[10px] font-black text-white uppercase truncate mb-1">Conteúdo Moderável #{i+1042}</p>
                <p className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">Autor: Artista ID_{i*13} • {tab}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-yellow-500/10 text-yellow-500 py-2 rounded-xl text-[8px] font-black uppercase border border-yellow-500/20 hover:bg-yellow-500 hover:text-white transition-all">Bloquear</button>
                <button className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-[8px] font-black uppercase border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Banir</button>
                <button className="flex-1 bg-[#25D366]/10 text-[#25D366] py-2 rounded-xl text-[8px] font-black uppercase border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black transition-all">Destaque</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminTokensView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
      <div className="space-y-6">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#25D366] mb-6 flex items-center gap-2">
            <i className="fa-solid fa-sliders"></i> Regras de Distribuição (PROTO)
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Streaming Música (por min)', val: '0.5 PROTO' },
              { label: 'Assistir Reel (completo)', val: '1.2 PROTO' },
              { label: 'Ouvir Rádio (por hora)', val: '10.0 PROTO' },
              { label: 'Referência Nova Conta', val: '50.0 PROTO' },
              { label: 'Limite Diário por Usuário', val: '500 PROTO' },
            ].map((rule, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black uppercase text-white/60 leading-tight">{rule.label}</span>
                <input type="text" defaultValue={rule.val} className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-black text-[#25D366] text-right w-24 outline-none focus:border-[#25D366] transition-all" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-[#25D366] text-black py-4 rounded-2xl font-black uppercase text-[11px] active:scale-[0.98] transition-all">Salvar Alterações Econômicas</button>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#25D366]">Solicitações de Saque</h3>
            <span className="bg-[#25D366]/10 text-[#25D366] text-[8px] font-black px-2 py-0.5 rounded-full uppercase">8 Pendentes</span>
          </div>
          <div className="space-y-3">
             {INITIAL_WITHDRAWALS.map(w => (
               <div key={w.id} className="bg-black/20 p-4 rounded-2xl border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black">{w.userName.charAt(0)}</div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase">{w.userName}</p>
                      <p className="text-[8px] font-bold text-white/20 uppercase mt-0.5">{w.date} • PIX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs font-black text-[#25D366]">R$ {(w.amount * 0.12).toFixed(2)}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20"><i className="fa-solid fa-xmark text-xs"></i></button>
                      <button className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20"><i className="fa-solid fa-check text-xs"></i></button>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Console' | 'Chat' | 'Vendas'>('Console');

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <div className="bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/5">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#25D366] flex items-center gap-3">
             <i className="fa-solid fa-satellite-dish animate-pulse"></i> LIVES MULTICANAIS
           </h3>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-[#25D366] rounded-full animate-ping"></div>
             <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Servidor OK</span>
           </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { p: 'YouTube', i: 'fa-youtube', c: '#FF0000', s: 'Ativo' },
            { p: 'TikTok', i: 'fa-tiktok', c: '#FFFFFF', s: 'Ativo' },
            { p: 'Insta', i: 'fa-instagram', c: '#E4405F', s: 'Standby' },
            { p: 'Twitch', i: 'fa-twitch', c: '#9146FF', s: 'Offline' },
          ].map((item, idx) => (
            <div key={idx} className="flex-shrink-0 bg-black/40 p-4 rounded-2xl border border-white/5 w-32 flex flex-col items-center gap-2">
              <i className={`fa-brands ${item.i} text-xl`} style={{ color: item.c }}></i>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{item.p}</span>
              <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded ${item.s === 'Ativo' ? 'bg-[#25D366]/10 text-[#25D366]' : 'bg-white/5 text-white/20'}`}>{item.s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
        {['Console', 'Chat', 'Vendas'].map((t) => (
          <button 
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === t ? 'bg-[#25D366] text-black shadow-lg shadow-green-500/10' : 'text-white/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'Console' && (
          <div className="space-y-6 animate-fadeIn">
             <div className="bg-black rounded-3xl overflow-hidden border border-white/10 aspect-video relative group">
                <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                   <div className="w-16 h-16 rounded-full border-2 border-[#25D366] flex items-center justify-center animate-spin-slow">
                      <i className="fa-solid fa-bolt text-2xl text-[#25D366]"></i>
                   </div>
                   <div className="text-center">
                     <p className="text-[10px] font-black uppercase text-white tracking-[0.3em]">Transmitindo Agora</p>
                     <p className="text-[8px] font-bold text-[#25D366] uppercase mt-1">1.2k Viewers Unificados</p>
                   </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                   <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg bg-red-600 text-white"><i className="fa-solid fa-power-off text-[10px]"></i></button>
                      <button className="w-8 h-8 rounded-lg bg-white/10 text-white backdrop-blur-md"><i className="fa-solid fa-microphone text-[10px]"></i></button>
                   </div>
                   <span className="text-[8px] font-black text-white/60 uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">01:24:45</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                   <p className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">Pico Audiência</p>
                   <p className="text-lg font-black text-white">2.4k</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                   <p className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">Tempo Online</p>
                   <p className="text-lg font-black text-white">84m</p>
                </div>
             </div>
          </div>
        )}
        {activeTab === 'Chat' && (
          <div className="bg-black/40 rounded-3xl border border-white/5 flex flex-col h-[500px] animate-fadeIn">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
               <h4 className="text-[10px] font-black uppercase text-[#25D366]">Moderação Ativa</h4>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
               {[
                 { u: 'Gabriel', msg: 'A live tá top!', p: 'fa-youtube', c: '#FF0000' },
                 { u: 'Carla', msg: 'Quanto PROTO ganha?', p: 'fa-tiktok', c: '#FFFFFF' },
                 { u: 'Bruno', msg: 'Quero esse fone!', p: 'fa-instagram', c: '#E4405F' },
               ].map((m, i) => (
                 <div key={i} className="flex gap-3 group">
                    <i className={`fa-brands ${m.p} text-[8px] mt-1`} style={{ color: m.c }}></i>
                    <div className="flex-1">
                      <span className="text-[9px] font-black text-white/40 uppercase">{m.u}</span>
                      <p className="text-[10px] font-medium text-white/80">{m.msg}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-4 bg-black/20">
               <input type="text" placeholder="Moderar chat..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-[10px] outline-none focus:border-[#25D366]" />
            </div>
          </div>
        )}
        {activeTab === 'Vendas' && (
          <div className="space-y-6 animate-fadeIn">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <h4 className="text-[10px] font-black uppercase text-[#25D366] mb-4">Produtos</h4>
                <div className="space-y-3">
                   {[
                     { name: 'Fluxx Gold Pass', price: '120 PROTO', sold: '42' },
                     { name: 'Cyber NFT v2', price: '450 PROTO', sold: '15' },
                   ].map((item, i) => (
                     <div key={i} className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black text-white uppercase">{item.name}</p>
                          <p className="text-[8px] font-bold text-[#25D366] uppercase">{item.price}</p>
                        </div>
                        <button className="bg-[#25D366] text-black text-[7px] font-black px-2 py-1 rounded uppercase">Impulsionar</button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPanelView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [subView, setSubView] = useState<AdminSubView>('dashboard');

  return (
    <div className="flex-1 flex overflow-hidden page-enter">
      <AdminSidebar current={subView} onChange={setSubView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#0A071A]/80 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-[#25D366] border border-white/5">
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Fluxx <span className="text-[#25D366]">Admin</span></h2>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-hide pb-24 bg-black/20">
          {subView === 'dashboard' && <AdminDashboardView />}
          {subView === 'users' && <AdminUsersView />}
          {subView === 'moderation' && <AdminModerationView />}
          {subView === 'tokens' && <AdminTokensView />}
          {subView === 'settings' && <AdminSettingsView />}
          {subView !== 'dashboard' && subView !== 'users' && subView !== 'moderation' && subView !== 'tokens' && subView !== 'settings' && (
            <div className="flex items-center justify-center h-full opacity-10">Módulo em Integração</div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Perfil View ---
const PerfilView: React.FC<{ walletBalance: number; setView: (v: ViewState) => void }> = ({ walletBalance, setView }) => {
  const [activeTab, setActiveTab] = useState<'reels' | 'radios' | 'loja' | 'musicas'>('reels');

  return (
    <div className="flex-1 overflow-y-auto page-enter pb-20 scrollbar-hide bg-[#050212]">
      <div className="max-w-4xl mx-auto px-5 pt-8">
        <div className="flex items-start gap-6 sm:gap-12 mb-8">
          <div className="shrink-0 relative p-0.5 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E]">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#050212]" 
            />
          </div>
          <div className="flex-1 pt-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white mb-1">GABRIEL SILVA</h2>
            <p className="text-[10px] font-bold text-[#25D366] uppercase tracking-[0.5em] opacity-80">PREMIUM CREATOR</p>
          </div>
        </div>

        <div className="mb-8 max-w-2xl border-l-[3px] border-[#25D366] pl-6 py-2">
          <div className="text-[14px] leading-relaxed text-white font-medium italic opacity-90 line-clamp-2 overflow-hidden">
            "Transformando o streaming através da Fluxx Stream. Conectando artistas e fãs com ganhos reais Web3. Inovação constante para o ecossistema digital."
          </div>
        </div>

        <button 
          onClick={() => setView('wallet')}
          className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl mb-10 flex items-center justify-between px-8 h-14 group"
        >
          <div className="flex flex-col items-start">
             <span className="text-[10px] font-black uppercase text-[#25D366]">PROTO ASSETS</span>
             <span className="text-[11px] text-white/40 uppercase font-bold tracking-widest">Sua carteira oficial</span>
          </div>
          <i className="fa-solid fa-wallet text-white/50 group-hover:text-[#25D366]"></i>
        </button>

        <div className="w-full flex justify-between border-t border-white/5 mb-1 sticky top-0 bg-[#050212] z-20">
          {['reels', 'radios', 'loja', 'musicas'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab as any)} 
              className={`pt-5 pb-5 flex flex-col items-center flex-1 transition-all relative ${activeTab === tab ? 'text-[#25D366]' : 'text-white/20'}`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab}</span>
              {activeTab === tab && <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-[#25D366] rounded-full shadow-[0_0_10px_#25D366]"></div>}
            </button>
          ))}
        </div>

        <div className="w-full pt-4">
          {activeTab === 'reels' && (
            <div className="grid grid-cols-3 gap-1 animate-fadeIn">
              {PROFILE_REELS.map(reel => (
                <div key={reel.id} className="relative aspect-[3/4.5] overflow-hidden group bg-white/5 rounded-sm">
                  <img src={reel.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          )}
          {activeTab === 'radios' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROFILE_RADIOS.map(rad => (
                <div key={rad.id} className="bg-white/5 p-4 rounded-2xl flex items-center gap-5 border border-white/5">
                  <img src={rad.logo} className="w-16 h-16 rounded-xl object-cover" />
                  <p className="text-xs font-black uppercase text-white">{rad.name}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'musicas' && (
            <div className="space-y-2">
              {PROFILE_SONGS.map((song, i) => (
                <div key={song.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <p className="text-[11px] font-black uppercase text-white/90">{song.title}</p>
                  <span className="text-[10px] font-bold text-white/20">{song.duration}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'loja' && (
            <div className="grid grid-cols-2 gap-5">
              {PROFILE_STORE.map(item => (
                <div key={item.id} className="bg-white/5 p-4 rounded-3xl border border-white/5">
                  <div className="aspect-square bg-white/5 rounded-2xl mb-4 overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-black uppercase truncate text-white/90">{item.name}</p>
                  <p className="text-[#25D366] text-[11px] font-black">{item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Wallet View ---
const WalletView: React.FC<{ balance: number; onBack: () => void }> = ({ balance, onBack }) => (
  <div className="flex-1 p-6 page-enter flex flex-col h-full bg-[#050212]">
    <header className="flex items-center gap-5 mb-10">
      <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[#25D366]"><i className="fa-solid fa-arrow-left"></i></button>
      <h2 className="text-xl font-black uppercase text-white">PROTO ASSETS</h2>
    </header>
    <div className="w-full relative overflow-hidden green-gradient p-12 rounded-[3rem] mb-12 text-center shadow-[0_20px_60px_rgba(37,211,102,0.15)]">
      <p className="text-[11px] font-black uppercase tracking-[0.5em] mb-4 text-black/40">SALDO DISPONÍVEL</p>
      <h3 className="text-5xl sm:text-7xl font-black text-black tracking-tighter">{balance.toLocaleString()}</h3>
      <p className="text-[12px] font-black text-black/40 mt-3 uppercase tracking-widest">VALOR: R$ {(balance * 0.12).toFixed(2)}</p>
    </div>
    <div className="grid grid-cols-2 gap-5">
      <button className="bg-white/5 p-8 rounded-3xl flex flex-col items-center gap-4 border border-white/5">
        <i className="fa-solid fa-arrow-up-from-bracket text-[#25D366] text-2xl"></i>
        <span className="text-[10px] font-black uppercase text-white">SAQUE PIX</span>
      </button>
      <button className="bg-white/5 p-8 rounded-3xl flex flex-col items-center gap-4 border border-white/5">
        <i className="fa-solid fa-repeat text-[#25D366] text-2xl"></i>
        <span className="text-[10px] font-black uppercase text-white">SWAP</span>
      </button>
    </div>
  </div>
);

// --- App Principal ---
const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('perfil');
  const [walletBalance] = useState(2148);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="w-full h-[100dvh] relative bg-[#050212] flex flex-col overflow-hidden text-white font-['Plus_Jakarta_Sans']">
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {view !== 'admin' && view !== 'reels' && (
        <header className="px-6 pt-6 pb-4 flex justify-between items-center shrink-0 z-40 bg-[#050212]/95 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-10 h-10 rounded-2xl green-gradient flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)] group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-bolt text-lg text-black"></i>
            </div>
            <div className="flex flex-col">
               <span className="text-lg font-black tracking-tighter leading-none">Fluxx<span className="text-[#25D366]">Stream</span></span>
               <span className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-40">Blockchain Hub</span>
            </div>
          </div>
          <button 
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:bg-white/10 hover:border-[#25D366]/50" 
            onClick={() => setView('admin')}
          >
            <div className="w-6 h-[2px] bg-[#25D366] rounded-full"></div>
            <div className="w-4 h-[2px] bg-[#25D366] rounded-full self-end mr-3"></div>
            <div className="w-6 h-[2px] bg-[#25D366] rounded-full"></div>
          </button>
        </header>
      )}

      <main className="flex-1 relative overflow-hidden flex flex-col">
        {view === 'reels' && <ReelsLiveView />}
        {view === 'perfil' && <PerfilView walletBalance={walletBalance} setView={setView} />}
        {view === 'wallet' && <WalletView balance={walletBalance} onBack={() => setView('perfil')} />}
        {view === 'admin' && <AdminPanelView onBack={() => setView('perfil')} />}
        {view === 'home' && (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center page-enter">
            <div className="relative">
              <div className="absolute inset-0 bg-[#25D366]/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="w-24 h-24 rounded-full green-gradient mb-8 flex items-center justify-center animate-spin-slow shadow-[0_0_80px_rgba(37,211,102,0.4)] border-4 border-white/10 relative">
                 <i className="fa-solid fa-bolt text-4xl text-black"></i>
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic mb-4 text-white tracking-tighter">THE FUTURE IS <span className="text-[#25D366]">NOW</span></h2>
            <p className="text-white/30 text-[10px] sm:text-xs uppercase font-black tracking-[0.6em]">Consuma conteúdo e mine tokens PROTO</p>
          </div>
        )}
        {['shop', 'audios'].includes(view) && (
           <div className="flex-1 flex flex-col items-center justify-center gap-4 page-enter">
              <i className="fa-solid fa-hourglass-start text-4xl opacity-10 animate-bounce"></i>
              <div className="opacity-10 uppercase font-black text-sm tracking-[0.6em] px-10 text-center">Módulo em Integração Final</div>
           </div>
        )}
      </main>

      {view !== 'admin' && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#050212] border-t border-white/5 px-6 flex justify-center items-center z-50">
          <div className="max-w-3xl w-full flex justify-between items-center gap-1">
            {[
              { id: 'home', icon: 'fa-house', label: 'INÍCIO' },
              { id: 'shop', icon: 'fa-bag-shopping', label: 'MARKET' },
              { id: 'reels', icon: 'fa-bolt', label: 'FEED' },
              { id: 'audios', icon: 'fa-music', label: 'PLAYER' },
              { id: 'perfil', icon: 'fa-user', label: 'PERFIL' },
            ].map((nav) => (
              <button 
                key={nav.id}
                onClick={() => setView(nav.id as ViewState)} 
                className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 py-1 ${view === nav.id ? 'text-[#25D366]' : 'text-white/20 hover:text-white/40'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${view === nav.id ? 'bg-[#25D366]/10 shadow-[0_5px_15px_rgba(37,211,102,0.05)] border border-[#25D366]/10' : ''}`}>
                   <i className={`fa-solid ${nav.icon} ${view === nav.id ? 'text-base' : 'text-sm'}`}></i>
                </div>
                <span className={`text-[7px] font-black tracking-widest transition-all ${view === nav.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{nav.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      <style>{`
        .avatar-glow { box-shadow: 0 0 60px rgba(37, 211, 102, 0.1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        ::-webkit-scrollbar { display: none; }
        .green-gradient { background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// --- View de Reels (Live Experience Fiel às Referências) ---

const ReelsLiveView: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="flex-1 relative bg-black overflow-hidden h-full flex flex-col page-enter">
      {/* Background Video Mock (Vertical Fullscreen) */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=1080" 
          className="w-full h-full object-cover" 
          alt="Live Streamer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
      </div>

      {/* Top Layer: UI Overlays */}
      <div className="relative z-10 p-4 pt-10 flex flex-col gap-2">
        
        {/* Row 1: Profile & Top Viewers */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xl p-1 rounded-full border border-white/10 pr-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full object-cover border-2 border-purple-500" />
              <div className="absolute -bottom-1 -right-1 bg-purple-600 text-[6px] font-black px-1.5 py-0.5 rounded-sm border border-black uppercase">VIP</div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white tracking-tighter">PAOLA_OFFICIAL</span>
              <span className="text-[8px] font-bold text-white/60 flex items-center gap-1">
                <i className="fa-solid fa-gem text-yellow-400 text-[7px]"></i> 3474
              </span>
            </div>
            <button className="ml-2 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs active:scale-90 transition-transform">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 mr-2">
               <div className="w-8 h-8 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center text-[9px] font-black">B 32</div>
               <div className="w-8 h-8 rounded-full border-2 border-pink-400 overflow-hidden"><img src="https://picsum.photos/50/50?random=1" className="w-full h-full object-cover"/></div>
               <div className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden"><img src="https://picsum.photos/50/50?random=2" className="w-full h-full object-cover"/></div>
            </div>
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black text-white">19</div>
            <button className="text-white/80 text-2xl ml-1"><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        {/* Row 2: Ranking Info */}
        <div className="flex justify-between items-center mt-1 px-1">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
            <i className="fa-solid fa-clock text-[#25D366] text-[8px] animate-pulse"></i>
            <span className="text-[9px] font-black text-white/90 uppercase tracking-widest">Ranking por Hora</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 text-[9px] font-black text-white/80 uppercase">
             <i className="fa-solid fa-table-cells-large text-[8px]"></i> mais &gt;
          </div>
        </div>

        {/* Left Side Floating: Festival & Program */}
        <div className="flex flex-col gap-3 mt-4 w-fit">
          <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 p-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-3 w-44">
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase italic leading-none">FESTIVAL</span>
               <span className="text-[6px] font-bold text-white/50 uppercase tracking-tighter">DE DIAMANTES</span>
             </div>
             <div className="flex-1 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-gem text-blue-300 text-xs"></i>
             </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 w-36">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Programação</p>
              <i className="fa-solid fa-chevron-up text-[8px] text-white/20"></i>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-music text-purple-400 text-[8px]"></i>
                <span className="text-[9px] font-bold text-white/80 truncate">sonho</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-heart text-pink-400 text-[8px]"></i>
                <span className="text-[9px] font-bold text-white/80 truncate">romântico</span>
              </div>
              <p className="text-[8px] font-black text-white/40 uppercase mt-2 border-t border-white/5 pt-1">Mais</p>
            </div>
          </div>
        </div>

        {/* Right Side Floating: Desejos & Gifts */}
        <div className="absolute top-24 right-4 flex flex-col gap-3 items-end">
           <div className="bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/5 flex flex-col items-center min-w-[50px]">
             <span className="text-[8px] font-black text-white/60 uppercase">Desejos</span>
             <span className="text-[10px] font-black text-pink-500">0/5</span>
           </div>
           <div className="flex flex-col gap-2">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center relative">
                 <img src="https://picsum.photos/50/50?random=10" className="w-8 h-8 object-contain" />
                 <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] font-black px-1 rounded-full">3</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
                 <i className="fa-solid fa-gift text-lg text-yellow-400"></i>
              </div>
           </div>
           <div className="mt-8 flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 flex items-center justify-center shadow-2xl border-2 border-white/20">
                 <i className="fa-solid fa-box-open text-2xl text-white"></i>
              </div>
              <span className="text-[8px] font-black text-white uppercase tracking-tighter bg-purple-600 px-2 py-0.5 rounded-full">Live Bônus</span>
           </div>
        </div>
      </div>

      {/* Middle Layer: Live Counter & Interactive Prompt */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-none w-full">
        <div className="bg-purple-600/50 backdrop-blur-xl px-10 py-3 rounded-full border border-white/30 flex items-center gap-3 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
           <i className="fa-solid fa-bolt text-yellow-400 text-xl animate-pulse"></i>
           <span className="text-3xl font-black text-white italic tracking-tighter">6.300</span>
        </div>
        <div className="text-center">
           <p className="text-[#25D366] text-sm font-black uppercase tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">AJUDA-ME ⚡</p>
           <p className="text-white text-base font-black uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1">TOQUE NO TROMPETE</p>
           <p className="text-yellow-400 text-2xl font-black uppercase italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">EMBAIXO 👇</p>
        </div>
      </div>

      {/* Bottom Layer: Chat, Disclaimer & Actions */}
      <div className="mt-auto relative z-10 p-4 space-y-4">
        
        {/* Ad Banner (K58 Style) */}
        <div className="bg-white rounded-2xl overflow-hidden w-48 ml-auto border-2 border-orange-500 shadow-2xl relative animate-fadeIn">
          <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center text-[10px] z-10 hover:bg-black transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="h-28 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
          </div>
          <div className="p-3 text-center bg-white">
            <p className="text-xs font-black text-black tracking-tighter">K58.COM</p>
            <p className="text-[9px] text-black/40 font-bold leading-tight my-2">Ganhe muito com pouco investimento inicial...</p>
            <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-[9px] font-black py-2 rounded-lg uppercase shadow-lg active:scale-95 transition-transform">Cadastrar-se agora</button>
          </div>
        </div>

        {/* Dynamic Live Chat & Disclaimer */}
        <div className="max-w-[85%] space-y-3">
          {showDisclaimer && (
            <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/5 relative group">
               <button onClick={() => setShowDisclaimer(false)} className="absolute -top-2 -right-2 text-white/30 hover:text-white transition-colors">
                 <i className="fa-solid fa-circle-xmark text-lg"></i>
               </button>
               <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                 <span className="text-[#25D366] font-black uppercase mr-1">Aviso:</span>
                 Jogo e outros comportamentos impróprios são estritamente proibidos na plataforma Fluxx Stream. Temos o direito de suspender infratores graves.
               </p>
            </div>
          )}

          {/* Simple Floating Chat Mock */}
          <div className="space-y-2 max-h-32 overflow-hidden mask-fade-top">
             <div className="flex gap-2 items-start">
               <span className="text-[10px] font-black text-blue-400 uppercase">Marcos_99:</span>
               <span className="text-[10px] text-white/80 font-medium">Essa live tá absurda! 💎🚀</span>
             </div>
             <div className="flex gap-2 items-start">
               <span className="text-[10px] font-black text-pink-400 uppercase">Ju_FLX:</span>
               <span className="text-[10px] text-white/80 font-medium">Como ganha o token PROTO? ⚡</span>
             </div>
          </div>
        </div>

        {/* Main Interaction Bar */}
        <div className="flex items-center gap-2 pb-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 px-5 py-3.5 flex items-center">
             <input type="text" placeholder="Diga algo..." className="bg-transparent text-white text-xs outline-none w-full placeholder:text-white/30 font-bold" />
          </div>
          
          <button className="w-12 h-12 rounded-full bg-orange-600/90 flex flex-col items-center justify-center text-white border border-white/20 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-coins text-sm"></i>
             <span className="text-[7px] font-black mt-0.5 tracking-tighter">EL PELO</span>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-green-500/80 flex items-center justify-center text-white border border-white/20 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-martini-glass-citrus text-lg"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-phone-slash text-base"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all shadow-xl">
             <i className="fa-solid fa-ellipsis text-base"></i>
          </button>
          
          <button className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white border border-white/30 animate-pulse active:scale-90 transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)]">
             <i className="fa-solid fa-gift text-lg"></i>
          </button>
        </div>
      </div>

      <style>{`
        .mask-fade-top {
          -webkit-mask-image: linear-gradient(to top, black 80%, transparent 100%);
          mask-image: linear-gradient(to top, black 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default App;
