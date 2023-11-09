import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSession } from 'next-auth/react';

const firebaseConfig = {
  apiKey: 'AIzaSyAHm0AKBVb6ebPxUIM9hVqfLqnliu4SeCw',
  authDomain: 'image-profile-user.firebaseapp.com',
  projectId: 'image-profile-user',
  storageBucket: 'image-profile-user.appspot.com',
  messagingSenderId: '607985851033',
  appId: '1:607985851033:web:2b5e32ec683f1733cd3608',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file: File) {
  const { data: session } = useSession();


  if (!session?.user?.uid) {
    console.error('No se encontró el UID del usuario en el localStorage');
    return;
  }

  const storageRef = ref(storage, `users/${session?.user?.uid}/profile-image`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
}