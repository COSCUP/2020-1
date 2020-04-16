export interface TagData {
  id: string;
  en: { name: string };
  zh: { name: string };
}

export interface SessionTypeData {
  id: string;
  en: { name: string };
  zh: { name: string };
}

export interface RoomData {
  id: string;
  en: { name: string };
  zh: { name: string };
}

export interface SpeakerData {
  id: string;
  en: { name: string; bio: string };
  zh: { name: string; bio: string };
}

export interface SessionData {
  id: string;
  type: string | null;
  room: string;
  start: string;
  end: string;
  broadcast: string | null;
  qa: string | null;
  slide: string | null;
  live: string | null;
  record: string | null;
  pad: string | null;
  en: { title: string; description: string };
  zh: { title: string; description: string };
  speakers: string[];
  tags: string[];
}

export interface Session {
  id: string;
  type: SessionTypeData;
  room: RoomData;
  start: Date;
  end: Date;
  broadcast: string | null;
  qa: string | null;
  slide: string | null;
  live: string | null;
  record: string | null;
  pad: string | null;
  en: { title: string; description: string };
  zh: { title: string; description: string };
  speakers: SpeakerData[];
  tags: TagData[];
}

export interface AgendaState {
  sessions: Session[];
  rooms: RoomData[];
}
