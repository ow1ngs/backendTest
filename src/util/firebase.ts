import { doc, collection, getDocs, addDoc, updateDoc, getDoc } from "firebase/firestore/lite";

export const firebaseConfig = {
  apiKey: "AIzaSyAs15Ak-nQkBOQloSo6VUXrY9EpI_X3qRg",
  authDomain: "backendtest-cc720.firebaseapp.com",
  projectId: "backendtest-cc720",
  storageBucket: "backendtest-cc720.appspot.com",
  messagingSenderId: "323844525458",
  appId: "1:323844525458:web:95a537d3d55aa8c76ec54b",
  measurementId: "G-LJDB359TYE",
};

export async function getUsers(db: any) {
  const userCols = collection(db, "userCollection");
  const userSnapshot = await getDocs(userCols);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

export async function getSongs(db: any) {
  const songsCols = collection(db, "songsCollection");
  const songsSnapshot = await getDocs(songsCols);
  const songsList = songsSnapshot.docs.map((doc) => { 
    const docs = doc.data();
    const id = doc.id;
    return { id, ...docs }
  });
  return songsList;
}

export async function getSongById(db: any, id: string) {
  const docRef = doc(db, "songsCollection", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function postUser(db: any, email: string, password: string) {
  const response = await addDoc(collection(db, "userCollection"), {
    email: email,
    password: password
  });
  return response;
}

export async function postSongs(db: any, song: any) {
  const response = await addDoc(collection(db, "songsCollection"), {
    album: song.album,
    artist: song.artist,
    createdBy: song.createdBy,
    songName: song.songName,
    visibility: song.visibility,
    year: song.year
  });
  return response;
}


export async function putSongs(db: any, song: any, id: string) {
  
  const response = await updateDoc(doc(db, "songsCollection", id), song);
  return response;
}
