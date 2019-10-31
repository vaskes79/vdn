import { openDB } from 'idb';

const setupDB = async ({ settingsStore, demoVideo }) => {
  let db = await openDB('VDN', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('vdnSettings')) {
        const { html, md, txt, time_offset } = settingsStore;
        let settings = db.createObjectStore('vdnSettings', {
          keyPath: 'id',
          autoIncrement: true
        });
        settings.createIndex('by_name', 'name', { unique: true });
        settings.add(html);
        settings.add(md);
        settings.add(txt);
        settings.add(time_offset);
      }

      if (!db.objectStoreNames.contains('vdnList')) {
        const { url, title } = demoVideo;
        const videoList = db.createObjectStore('vdnList', {
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

      if (!db.objectStoreNames.contains('vdnNotes')) {
        const { notes } = demoVideo;
        const videoNotes = db.createObjectStore('vdnNotes', {
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
    const tx = db.transaction('vdnSettings', 'readwrite');
    const store = tx.objectStore('vdnSettings');
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
    const tx = db.transaction('vdnList', 'readwrite');
    const vdnListStore = tx.objectStore('vdnList');
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
    const tx = db.transaction('vdnNotes', 'readwrite');
    const vdnNotesStore = tx.objectStore('vdnNotes');
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
}

export default IndexDBConnector;
