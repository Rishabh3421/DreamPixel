
/**
 * Utility for storing and retrieving images using IndexedDB
 * This is a temporary solution until Supabase integration is implemented
 */

const DB_NAME = "dreamPixelDB";
const STORE_NAME = "generatedImages";
const DB_VERSION = 1;

interface ImageData {
  id: string;
  url: string;
  prompt: string;
  createdAt: string;
}

// Initialize the database
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(new Error("Failed to open database"));

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
  });
};

// Save an image to IndexedDB
export const saveImage = async (imageData: ImageData): Promise<string> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(imageData);

      request.onsuccess = () => resolve(imageData.id);
      request.onerror = () => reject(new Error("Failed to save image"));
    });
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
};

// Get all images from IndexedDB
export const getAllImages = async (): Promise<ImageData[]> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const createdAtIndex = store.index("createdAt");
      const request = createdAtIndex.openCursor(null, "prev"); // Most recent first
      
      const results: ImageData[] = [];

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(new Error("Failed to retrieve images"));
    });
  } catch (error) {
    console.error("Error getting images:", error);
    return [];
  }
};

// Delete an image from IndexedDB
export const deleteImage = async (id: string): Promise<boolean> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error("Failed to delete image"));
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

// Get a specific image by ID
export const getImageById = async (id: string): Promise<ImageData | null> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(new Error("Failed to retrieve image"));
    });
  } catch (error) {
    console.error("Error getting image:", error);
    return null;
  }
};
