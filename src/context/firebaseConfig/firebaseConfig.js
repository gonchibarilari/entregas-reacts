import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBBRzfz2q1VxsnEPpmkm-ciQJ_vbd9YVEU",
  authDomain: "proyectoecom-2138b.firebaseapp.com",
  projectId: "proyectoecom-2138b",
  storageBucket: "proyectoecom-2138b.firebasestorage.app",
  messagingSenderId: "641630802955",
  appId: "1:641630802955:web:be185062df85f3ca6ba30e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
