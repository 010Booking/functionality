import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // 여기에 Firebase 설정을 복사 붙여넣기하세요.
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
