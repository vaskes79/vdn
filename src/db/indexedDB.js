import { openDB } from 'idb';
import { NAME_DB, VER_DB, VDN_LIST, VDN_NOTES, VDN_SETTINGS } from '../constants';

const setupDB = async ({ settingsStore, demoVideo }) => {
  let db = await openDB(NAME_DB, VER_DB, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(VDN_SETTINGS)) {
        const { html, md, txt, time_offset } = settingsStore;
        let settings = db.createObjectStore(VDN_SETTINGS, {
          keyPath: 'id',
          autoIncrement: true
        });
        settings.createIndex('by_name', 'name', { unique: true });
        settings.add(html);
        settings.add(md);
        settings.add(txt);
        settings.add(time_offset);
      }

      if (!db.objectStoreNames.contains(VDN_LIST)) {
        const { url, title } = demoVideo;
        const videoList = db.createObjectStore(VDN_LIST, {
          keyPath: 'url',
          autoIncrement: true
        });
        videoList.createIndex('by_title', 'title');
        videoList.createIndex('by_url', 'url', { unique: true });
        videoList.add({
          title,
          url
        });
      }

      if (!db.objectStoreNames.contains(VDN_NOTES)) {
        const { notes } = demoVideo;
        const videoNotes = db.createObjectStore(VDN_NOTES, {
          keyPath: 'id',
          autoIncrement: true
        });
        videoNotes.createIndex('by_url', 'url');
        notes.forEach(note => {
          videoNotes.add(note);
        });
      }
    }
  });
  return db;
};

class IndexDBConnector {
  constructor(settings) {
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

  addVideo = async (title, url) => {
    const db = await this.db;
    const tx = db.transaction(VDN_LIST, 'readwrite');
    const vdnListStore = tx.objectStore(VDN_LIST);
    const vdnItem = {
      title,
      url
    };
    try {
      await vdnListStore.add(vdnItem);
      await tx.done;
    } catch (err) {
      console.log('addVideo error', err.message);
    }
  };

  removeVideo = async urlID => {
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
    } catch (err) {
      console.log('removeVideo error', err.message);
    }
  };

  removeNote = async id => {
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

  addNote = async (url, title, time) => {
    const db = await this.db;
    const tx = db.transaction(VDN_NOTES, 'readwrite');
    const vdnNotesStore = tx.objectStore(VDN_NOTES);
    const vdnNoteItem = {
      title,
      url,
      time
    };
    try {
      await vdnNotesStore.add(vdnNoteItem);
      await tx.done;
    } catch (err) {
      console.log('addNote error', err.message);
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

  getNoteList = async url => {
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
}

export default IndexDBConnector;
