import { openDB } from 'idb';
import { AppSetup } from 'components/constants';

const setupDB = async (config: Config):Promise<any> => {

  const {settingsStore, demoVideo} = config;

  const db = await openDB(AppSetup.NAME, AppSetup.VER, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(AppSetup.SETTINGS)) {
        const { html, md, txt, time_offset, current_video } = settingsStore;
        let settings = db.createObjectStore(AppSetup.SETTINGS, {
          keyPath: 'id',
          autoIncrement: true,
        });
        settings.createIndex('by_name', 'name', { unique: true });
        settings.add(html);
        settings.add(md);
        settings.add(txt);
        settings.add(time_offset);
        settings.add(current_video);
      }

      if (!db.objectStoreNames.contains(AppSetup.LIST)) {
        const { url, title } = demoVideo;
        const videoList = db.createObjectStore(AppSetup.LIST, {
          keyPath: 'url',
          autoIncrement: true,
        });
        videoList.createIndex('by_title', 'title');
        videoList.createIndex('by_url', 'url', { unique: true });
        videoList.add({
          title,
          url,
        });
      }

      if (!db.objectStoreNames.contains(AppSetup.NOTES)) {
        const { notes } = demoVideo;
        const videoNotes = db.createObjectStore(AppSetup.NOTES, {
          keyPath: 'id',
          autoIncrement: true,
        });
        videoNotes.createIndex('by_url', 'url');
        notes.forEach((note) => {
          videoNotes.add(note);
        });
      }
    },
  });

  return db;
};

export default setupDB;
