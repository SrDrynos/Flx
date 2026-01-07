import React, { useState, useEffect, useRef } from 'react';
import { ViewState, AdminSubView, UserAccount, WithdrawalRequest, AudioItem } from './types';
import Chat from './components/Chat';
import AudioPlayer from './components/AudioPlayer';

// --- MOCK DATA COMPLETO ---

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

const PROFILE_STORE = [
  { id: 's1', name: 'Fluxx VIP Pass', price: '500 PROTO', img: 'https://picsum.photos/400/400?random=20' },
  { id: 's2', name: 'Cyber Headphones', price: '1200 PROTO', img: 'https://picsum.photos/400/400?random=21' },
  { id: 's3', name: 'NFT Collectible #04', price: '3000 PROTO', img: 'https://picsum.photos/400/400?random=22' },
  { id: 's4', name: 'Skin Exclusive FLX', price: '850 PROTO', img: 'https://picsum.photos/400/400?random=23' },
];

const MOCK_FEED_REELS = [
  {
    id: 'f1',
    user: 'CyberGirl_99',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    desc: 'O futuro chegou! ⚡ A nova era do streaming descentralizado começa agora na Fluxx.',
    song: 'Neon Lights - Original Mix',
    likes: '124K',
    comments: '1.2K',
    shares: '540',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    isSponsored: false
  },
  {
    id: 'f2',
    user: 'CryptoMaster',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    desc: 'Mining PROTO tokens live! 🚀💰 Aprenda como maximizar seus ganhos diários assistindo conteúdo.',
    song: 'Money Moves - Trap Beat',
    likes: '89K',
    comments: '900',
    shares: '2.1K',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    isSponsored: true
  }
];

