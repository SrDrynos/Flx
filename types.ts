
export interface AudioItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  type: 'music' | 'radio' | 'album' | 'podcast' | 'influencer' | 'figure' | 'nft';
  category?: string;
  stats?: string;
}

export type MainTab = 'radios' | 'reels' | 'musicas' | 'shop';
export type ViewState = 'home' | 'shop' | 'reels' | 'audios' | 'perfil' | 'artist' | 'wallet' | 'player' | 'admin';
export type AdminSubView = 'dashboard' | 'users' | 'tokens' | 'moderation' | 'store' | 'reports' | 'settings';

export interface UserAccount {
  id: string;
  name: string;
  role: 'Master' | 'Admin' | 'Artista' | 'Criador' | 'Usuario';
  status: 'Ativo' | 'Suspenso';
  earnings: number;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: 'Pendente' | 'Aprovado' | 'Recusado';
  date: string;
}

export interface PendingContent {
  id: string;
  title: string;
  type: 'Reel' | 'Musica';
  author: string;
  thumbnail: string;
}

export interface AppState {
  currentView: ViewState;
  playingItem: AudioItem | null;
  isPlaying: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  mimeType: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
