interface NoteFormat {
  name: string;
  value: boolean;
  label: string;
  description: string;
}

interface TimeOffset {
  name: string;
  value: number;
  label: string;
  description: string;
}

interface CurrentVideo {
  name: string;
  value: string;
  label: string;
  description: string;
}

interface Note {
  url: string;
  title: string;
  time: number;
}

interface DemoVideo {
  url: string;
  title: string;
  notes: Array<Note>;
}

interface SettingsStore {
  html: NoteFormat;
  md: NoteFormat;
  txt: NoteFormat;
  current_video: CurrentVideo;
  time_offset: TimeOffset;
}

interface Config {
  settingsStore: SettingsStore;
  demoVideo: DemoVideo;
}

interface Video {
  url: string;
  title: string;
  notes: Array<Note>;
}
