import { AppSetup } from 'components/constants';
import setupDB from './indexDBsetup';
import { defaultConfig } from './indexDBconfig';

export default class IndexDBConnector {
  constructor(settings = defaultConfig) {
    this.db = setupDB(settings);
  }
  private db;

  getStore = async (storeName: string, errorMSG?: string): Promise<any> => {
    try {
      const db: IDBDatabase = await this.db;
      const tx: IDBTransaction = db.transaction(storeName, 'readwrite');
      const store: IDBObjectStore = tx.objectStore(storeName);
      return store;
    } catch (err) {
      console.log(errorMSG, err.message);
    }
  };

  setSettings = async (name: string, value: string): Promise<void> => {
    const store: IDBObjectStore = await this.getStore(AppSetup.SETTINGS);
    const index = store.index('by_name');
    const reqObj = index.get(name);
    const newObj = { ...reqObj, value };
    store.put(newObj);
  };

  addVideo = async (video: Video): Promise<void> => {
    const { title, url } = video;
    const vdnListStore: IDBObjectStore = await this.getStore(AppSetup.LIST);
    const vdnItem = {
      title,
      url,
    };
    vdnListStore.add(vdnItem);
  };

  removeVideo = async (urlID: string | number) => {
    const vdnListStore = await this.getStore(AppSetup.LIST, 'remove video method videolist');
    const vdnNotesStore = await this.getStore(AppSetup.NOTES, 'remove video method notes');
    const indexNote = vdnNotesStore.index('by_url');
    vdnListStore.delete(urlID);
    let notesCursor = await indexNote.openCursor(IDBKeyRange.only(urlID));
    while (notesCursor) {
      await notesCursor.delete(notesCursor.primaryKey);
      notesCursor = await notesCursor.continue();
    }
    // todo: make dinamic
    this.setCurrentVideo('https://youtu.be/cCOL7MC4Pl0');
  };

  editVideo = async (urlID: string | number, title: string) => {
    const vdnListStore = await this.getStore(AppSetup.LIST, 'edit video error');
    let video = await vdnListStore.get(urlID);
    video = { ...video, title };
    vdnListStore.put(video);
  };

  addNote = async (noteItem: Note) => {
    const { url, title, time } = noteItem;
    const vdnNotesStore = await this.getStore(AppSetup.NOTES, 'add note error');
    const vdnNoteItem = {
      title,
      url,
      time,
    };
    vdnNotesStore.add(vdnNoteItem);
  };

  removeNote = async (id: string | number) => {
    const vdnNotesStore = await this.getStore(AppSetup.NOTES, 'remove note errors');
    vdnNotesStore.delete(id);
  };

  editNote = async (urlID: string | number, title: string) => {
    const vdnNotesStore = await this.getStore(AppSetup.NOTES, 'edit note errors');
    let note = await vdnNotesStore.get(urlID);
    note = { ...note, title };
    vdnNotesStore.put(note);
  };

  getVideoList = async () => {
    const vdnListStore = await this.getStore(AppSetup.LIST, 'get video lsit error');
    let videoList = await vdnListStore.getAll();
    return videoList;
  };

  getNoteList = async (url: string) => {
    const vdnNotesStore = await this.getStore(AppSetup.NOTES, 'get note list errors');
    let notes = null;
    if (url) {
      const index = vdnNotesStore.index('by_url');
      notes = await index.getAll(url);
    } else {
      notes = await vdnNotesStore.getAll();
    }
    return notes;
  };

  getCurrentVideo = async () => {
    const vdnSettings = await this.getStore(AppSetup.SETTINGS, 'get current video error');
    const index = vdnSettings.index('by_name');
    let currentVideo = await index.getAll('current_video');
    return currentVideo;
  };

  setCurrentVideo = async (value: string | number) => {
    const vdnSettings = await this.getStore(AppSetup.SETTINGS, 'set current video');
    const index = vdnSettings.index('by_name');
    let currentVideo = await index.get('current_video');
    await index.objectStore.put({ ...currentVideo, value });
    return currentVideo;
  };
}
