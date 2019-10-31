import { openDB } from 'idb';

const setupDB = async () => {
  let db = await openDB('VDN', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('settings')) {
        let settings = db.createObjectStore('settings', {
          keyPath: 'id',
          autoIncrement: true
        });
        settings.createIndex('by_name', 'name', { unique: true });

        settings.add({
          name: 'html',
          value: true,
          label: 'html',
          description: 'using for activate deactivate button for copy html notes'
        });
        settings.add({
          name: 'md',
          value: true,
          label: 'markdown',
          description: 'using for activate deactivate button for copy markdown notes'
        });
        settings.add({
          name: 'txt',
          value: true,
          label: 'text',
          description: 'using for, activate deactivate button for copy text notes'
        });
        settings.add({
          name: 'time_offset',
          value: 3,
          label: 'time offset',
          description:
            'using for set time offset seconds for saved current time video, accessible value 0, 3, 5, 10, default value 3 seconds'
        });
      }

      const url = 'https://youtu.be/cCOL7MC4Pl0';
      const title = 'Видео инструкция';

      if (!db.objectStoreNames.contains('videoList')) {
        const videoList = db.createObjectStore('videoList', {
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

      if (!db.objectStoreNames.contains('videoNotes')) {
        const videoNotes = db.createObjectStore('videoNotes', {
          keyPath: 'url',
          autoIncrement: true
        });

        videoNotes.createIndex('by_url', 'url', { unique: true });

        videoNotes.add({
          url,
          notes: []
        });
      }
    }
  });
  return db;
};

class IndexDBConnector {
  constructor() {
    this.db = setupDB();
  }

  setSettings = async (name, value) => {
    const db = await this.db;
    const tx = db.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
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
}

export default IndexDBConnector;
