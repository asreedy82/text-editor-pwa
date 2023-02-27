import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('updating database');

  const jateDb = await openDB('jate',1);

  const transaction = jateDb.transaction('jate', 'readwrite');

  const store = transaction.objectStore('jate');

  const textAdd = store.add(content);

  const result = await textAdd;
  console.log('Text data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate',1);

  const transaction = jateDb.transaction('jate', 'readonly');

  const store = transaction.objectStore('jate');

  const getText = store.getAll();

  const result = await getText;
  console.log('result.value', result);
  return result;
};

initdb();
