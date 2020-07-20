import { openDB } from 'idb';
import { NAME_DB, VER_DB, VDN_LIST, VDN_NOTES, VDN_SETTINGS } from 'components/constants';

const setupDB = async ({ settingsStore, demoVideo }) => {
  let db = await openDB(NAME_DB, VER_DB, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(VDN_SETTINGS)) {
        const { html, md, txt, time_offset, current_video } = settingsStore;
        let settings = db.createObjectStore(VDN_SETTINGS, {
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

      if (!db.objectStoreNames.contains(VDN_LIST)) {
        const { url, title } = demoVideo;
        const videoList = db.createObjectStore(VDN_LIST, {
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

      if (!db.objectStoreNames.contains(VDN_NOTES)) {
        const { notes } = demoVideo;
        const videoNotes = db.createObjectStore(VDN_NOTES, {
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
