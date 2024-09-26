import { initializeApp, getApps } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGXDmfgOU9QL4AL-ItZP7-s8JDryhfFjY",
  authDomain: "resources-475e3.firebaseapp.com",
  projectId: "resources-475e3",
  storageBucket: "resources-475e3.appspot.com",
  messagingSenderId: "817864533685",
  appId: "1:817864533685:web:23e349255ef26a8d5c40fc",
  measurementId: "G-7EBSRYG6FB",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);

/**
 * @param {File} resourceFile
 * @param {File | null} thumbnailFile
 * @param {string} resourceId
 * @returns {Promise<{resourceUrl: string, thumbnailUrl: string | null}>}
 */

export async function uploadResourceAndThumbnail(
  resourceFile: File,
  thumbnailFile: File | null,
  resourceId: string
): Promise<{ resourceUrl: string; thumbnailUrl: string | null }> {
  const resourceRef = ref(storage, `resources/${resourceId}/resource-file`);
  await uploadBytes(resourceRef, resourceFile);
  const resourceUrl = await getDownloadURL(resourceRef);

  let thumbnailUrl: string | null = null;

  
  if (thumbnailFile) {
    const thumbnailRef = ref(storage, `resources/${resourceId}/thumbnail`);
    await uploadBytes(thumbnailRef, thumbnailFile);
    thumbnailUrl = await getDownloadURL(thumbnailRef);
  }

  return { resourceUrl, thumbnailUrl };
}
