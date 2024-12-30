import { openDB } from "idb";

// Create or open the IndexedDB database
export const openDatabase = async () => {
  if (typeof window === "undefined") {
    return null; // Avoid running on the server
  }
  if (openDB !== undefined) {
    const db = await openDB("myDatabase", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("items")) {
          db.createObjectStore("items");
        }
      }
    });
    return db;
  }
};

// Add an item to the database
export const addItem = async (item) => {
  const db = await openDatabase();
  await db.put("items", item, item.id); // 'id' as key
  console.log("Item added:", item);
};

// Get all items from the database
export const getAllItems = async () => {
  const db = await openDatabase();
  const items = await db.getAll("items");
  console.log("All items retrieved:", items);
  return items;
};
