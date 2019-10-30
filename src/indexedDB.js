class IndexDBConnector {
  constructor({ DB_NAME, DB_VER }) {
    this.indexedDB =
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    this.DB_NAME = DB_NAME || 'VDN';
    this.DB_VER = DB_VER || 1;
  }

  error = e => {
    console.log(`error: ${e}`);
  };

  upgrade = e => {
    // Save the IDBDatabase interface
    this.db = e.target.result;

    // Create an objectStore for this database
    // var objectStore = db.createObjectStore('settings', { keyPath: 'id', autoIncrement: true });
    if (!this.db.objectStoreNames.contains('settings')) {
      let objectStore = this.db.createObjectStore('settings', {
        keyPath: 'name',
        autoIncrement: true
      });
    }
  };

  success = async e => {
    console.log(`success: `, e.target.result);

    this.db = await e.target.result;
  };

  setSettings = ({ name = 'html', value = true }) => {
    let setup = {
      name,
      value,
      id: 'id',
      created: new Date()
    };
    console.log('this.db = ', this.db);

    let transaction = this.db.transaction(['settings'], 'readwrite');
    let store = transaction.objectStore('settings');
    let request = store.add(setup);
    request.onsuccess = e => console.log(e.target.result);
    request.onerror = e => console.log(e);
  };

  init = () => {
    if (!this.indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
      );
    }
    var request = this.indexedDB.open(this.DB_NAME, this.DB_VER);

    request.onupgradeneeded = this.upgrade;
    request.onsuccess = this.success;
    request.onerror = this.error;
  };
}

export default IndexDBConnector;
