import { VDN_LIST, VDN_NOTES, VDN_SETTINGS } from 'components/constants';
import setupDB from './indexDBsetup';
import { defaultConfig } from './indexDBconfig';

export default class IndexDBConnector {
  constructor(settings = defaultConfig) {
    this.db = setupDB(settings);
  }

  setSettings = async (name, value) => {
    const db = await this.db;
    const tx = db.transaction(VDN_SETTINGS, 'readwrite');
    const store = tx.objectStore(VDN_SETTINGS);
    const index = store.index('by_name');
    try {
      const reqObj = await index.get(name);
      const newObj = { ...reqObj, value };
      await store.put(newObj);
      await tx.done;
    } catch (err) {
      console.log('setSettings error', err.message);
    }
  };

  addVideo = async ({ title, url }) => {
    const db = await this.db;
    const tx = db.transaction(VDN_LIST, 'readwrite');
    const vdnListStore = tx.objectStore(VDN_LIST);
    const vdnItem = {
      title,
      url,
    };
    try {
      await vdnListStore.add(vdnItem);
      await tx.done;
    } catch (err) {
      console.log('addVideo error', err.message);
    }
  };

  removeVideo = async (urlID) => {
    const db = await this.db;
    const tx = db.transaction([VDN_LIST, VDN_NOTES], 'readwrite');
    const vdnListStore = tx.objectStore(VDN_LIST);
    const vdnNotesStore = tx.objectStore(VDN_NOTES);
    const indexNote = vdnNotesStore.index('by_url');
    try {
      await vdnListStore.delete(urlID);
      let notesCursor = await indexNote.openCursor(IDBKeyRange.only(urlID));
      while (notesCursor) {
        await notesCursor.delete(notesCursor.primaryKey);
        notesCursor = await notesCursor.continue();
      }
      await tx.done;
      // todo: make dinamic
      this.setCurrentVideo('https://youtu.be/cCOL7MC4Pl0');
    } catch (err) {
      console.log('removeVideo error', err.message);
    }
  };

  editVideo = async (urlID, title) => {
    const db = await this.db;
    const tx = db.transaction(VDN_LIST, 'readwrite');
    const vdnListStore = tx.objectStore(VDN_LIST);
    try {
      let video = await vdnListStore.get(urlID);
      video = { ...video, title };
      await vdnListStore.put(video);
      await tx.done;
    } catch (err) {
      console.log('editVideo error', err.message);
    }
  };

  addNote = async ({ url, title, time }) => {
    const db = await this.db;
    const tx = db.transaction(VDN_NOTES, 'readwrite');
    const vdnNotesStore = tx.objectStore(VDN_NOTES);
    const vdnNoteItem = {
      title,
      url,
      time,
    };
    try {
      await vdnNotesStore.add(vdnNoteItem);
      await tx.done;
    } catch (err) {
      console.log('addNote error', err.message);
    }
  };

  removeNote = async (id) => {
    const db = await this.db;
    const tx = db.transaction(VDN_NOTES, 'readwrite');
    const vdnNotesStore = tx.objectStore(VDN_NOTES);

    try {
      await vdnNotesStore.delete(id);
      await tx.done;
    } catch (err) {
      console.log('removeVideo error', err.message);
    }
  };

  editNote = async (urlID, title) => {
    const db = await this.db;
    const tx = db.transaction(VDN_NOTES, 'readwrite');
    const vdnNotesStore = tx.objectStore(VDN_NOTES);
    try {
      let note = await vdnNotesStore.get(urlID);
      note = { ...note, title };
      await vdnNotesStore.put(note);
      await tx.done;
    } catch (err) {
      console.log('editVideo error', err.message);
    }
  };

  getVideoList = async () => {
    const db = await this.db;
    const tx = db.transaction(VDN_LIST, 'readonly');
    const vdnListStore = tx.objectStore(VDN_LIST);
    try {
      let videoList = await vdnListStore.getAll();
      await tx.done;
      return videoList;
    } catch (err) {
      console.log('getVideoList error', err.message);
    }
  };

  getNoteList = async (url) => {
    const db = await this.db;
    const tx = db.transaction(VDN_NOTES, 'readonly');
    const vdnNotesStore = tx.objectStore(VDN_NOTES);
    try {
      let notes = null;
      if (url) {
        const index = vdnNotesStore.index('by_url');
        notes = await index.getAll(url);
      } else {
        notes = await vdnNotesStore.getAll();
      }
      await tx.done;
      return notes;
    } catch (err) {
      console.log('getNoteList error', err.message);
    }
  };

  getCurrentVideo = async () => {
    const db = await this.db;
    const tx = db.transaction(VDN_SETTINGS, 'readonly');
    const vdnSettings = tx.objectStore(VDN_SETTINGS);
    try {
      const index = vdnSettings.index('by_name');
      let currentVideo = await index.getAll('current_video');
      await tx.done;
      return currentVideo;
    } catch (err) {
      console.log('getCurrentVideo error', err.message);
    }
  };

  setCurrentVideo = async (value) => {
    const db = await this.db;
    const tx = db.transaction(VDN_SETTINGS, 'readwrite');
    const vdnSettings = tx.objectStore(VDN_SETTINGS);
    try {
      const index = vdnSettings.index('by_name');
      let currentVideo = await index.get('current_video');
      await index.objectStore.put({ ...currentVideo, value });
      await tx.done;
      return currentVideo;
    } catch (err) {
      console.log('getCurrentVideo error', err.message);
    }
  };
}
