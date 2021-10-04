import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAYhT2NCCYNFBx0v1kVPpXzClXg_ZSWST0",
	authDomain: "whatsapp-clone-367fb.firebaseapp.com",
	projectId: "whatsapp-clone-367fb",
	storageBucket: "whatsapp-clone-367fb.appspot.com",
	messagingSenderId: "92007804662",
	appId: "1:92007804662:web:0287ef111bfd0280ad46d7",
	measurementId: "G-JEZ76RXCYC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
