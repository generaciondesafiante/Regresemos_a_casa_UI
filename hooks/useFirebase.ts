import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyA1x8hLOPIq83N9K3gEHclkqsIqAX54riI",
  authDomain: "photoperfilusers-6768e.firebaseapp.com",
  projectId: "photoperfilusers-6768e",
  storageBucket: "photoperfilusers-6768e.appspot.com",
  messagingSenderId: "1076936385065",
  appId: "1:1076936385065:web:6ae560d78dd030a3beb238",
  measurementId: "G-9EJCPWXWN4"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File, id: string) {
  const storageRef = ref(storage, `users/${id}/profile-image`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
}
