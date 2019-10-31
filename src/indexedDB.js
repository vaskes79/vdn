import { openDB } from 'idb';
import { NAME_DB, VER_DB, VDN_LIST, VDN_NOTES, VDN_SETTINGS } from './constants';

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
          keyPath: 'id',
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
        videoNotes.createIndex('by_url', 'url', { unique: true });
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
      await tx.complete;
      console.log(`setSettings ${name} was changed to ${value}`);
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
      await tx.complete;
      console.log(`addVideo ${title} url ${url}`);
    } catch (err) {
      console.log('setSettings error', err.message);
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
      await tx.complete;
      console.log(`addVideo ${title} url ${url}`);
    } catch (err) {
      console.log('setSettings error', err.message);
    }
  };

  getVideoList = async () => {
    const db = await this.db;
    const tx = db.transaction(VDN_LIST, 'readonly');
    const vdnListStore = tx.objectStore(VDN_LIST);

    try {
      let videoList = await vdnListStore.getAll();
      await tx.complete;
      console.log(`getVideoList return ${videoList}`, videoList);
    } catch (err) {
      console.log('setSettings error', err.message);
    }
  };
}

export default IndexDBConnector;