const SHOP_PRODUCTS = [
  { id: 'p1', name: 'iPhone 15 Pro Max 1TB', price: 15000, img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400', category: 'eletronicos', country: 'US', rating: 4.9 },
  { id: 'p2', name: 'Cesta Básica Premium', price: 150, img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400', category: 'mercado', country: 'BR', rating: 4.8 },
  { id: 'p3', name: 'Nike Air Jordan 1 High', price: 2800, img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400', category: 'moda', country: 'US', rating: 4.7 },
  { id: 'p4', name: 'PlayStation 5 Slim', price: 4500, img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400', category: 'games', country: 'JP', rating: 4.9 },
  { id: 'p5', name: 'Whey Protein Gold', price: 300, img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=400', category: 'beleza', country: 'US', rating: 4.6 },
  { id: 'p6', name: 'Kit Churrasco Angus', price: 450, img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=400', category: 'mercado', country: 'BR', rating: 5.0 },
];

const SHOP_CATEGORIES = [
  { id: 'eletronicos', icon: 'fa-mobile-screen', label: 'Eletrônicos' },
  { id: 'moda', icon: 'fa-shirt', label: 'Moda' },
  { id: 'games', icon: 'fa-gamepad', label: 'Games' },
  { id: 'casa', icon: 'fa-couch', label: 'Casa' },
  { id: 'auto', icon: 'fa-car', label: 'Auto' },
  { id: 'beleza', icon: 'fa-wand-magic-sparkles', label: 'Beleza' },
];

const HOME_LIVES = [
  { id: 'l1', title: 'Show ao Vivo - Música Brasileira', subtitle: 'Show especial com os maiores sucessos', viewers: '1.52K', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800' },
  { id: 'l2', title: 'Podcast: Empreendedorismo', subtitle: 'Conversando com gigantes do mercado', viewers: '850', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac618?auto=format&fit=crop&q=80&w=800' },
  { id: 'l3', title: 'DJ Set - Electronic Vibe', subtitle: 'As melhores batidas da cena', viewers: '3.2K', image: 'https://images.unsplash.com/photo-1571266028243-37160d7f0e54?auto=format&fit=crop&q=80&w=800' },
];

const HOME_REELS_PREVIEW = [
  { id: 'hr1', title: 'Set de DJ: House Music', stats: '7.89K', views: '34.6K', image: 'https://images.unsplash.com/photo-1514525253440-b393452de23e?auto=format&fit=crop&q=80&w=400' },
  { id: 'hr2', title: 'Treino HIIT Completo', stats: '5.68K', views: '23.5K', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400' },
  { id: 'hr3', title: 'Receita Fácil: Bolo de Cenoura', stats: '4.57K', views: '18.2K', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=400' },
];

const HOME_CREATORS = [
  { id: 'c1', name: 'Pro Gamer', followers: '23.5K', initial: 'P', color: 'from-pink-500 to-purple-600' },
  { id: 'c2', name: 'Maria Santos', followers: '15.2K', initial: 'M', color: 'from-purple-500 to-indigo-600' },
  { id: 'c3', name: 'Carlos Tech', followers: '8.77K', initial: 'C', color: 'from-pink-500 to-rose-500' },
  { id: 'c4', name: 'Ana Yoga', followers: '12.1K', initial: 'A', color: 'from-orange-400 to-pink-500' },
];

const HOME_PRODUCTS = [
  { id: 'hp1', title: 'Curso: Produção Musical', price: 'R$ 197,00', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400', tag: null },
  { id: 'hp2', title: 'Mentoria: Empreendedorismo', price: 'R$ 350,00', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', tag: null },
  { id: 'hp3', title: 'Camiseta Fluxx Premium', price: 'R$ 89,90', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400', tag: null },
  { id: 'hp4', title: 'Acesso Premium: Lives Exclusivas', price: 'R$ 49,90', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400', tag: 'PREMIUM' },
];


// --- VIEWS ---

const HomeView: React.FC<{ onPlay: (item: any) => void }> = ({ onPlay }) => (
  <div className="p-5 space-y-8 animate-fadeIn pb-24 overflow-y-auto h-full bg-[#050212]">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-bolt text-[#8B5CF6] text-xl"></i>
        <h1 className="text-xl font-bold text-white tracking-tight">Fluxx Stream</h1>
      </div>
      <div className="flex gap-4">
        <button className="text-white hover:text-[#8B5CF6] transition-colors"><i className="fa-regular fa-bell text-lg"></i></button>
        <button className="text-white hover:text-[#8B5CF6] transition-colors"><i className="fa-solid fa-magnifying-glass text-lg"></i></button>
      </div>
    </div>
    <section>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-bold text-white">Ao Vivo Agora</h2>
        </div>
        <button className="text-xs text-white/70 hover:text-white font-medium">Ver Todos</button>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {HOME_LIVES.map(live => (
          <div key={live.id} onClick={() => onPlay({ ...live, type: 'live' })} className="min-w-[280px] group cursor-pointer">
            <div className="relative h-40 rounded-xl overflow-hidden mb-3">
              <img src={live.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                • AO VIVO
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <i className="fa-solid fa-eye"></i> {live.viewers}
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-sm font-bold text-white leading-tight mb-1">{live.title}</h3>
            <p className="text-xs text-white/50">{live.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
    <section>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-film text-white/50 text-sm"></i>
          <h2 className="text-lg font-bold text-white">Reels Populares</h2>
        </div>
        <button className="text-xs text-white/70 hover:text-white font-medium">Ver Todos</button>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {HOME_REELS_PREVIEW.map(reel => (
          <div key={reel.id} className="min-w-[140px] h-60 relative rounded-2xl overflow-hidden cursor-pointer group">
            <img src={reel.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
              <h3 className="text-xs font-bold text-white mb-2 leading-tight line-clamp-2">{reel.title}</h3>
              <div className="flex items-center justify-between text-[9px] text-white/80">
                <span className="flex items-center gap-1"><i className="fa-solid fa-heart"></i> {reel.stats}</span>
                <span className="flex items-center gap-1"><i className="fa-solid fa-play"></i> {reel.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">👑</span>
          <h2 className="text-lg font-bold text-white">Criadores Verificados</h2>
        </div>
        <button className="text-xs text-white/70 hover:text-white font-medium">Ver Todos</button>
      </div>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide px-1">
        {HOME_CREATORS.map(creator => (
          <div key={creator.id} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer">
             <div className={`w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr ${creator.color}`}>
               <div className="w-full h-full bg-[#1A1A1A] rounded-full flex items-center justify-center border-2 border-[#050212]">
                 <span className="text-xl font-bold text-white">{creator.initial}</span>
               </div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1">
                  <p className="text-[10px] font-bold text-white truncate max-w-[80px]">{creator.name}</p>
                  <i className="fa-solid fa-circle-check text-[#8B5CF6] text-[8px]"></i>
               </div>
               <p className="text-[8px] text-white/50">{creator.followers} seguidores</p>
             </div>
          </div>
        ))}
      </div>
    </section>
    <section>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
             <i className="fa-solid fa-bag-shopping text-[#128C7E]"></i>
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
          </div>
          <h2 className="text-lg font-bold text-white">Produtos em Destaque</h2>
        </div>
        <button className="text-xs text-white/70 hover:text-white font-medium">Ver Todos</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {HOME_PRODUCTS.map(product => (
          <div key={product.id} className="bg-[#111] rounded-2xl overflow-hidden group cursor-pointer">
            <div className="relative aspect-square">
               <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               {product.tag && (
                 <div className="absolute top-2 right-2 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm">{product.tag}</div>
               )}
            </div>
            <div className="p-3">
              <h3 className="text-xs font-bold text-white leading-tight mb-1">{product.title}</h3>
              <p className="text-sm font-black text-[#8B5CF6]">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ShopView: React.FC = () => (
  <div className="p-6 h-full overflow-y-auto pb-24 animate-fadeIn">
    <div className="flex items-center justify-between mb-6">
       <h2 className="text-xl font-black text-white uppercase">Marketplace</h2>
       <div className="flex gap-2">
         <div className="bg-[#25D366]/10 px-3 py-1 rounded-full border border-[#25D366]/20 flex items-center gap-2">
            <i className="fa-solid fa-wallet text-[#25D366] text-xs"></i>
            <span className="text-xs font-black text-white">1,240 P</span>
         </div>
       </div>
    </div>
    <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-8">
       {SHOP_CATEGORIES.map(cat => (
         <button key={cat.id} className="flex flex-col items-center gap-2 min-w-[70px]">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#25D366] hover:text-black transition-all border border-white/5">
               <i className={`fa-solid ${cat.icon}`}></i>
            </div>
            <span className="text-[9px] font-bold text-white/40 uppercase">{cat.label}</span>
         </button>
       ))}
    </div>
    <div className="grid grid-cols-2 gap-4">
       {SHOP_PRODUCTS.map(product => (
         <div key={product.id} className="bg-white/5 p-3 rounded-2xl border border-white/5 group hover:border-[#25D366]/20 transition-all">
            <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
               <img src={product.img} className="w-full h-full object-cover" />
               <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
                  <span className="text-[8px] font-black text-white">{product.rating} ★</span>
               </div>
            </div>
            <h3 className="text-xs font-black text-white truncate mb-1">{product.name}</h3>
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-bold text-[#25D366]">{product.price} P</span>
               <button className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#25D366] transition-colors">
                  <i className="fa-solid fa-plus text-[10px]"></i>
               </button>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const ReelsView: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  return (
    <div className="h-full w-full bg-black relative snap-y snap-mandatory overflow-y-scroll">
       {MOCK_FEED_REELS.map((reel, index) => (
         <div key={reel.id} className="h-full w-full relative snap-center flex items-center justify-center bg-[#111]">
            <video 
               src={reel.video} 
               className="h-full w-full object-cover opacity-80"
               autoPlay={index === currentReelIndex}
               loop
               muted
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 flex flex-col justify-end p-6 pb-24">
               <div className="flex items-end justify-between">
                  <div className="max-w-[80%] space-y-2">
                     <div className="flex items-center gap-2">
                        <img src={reel.avatar} className="w-8 h-8 rounded-full border border-white" />
                        <span className="text-xs font-black text-white">{reel.user}</span>
                        <button className="text-[9px] border border-white/30 px-2 py-0.5 rounded-full text-white">Seguir</button>
                     </div>
                     <p className="text-xs text-white leading-relaxed">{reel.desc}</p>
                     <div className="flex items-center gap-2 text-white/60">
                        <i className="fa-solid fa-music text-[10px]"></i>
                        <span className="text-[10px] scrolling-text">{reel.song}</span>
                     </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                     <button className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#25D366] hover:text-black transition-all">
                           <i className="fa-solid fa-heart"></i>
                        </div>
                        <span className="text-[9px] font-bold text-white">{reel.likes}</span>
                     </button>
                     <button className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
                           <i className="fa-solid fa-comment-dots"></i>
                        </div>
                        <span className="text-[9px] font-bold text-white">{reel.comments}</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
       ))}
    </div>
  );
};

const ProfileView: React.FC = () => (
   <div className="h-full overflow-y-auto pb-24 animate-fadeIn">
      <div className="relative h-48 bg-gradient-to-r from-purple-900 via-blue-900 to-black">
         <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-[#050212] bg-black overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
            </div>
         </div>
         <div className="absolute bottom-4 right-6 flex gap-2">
            <button className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-white border border-white/20 uppercase">Editar Perfil</button>
            <button className="bg-[#25D366] text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg"><i className="fa-solid fa-share-nodes mr-1"></i> Compartilhar</button>
         </div>
      </div>
      <div className="mt-14 px-6">
         <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Gabriel Silva <i className="fa-solid fa-circle-check text-[#25D366] text-sm"></i></h1>
         <p className="text-xs text-white/50 font-medium mb-4">@gabriel_fluxx • Membro desde 2023</p>
         <div className="flex gap-6 mb-8 border-b border-white/10 pb-6">
            <div className="text-center">
               <p className="text-lg font-black text-white">12.5k</p>
               <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Seguidores</p>
            </div>
            <div className="text-center">
               <p className="text-lg font-black text-white">450</p>
               <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Seguindo</p>
            </div>
            <div className="text-center">
               <p className="text-lg font-black text-[#25D366]">54k</p>
               <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">PROTO</p>
            </div>
         </div>
         <div className="space-y-6">
            <div>
               <h3 className="text-xs font-black text-white uppercase mb-3 flex items-center gap-2"><i className="fa-solid fa-bag-shopping text-[#25D366]"></i> Coleção NFT</h3>
               <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {PROFILE_STORE.map(item => (
                     <div key={item.id} className="min-w-[140px] bg-white/5 rounded-xl p-2 border border-white/5">
                        <img src={item.img} className="w-full aspect-square rounded-lg object-cover mb-2" />
                        <p className="text-[9px] font-bold text-white truncate">{item.name}</p>
                        <p className="text-[8px] text-[#25D366]">{item.price}</p>
                     </div>
                  ))}
               </div>
            </div>
            <div>
               <h3 className="text-xs font-black text-white uppercase mb-3 flex items-center gap-2"><i className="fa-solid fa-clapperboard text-[#25D366]"></i> Reels Publicados</h3>
               <div className="grid grid-cols-3 gap-2">
                  {PROFILE_REELS.map(item => (
                     <div key={item.id} className="aspect-[9/16] bg-white/5 rounded-lg overflow-hidden border border-white/5 relative group">
                        <img src={item.thumb} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <i className="fa-solid fa-play text-white"></i>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   </div>
);

// 5. ADMIN VIEWS COMPLETO - NOVO SIDEBAR

const AdminSidebar: React.FC<{ current: AdminSubView; onChange: (v: AdminSubView) => void }> = ({ current, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Lista exata solicitada pelo usuário
  const menuItems: { id: AdminSubView; icon: string; label: string; group?: string }[] = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
    { id: 'artists', icon: 'fa-microphone-lines', label: 'Gerenciar Artistas' },
    { id: 'users', icon: 'fa-users', label: 'Gerenciar Usuários' },
    { id: 'tv', icon: 'fa-tv', label: 'Gerenciar TV Online' },
    { id: 'radios', icon: 'fa-radio', label: 'Gerenciar Rádios' },
    { id: 'reels', icon: 'fa-film', label: 'Gerenciar Reels' },
    { id: 'podcasts', icon: 'fa-podcast', label: 'Gerenciar Podcast' },
    { id: 'marketplace', icon: 'fa-shop', label: 'Gerenciar Marketplace' },
    { id: 'wallet', icon: 'fa-wallet', label: 'CARTEIRA', group: 'finance' },
    { id: 'settings', icon: 'fa-gear', label: 'CONFIGURAÇÕES', group: 'settings' },
  ];

  return (
    <>
      {/* Botão Flutuante para reabrir o menu (Só aparece quando menu fechado) */}
      <div className={`absolute top-4 left-4 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none -translate-x-full' : 'opacity-100 translate-x-0'}`}>
         <button 
           onClick={() => setIsOpen(true)}
           className="w-10 h-10 bg-[#0a0a0a] border border-white/10 rounded-xl text-white flex items-center justify-center hover:text-[#25D366] transition-all shadow-xl backdrop-blur-md"
         >
           <i className="fa-solid fa-indent text-lg"></i>
         </button>
      </div>

      <div className={`${isOpen ? 'w-64 border-r' : 'w-0 border-none'} bg-[#0a0a0a] border-white/5 flex flex-col transition-all duration-300 h-full relative z-40 overflow-hidden whitespace-nowrap`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/5 mb-2 min-w-[16rem]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center">
              <i className="fa-solid fa-layer-group text-black text-sm"></i>
            </div>
            <span className="font-black text-white tracking-tight uppercase">Painel Fluxx</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <i className="fa-solid fa-outdent text-lg"></i>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-2 min-w-[16rem]">
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.group === 'finance' && <div className="px-6 mt-6 mb-2 text-[10px] font-black text-white/30 uppercase tracking-widest">Financeiro</div>}
              {item.group === 'settings' && <div className="px-6 mt-6 mb-2 text-[10px] font-black text-white/30 uppercase tracking-widest">Sistema</div>}
              
              <button
                onClick={() => onChange(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-3 transition-all relative group border-r-2
                  ${current === item.id 
                    ? 'text-[#25D366] border-[#25D366] bg-[#25D366]/5' 
                    : 'text-white/50 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
              >
                <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                <span className={`text-xs font-bold uppercase tracking-wide truncate ${current === item.id ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/5 min-w-[16rem]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 p-[2px]">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full border-2 border-black" />
            </div>
             <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white truncate">Gabriel Silva</p>
                <p className="text-[10px] text-white/40 truncate">Master Admin</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminDashboardView: React.FC = () => (
  <div className="space-y-6 animate-fadeIn p-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Usuários Totais', val: '12,482', icon: 'fa-users', trend: '+12%' },
        { label: 'Tokens em Circulação', val: '4.5M', icon: 'fa-coins', trend: '+5%' },
        { label: 'Volume Streaming', val: '1.2M', icon: 'fa-play', trend: '+28%' },
        { label: 'Market Capital', val: 'R$ 540k', icon: 'fa-wallet', trend: '+3%' },
      ].map((stat, i) => (
        <div key={i} className="bg-white/5 p-5 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-36 group hover:border-[#25D366]/20 transition-all">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
               <i className={`fa-solid ${stat.icon} text-green-500/40 text-lg group-hover:text-[#25D366] transition-colors`}></i>
            </div>
            <span className="text-[9px] font-black text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-full">{stat.trend}</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-white">{stat.val}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
       <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#25D366] mb-6">Fluxo de Tokens (24h)</h3>
       <div className="h-48 flex items-end gap-2 px-1 bg-black/20 rounded-2xl p-4 border border-white/5">
        {[0.8, 0.4, 0.5, 0.9, 0.7, 1.0, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.2, 0.8, 0.5, 0.9, 0.3, 0.6, 0.8, 0.4, 0.9, 0.7].map((v, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-[#25D366]/20 to-[#25D366] rounded-t-sm hover:opacity-100 opacity-60 transition-all" style={{ height: `${v * 100}%` }} />
        ))}
      </div>
    </div>
  </div>
);

const AdminUsersView: React.FC<{ users: UserAccount[], setUsers: any }> = ({ users, setUsers }) => (
  <div className="p-6 h-full overflow-y-auto pb-24">
    <div className="bg-[#0F0B1E] p-6 rounded-3xl border border-white/5 mb-6 flex items-center justify-between shadow-lg">
      <h2 className="text-lg font-black text-white uppercase tracking-wider leading-tight">Gerenciar<br/>Usuários</h2>
      <button className="bg-[#25D366] text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all">
        Adicionar Novo
      </button>
    </div>
    <div className="flex flex-col gap-3">
      {users.map(u => (
        <div key={u.id} className="bg-[#0F0B1E] p-3 pl-4 pr-3 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-[#25D366]/30 transition-all shadow-md">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-[#25D366] font-black text-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
                {u.name.charAt(0)}
              </div>
              <div>
                 <p className="text-sm font-black text-white uppercase tracking-tight">{u.name}</p>
                 <p className="text-[10px] text-white/40 font-bold tracking-wider mt-0.5">
                   {u.role} <span className="text-white/20">•</span> <span className="text-[#25D366]">{u.earnings} PROTO</span>
                 </p>
              </div>
           </div>
           <div className="flex items-center gap-4">
             <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-widest shadow-sm ${
               u.status === 'Ativo' 
                 ? 'bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20' 
                 : 'bg-red-500/10 text-red-500 border border-red-500/20'
             }`}>
               {u.status}
             </span>
             <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all">
               <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
             </button>
           </div>
        </div>
      ))}
    </div>
  </div>
);

// --- ADMIN SETTINGS VIEW (ANTIGO LIVE STUDIO) AGORA É O CONTEÚDO DA "TV ONLINE" ---
interface AdminSettingsViewProps {
  products: typeof SHOP_PRODUCTS;
  onNavigate: (view: AdminSubView) => void;
}

interface FloatingProduct {
    instanceId: string;
    product: typeof SHOP_PRODUCTS[0];
    x: number;
    y: number;
}

const AdminTVOnlineView: React.FC<AdminSettingsViewProps> = ({ products, onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLive, setIsLive] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [chatInput, setChatInput] = useState('');
  
  // DRAGGABLE PRODUCTS LOGIC
  const [floatingProducts, setFloatingProducts] = useState<FloatingProduct[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffset = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  
  const [shopOpen, setShopOpen] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [likes, setLikes] = useState(15400); // Mock likes
  const [mimoGoal, setMimoGoal] = useState(100);
  const [showMimoConfig, setShowMimoConfig] = useState(false);
  
  // States for Goal & Data
  const [viewers, setViewers] = useState(1262);
  const [earningsGoal, setEarningsGoal] = useState(5000);
  const [currentEarnings, setCurrentEarnings] = useState(435);
  
  // Mock Data for Live Chat
  const [liveMessages, setLiveMessages] = useState<{id: string, user: string, avatar: string, text: string}[]>([
      { id: '1', user: 'Maria_Vibes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', text: 'Essa música é incrível! ⚡' },
      { id: '2', user: 'JoaoCrypto', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150', text: 'Alguém sabe qual é o nome dessa track? O baixo tá batendo muito forte!' },
      { id: '3', user: 'AnaTech', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', text: 'Adorei a live!' },
      { id: '4', user: 'Pedro_99', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', text: 'Manda um salve pra galera de SP! Estamos assistindo em peso aqui.' },
  ]);

  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({});

  const toggleMessageExpand = (id: string) => {
    setExpandedMessages(prev => ({...prev, [id]: !prev[id]}));
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        setCameraError(null);
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) { videoRef.current.srcObject = stream; }
      } catch (err) { 
        console.error("Erro ao acessar câmera:", err); 
        setCameraError("Permissão de câmera negada. Verifique suas configurações.");
      }
    };
    if (videoEnabled) {
      startCamera();
    } else {
      setCameraError(null);
      if (videoRef.current?.srcObject) {
         (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
         videoRef.current.srcObject = null;
      }
    }
    return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
  }, [videoEnabled]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isLive) {
      timer = setInterval(() => {
        setViewers(prev => prev + Math.floor(Math.random() * 5 - 2));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLive]);

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, instanceId: string) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      
      const item = floatingProducts.find(p => p.instanceId === instanceId);
      if(item) {
          dragOffset.current = {
              x: clientX - item.x,
              y: clientY - item.y
          };
          setDraggingId(instanceId);
      }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
      if(!draggingId) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

      setFloatingProducts(prev => prev.map(item => {
          if(item.instanceId === draggingId) {
              return {
                  ...item,
                  x: clientX - dragOffset.current.x,
                  y: clientY - dragOffset.current.y
              };
          }
          return item;
      }));
  };

  const handleDragEnd = () => {
      setDraggingId(null);
  };

  const addProductToScreen = (product: typeof SHOP_PRODUCTS[0]) => {
      if(floatingProducts.length >= 2) {
          alert("Máximo de 2 produtos na tela!");
          return;
      }
      const newProduct: FloatingProduct = {
          instanceId: Date.now().toString(),
          product,
          x: 100 + (floatingProducts.length * 20), // Offset slighty so they don't stack perfectly
          y: 200 + (floatingProducts.length * 20)
      };
      setFloatingProducts(prev => [...prev, newProduct]);
      setShopOpen(false);
  };

  const removeProductFromScreen = (instanceId: string) => {
      setFloatingProducts(prev => prev.filter(p => p.instanceId !== instanceId));
  };


  const handleSendMessage = () => {
    if(!chatInput.trim()) return;
    
    // Adicionar mensagem localmente
    const newMessage = {
        id: Date.now().toString(),
        user: 'Gabriel Silva',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        text: chatInput
    };
    setLiveMessages(prev => [...prev, newMessage]);
    setChatInput('');
  };

  const handleShare = () => {
      alert("Link copiado para a área de transferência!");
  };

  const formatLikes = (num: number) => {
    return num > 1000 ? (num/1000).toFixed(1) + 'k' : num;
  };

  return (
    // CHANGE: Changed main container to support fixed fullscreen mode when live
    <div 
        className={`${isLive ? 'fixed inset-0 z-[200] rounded-none' : 'absolute inset-4 rounded-3xl'} bg-black overflow-hidden flex flex-col font-sans select-none border border-white/5 shadow-2xl transition-all duration-300 touch-none`}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
    >
       
       {/* CAMERA LAYER - Always visible at bottom Z */}
       <div className="absolute inset-0 z-0 bg-[#111]">
          {videoEnabled ? (
             cameraError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] relative overflow-hidden">
                     {/* Placeholder profissional estilo "offline" */}
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center blur-3xl opacity-20 transform scale-125"></div>
                     <div className="w-24 h-24 rounded-full border-4 border-[#25D366]/20 p-1 relative z-10 animate-pulse">
                         <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-full h-full rounded-full object-cover grayscale" />
                         <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center border-2 border-[#1A1A1A]">
                            <i className="fa-solid fa-video-slash text-[10px] text-black"></i>
                         </div>
                     </div>
                     <div className="mt-4 z-10 flex flex-col items-center">
                        <p className="text-white text-sm font-bold tracking-wide">Gabriel Silva</p>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Sinal Interrompido</p>
                     </div>
                </div>
             ) : (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
             )
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/20 bg-[#0F0B1E]">
                <i className="fa-solid fa-video-slash text-6xl opacity-50"></i>
                <span className="text-sm font-bold uppercase tracking-widest">Câmera Desativada</span>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"></div>
       </div>

       {/* PRE-LIVE SETUP SCREEN */}
       {!isLive && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
             <div className="absolute top-6 right-6">
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg backdrop-blur-sm"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
             </div>
             <div className="w-full max-w-md space-y-8 text-center">
                 <h2 className="text-3xl font-black text-white italic tracking-tighter">LIVE STUDIO</h2>
                 <p className="text-sm text-white/60">Sua transmissão está pronta para começar.</p>
                 <button onClick={() => setIsLive(true)} className="w-full py-4 rounded-full bg-[#25D366] text-black font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,211,102,0.4)]">
                    Iniciar Agora
                 </button>
             </div>
          </div>
       )}

       {/* ACTIVE LIVE UI */}
       {isLive && (
          <div className="absolute inset-0 z-40 flex flex-col justify-between p-4 pb-0 pointer-events-none">
             {/* TOP HEADER */}
             <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
                 {/* Left: Menu */}
                 <div className="pointer-events-auto">
                    <div className="w-9 h-9 bg-[#1A1A1A]/80 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-lg cursor-pointer hover:bg-white/10 transition-colors">
                       <i className="fa-solid fa-indent text-white text-sm"></i>
                    </div>
                 </div>

                 {/* Right Group: Viewers, Meta, End Live */}
                 <div className="flex items-center gap-2 pointer-events-auto">
                    
                    {/* 1. Viewers (Contador de lives) */}
                    <div className="bg-[#1A1A1A]/90 backdrop-blur-md rounded-lg px-3 h-9 flex items-center gap-2 border border-white/10 shadow-lg">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                        <span className="text-[10px] font-bold text-white tabular-nums">{viewers}</span>
                    </div>

                    {/* 2. Meta Diaria (Meta da live) - Compact & Elegant */}
                    <div className="bg-[#1A1A1A]/90 backdrop-blur-md rounded-lg p-1.5 px-3 h-9 border border-white/10 shadow-lg flex flex-col justify-center min-w-[110px] gap-0.5">
                        <div className="flex justify-between items-center w-full gap-2">
                            <span className="text-[8px] font-black text-[#25D366] uppercase leading-none tracking-wide">Meta</span>
                            <span className="text-[8px] text-white font-bold leading-none">{Math.floor((currentEarnings/earningsGoal)*100)}%</span>
                        </div>
                         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#25D366]" style={{ width: `${Math.min((currentEarnings/earningsGoal)*100, 100)}%` }}></div>
                        </div>
                         <p className="text-[7px] text-white/60 font-medium leading-none text-right tabular-nums tracking-wider">{currentEarnings}/{earningsGoal} P</p>
                    </div>

                    {/* 3. End Live (Encerrar live) */}
                    <button onClick={() => setIsLive(false)} className="h-9 bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg font-black text-[9px] uppercase tracking-wide shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-red-500/50">
                        <i className="fa-solid fa-power-off"></i>
                        <span className="hidden sm:inline">Encerrar</span>
                    </button>
                 </div>
             </div>

             {/* LEFT SIDE CHAT (TIKTOK STYLE) - REPLACED GIFT NOTIFICATIONS */}
             <div className="absolute bottom-24 left-4 w-[65%] sm:w-[50%] max-h-60 overflow-y-auto scrollbar-hide z-30 flex flex-col justify-end mask-image-linear-gradient pointer-events-auto">
                 <div className="space-y-3">
                     {liveMessages.map((msg) => {
                         const isExpanded = expandedMessages[msg.id];
                         const isLong = msg.text.length > 35; // Limite aproximado para 1 linha
                         
                         return (
                            <div key={msg.id} className="flex items-start gap-2 animate-fadeIn group">
                                <img src={msg.avatar} className="w-8 h-8 rounded-full border border-white/10 shrink-0 object-cover" />
                                <div className="flex flex-col items-start min-w-0">
                                    <span className="text-white/60 text-[10px] font-bold leading-tight mb-0.5">{msg.user}</span>
                                    <div className="text-xs text-white font-medium leading-snug drop-shadow-md relative">
                                        <span className={`${isExpanded ? '' : 'line-clamp-1'} break-words shadow-black`}>
                                            {msg.text}
                                        </span>
                                        {isLong && !isExpanded && (
                                            <button 
                                                onClick={() => toggleMessageExpand(msg.id)} 
                                                className="text-[#25D366] text-[10px] font-bold whitespace-nowrap hover:underline ml-1 pointer-events-auto"
                                            >
                                                ver mais
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                         );
                     })}
                 </div>
             </div>

             {/* RIGHT SIDE ACTIONS (RESTORED) */}
             <div className="absolute right-4 bottom-20 flex flex-col gap-4 items-center z-50 w-14 pb-4 pointer-events-auto">
                 
                 {/* 1. MOEDA PROTO GIRANDO */}
                 <div className="flex flex-col items-center gap-1 mb-2 animate-fadeIn">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border border-yellow-200 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-spin-slow">
                        <i className="fa-solid fa-coins text-yellow-950 text-lg"></i>
                     </div>
                     <span className="text-[8px] font-black text-yellow-400 drop-shadow-md tracking-wider">EARN</span>
                 </div>

                 {/* 2. PERFIL CIRCULAR COM SEGUIR */}
                 <div className="relative mb-2 animate-fadeIn">
                    <div className="w-11 h-11 rounded-full border-2 border-white p-[2px] shadow-lg">
                       <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <button 
                       onClick={() => setIsFollowing(!isFollowing)}
                       className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter shadow-md whitespace-nowrap transition-all ${isFollowing ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-[#25D366] text-black'}`}
                    >
                       {isFollowing ? 'Seguindo' : 'Seguir'}
                    </button>
                 </div>

                 {/* 3. MIC */}
                 <button onClick={() => setMicEnabled(!micEnabled)} className="flex flex-col items-center gap-1 group w-12 animate-fadeIn">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${micEnabled ? 'bg-black/40 text-white' : 'bg-red-500 text-white'}`}>
                        <i className={`fa-solid ${micEnabled ? 'fa-microphone' : 'fa-microphone-slash'} text-sm`}></i>
                     </div>
                     <span className="text-[9px] font-bold text-white drop-shadow-md">Mic</span>
                 </button>

                 {/* 4. LIKES (Substituiu efeitos) */}
                 <button onClick={() => setLikes(prev => prev + 1)} className="flex flex-col items-center gap-1 group w-12 animate-fadeIn">
                     <div className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md shadow-lg active:scale-90 transition-all hover:bg-white/10">
                        <i className="fa-solid fa-heart text-white text-lg group-active:text-red-500 transition-colors"></i>
                     </div>
                     <span className="text-[9px] font-black text-white drop-shadow-md tabular-nums">{formatLikes(likes)}</span>
                 </button>

                 {/* 5. LOJA */}
                 <button onClick={() => setShopOpen(true)} className="flex flex-col items-center gap-1 group w-12 animate-fadeIn">
                     <div className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:bg-[#25D366] hover:text-black transition-all">
                        <i className="fa-solid fa-bag-shopping text-sm"></i>
                     </div>
                     <span className="text-[9px] font-bold text-white drop-shadow-md">Loja</span>
                 </button>
                 
                 {/* 6. MIMO (Gifts) */}
                 <div className="relative flex flex-col items-center gap-1 group w-12 animate-fadeIn">
                     <button onClick={() => setShowMimoConfig(!showMimoConfig)} className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                        <i className="fa-solid fa-gift text-sm"></i>
                     </button>
                     <span className="text-[9px] font-bold text-white drop-shadow-md">Mimo</span>
                     
                     {showMimoConfig && (
                        <div className="absolute right-12 bottom-0 bg-[#1A1A1A] p-3 rounded-2xl border border-white/10 shadow-2xl w-48 z-[60] backdrop-blur-xl animate-fadeIn origin-bottom-right">
                           <h4 className="text-[10px] font-black text-white uppercase mb-2">Meta de Mimos</h4>
                           <div className="flex items-center gap-2 mb-2">
                              <input 
                                type="number" 
                                value={mimoGoal} 
                                onChange={(e) => setMimoGoal(Number(e.target.value))}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-[#25D366]" 
                              />
                           </div>
                           <button onClick={() => setShowMimoConfig(false)} className="w-full bg-[#25D366] text-black rounded-lg py-1 text-[9px] font-black uppercase hover:opacity-90">Definir Meta</button>
                        </div>
                     )}
                 </div>

             </div>

             {/* --- FLOATING PRODUCTS (DRAGGABLE) --- */}
             {floatingProducts.map((fp) => (
                 <div 
                    key={fp.instanceId}
                    style={{ 
                        top: fp.y, 
                        left: fp.x,
                        touchAction: 'none' // Important for touch dragging
                    }}
                    onMouseDown={(e) => handleDragStart(e, fp.instanceId)}
                    onTouchStart={(e) => handleDragStart(e, fp.instanceId)}
                    className="absolute w-28 aspect-[3/4] bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#25D366]/30 shadow-2xl z-[55] cursor-move animate-fadeIn pointer-events-auto"
                 >
                     <img src={fp.product.img} className="w-full h-full object-cover" />
                     {/* Overlay info */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-2">
                         <p className="text-[9px] font-bold text-white leading-tight mb-0.5 line-clamp-2">{fp.product.name}</p>
                         <p className="text-[10px] text-[#25D366] font-black">{fp.product.price} P</p>
                     </div>
                     {/* Close Button */}
                     <button 
                        onClick={(e) => { e.stopPropagation(); removeProductFromScreen(fp.instanceId); }}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                     >
                        <i className="fa-solid fa-xmark text-[10px]"></i>
                     </button>
                 </div>
             ))}

             {/* BOTTOM INPUT (TikTok Style - Sleek & Professional) */}
             <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-black via-black/80 to-transparent z-40 flex items-end gap-2 pointer-events-auto">
                <div className="flex-1 h-10 bg-white/10 backdrop-blur-md rounded-full px-4 border border-white/5 flex items-center shadow-sm focus-within:bg-white/20 focus-within:border-white/20 transition-all">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Adicionar comentário..." 
                        className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-white/60"
                    />
                    <button className="text-white/40 hover:text-white transition-colors">
                       <i className="fa-solid fa-at text-xs"></i>
                    </button>
                    <button className="text-white/40 hover:text-white transition-colors ml-2">
                       <i className="fa-regular fa-face-smile text-xs"></i>
                    </button>
                </div>
             </div>

             {shopOpen && (
                 <div className="absolute inset-0 z-[60] flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-fadeIn pointer-events-auto">
                     <div className="bg-[#1A1A1A] rounded-t-[2rem] p-6 h-[60%] border-t border-white/10 flex flex-col shadow-2xl">
                         <div className="flex justify-between items-center mb-6">
                             <div className="flex items-center gap-2">
                                <i className="fa-solid fa-bag-shopping text-[#25D366]"></i>
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">Produtos</h3>
                             </div>
                             <button onClick={() => setShopOpen(false)} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10">
                                <i className="fa-solid fa-xmark"></i>
                             </button>
                         </div>
                         <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
                             {products.map(p => (
                                 <div key={p.id} onClick={() => { addProductToScreen(p); }} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-[#25D366]/50 cursor-pointer active:scale-98 transition-all group">
                                     <img src={p.img} className="w-12 h-12 rounded-lg object-cover" />
                                     <div className="flex-1">
                                         <p className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">{p.name}</p>
                                         <p className="text-[10px] text-white/50">{p.price} PROTO</p>
                                     </div>
                                     <button className="bg-[#25D366] text-black px-3 py-1.5 rounded-lg text-[9px] font-black uppercase shadow-lg shadow-green-500/10">Fixar</button>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             )}
          </div>
       )}
    </div>
  );
};

// --- APP COMPONENT MAIN ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [adminSubView, setAdminSubView] = useState<AdminSubView>('dashboard');
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [playingItem, setPlayingItem] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Novo estado para controle de play/pause
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handlePlay = (item: any) => {
    setPlayingItem(item);
    setIsPlaying(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomeView onPlay={handlePlay} />;
      case 'shop': return <ShopView />;
      case 'reels': return <ReelsView />;
      case 'perfil': return <ProfileView />;
      case 'admin':
        // Renderiza o novo Sidebar e a área de conteúdo
        return (
          <div className="flex h-full w-full">
            <AdminSidebar current={adminSubView} onChange={setAdminSubView} />
            <div className="flex-1 overflow-hidden bg-[#050212] relative">
              <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                 {adminSubView === 'dashboard' && <AdminDashboardView />}
                 {adminSubView === 'users' && <AdminUsersView users={users} setUsers={setUsers} />}
                 {adminSubView === 'tv' && <AdminTVOnlineView products={SHOP_PRODUCTS} onNavigate={setAdminSubView} />}
                 {/* Placeholders para as novas páginas solicitadas */}
                 {['artists', 'radios', 'reels', 'podcasts', 'marketplace', 'wallet', 'settings'].includes(adminSubView) && (
                   <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
                     <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6">
                       <i className="fa-solid fa-code text-[#25D366] text-3xl"></i>
                     </div>
                     <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Módulo em Desenvolvimento</h2>
                     <p className="text-white/40 max-w-sm">A funcionalidade <span className="text-[#25D366] font-bold">{adminSubView.toUpperCase()}</span> estará disponível na próxima atualização do sistema Fluxx.</p>
                   </div>
                 )}
              </div>
            </div>
          </div>
        );
      default: return <HomeView onPlay={handlePlay} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#050212] overflow-hidden text-white font-sans selection:bg-[#25D366] selection:text-black">
       {/* Sidebar Principal (Navegação Global) */}
       <nav className="order-2 md:order-1 w-full md:w-20 h-[88px] md:h-full bg-black border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col items-center justify-between z-50 shrink-0 backdrop-blur-md pb-2 pt-2 px-6 md:px-0">
          <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform mt-4 mb-8" onClick={() => setCurrentView('home')}>
             <i className="fa-solid fa-bolt text-black text-xl"></i>
          </div>
          <div className="hidden md:flex flex-col gap-8 w-full items-center">
             {[
               { id: 'home', icon: 'fa-house' },
               { id: 'shop', icon: 'fa-bag-shopping' },
               { id: 'reels', icon: 'fa-play' },
               { id: 'perfil', icon: 'fa-user' },
               { id: 'admin', icon: 'fa-layer-group' }
             ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as ViewState)}
                  className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    currentView === item.id 
                    ? 'text-[#25D366] bg-[#25D366]/10' 
                    : 'text-white/20 hover:text-white hover:bg-white/5'
                  }`}
                >
                   <i className={`fa-solid ${item.icon} text-lg group-active:scale-90 transition-transform`}></i>
                   {currentView === item.id && (
                     <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#25D366] rounded-l-full hidden md:block"></div>
                   )}
                </button>
             ))}
          </div>
          <div className="md:hidden flex w-full justify-between items-end px-2">
              <button onClick={() => setCurrentView('home')} className="flex flex-col items-center gap-1 w-14">
                  <div className={`h-8 px-4 rounded-full flex items-center justify-center transition-all ${currentView === 'home' ? 'bg-[#FF4090] text-white shadow-[0_0_15px_rgba(255,64,144,0.5)]' : 'bg-transparent text-white/40'}`}>
                      <i className="fa-solid fa-house text-sm"></i>
                  </div>
                  <span className={`text-[10px] font-bold ${currentView === 'home' ? 'text-white' : 'text-white/40'}`}>Início</span>
              </button>
              <button onClick={() => setCurrentView('reels')} className="flex flex-col items-center gap-1 w-14 group">
                  <i className={`fa-solid fa-clapperboard text-xl mb-1 transition-colors ${currentView === 'reels' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}></i>
                  <span className={`text-[10px] font-medium ${currentView === 'reels' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>Reels</span>
              </button>
              <button onClick={() => setCurrentView('audios')} className="flex flex-col items-center gap-1 w-14 group">
                  <i className={`fa-solid fa-headphones-simple text-xl mb-1 transition-colors ${currentView === 'audios' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}></i>
                  <span className={`text-[10px] font-medium ${currentView === 'audios' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>Áudios</span>
              </button>
              <button onClick={() => setCurrentView('shop')} className="flex flex-col items-center gap-1 w-14 group">
                  <i className={`fa-solid fa-bag-shopping text-xl mb-1 transition-colors ${currentView === 'shop' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}></i>
                  <span className={`text-[10px] font-medium ${currentView === 'shop' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>Shop</span>
              </button>
              <button onClick={() => setCurrentView('admin')} className="flex flex-col items-center gap-1 w-16 group">
                  <i className={`fa-solid fa-layer-group text-xl mb-1 transition-colors ${currentView === 'admin' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}></i>
                  <span className={`text-[9px] font-medium whitespace-nowrap ${currentView === 'admin' ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>Painel Fluxx</span>
              </button>
          </div>
          <div className="hidden md:flex flex-col gap-6 items-center mt-auto pb-4">
             <button onClick={() => setIsChatOpen(true)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"><i className="fa-solid fa-robot"></i></button>
             <button onClick={() => setCurrentView('perfil')} className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg overflow-hidden hover:border-[#25D366] transition-colors">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
             </button>
          </div>
       </nav>

       {/* Main Area */}
       <main className="order-1 md:order-2 flex-1 h-full relative overflow-hidden bg-[#050212]">
          {renderContent()}
          
          <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          <AudioPlayer 
            item={playingItem} 
            isPlaying={isPlaying} 
            onToggle={() => setIsPlaying(!isPlaying)} 
            onClose={() => {
              setPlayingItem(null);
              setIsPlaying(false);
            }} 
          />
          
          {currentView !== 'admin' && (
            <button onClick={() => setIsChatOpen(true)} className="md:hidden fixed bottom-28 right-4 w-12 h-12 bg-[#25D366] text-black rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center z-40 active:scale-90 transition-all"><i className="fa-solid fa-robot text-xl"></i></button>
          )}
       </main>
    </div>
  );
};

export default App;