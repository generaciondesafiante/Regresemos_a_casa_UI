
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";;
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAWF3JuhrakXQg1a74TtDU1Ab704ZNHe7s",
  authDomain: "photoperfilusers.firebaseapp.com",
  projectId: "photoperfilusers",
  storageBucket: "photoperfilusers.appspot.com",
  messagingSenderId: "1095944212939",
  appId: "1:1095944212939:web:56caa09500d90e8191264e",
  measurementId: "G-N9DLMLCE2B"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

export async function uploadFile(file:File,id: string) {
  console.log(file,id);
  const storageRef =  ref(storage, `users/${id}/profile-image`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
 
}


