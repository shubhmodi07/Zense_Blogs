// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-p-qzaWY-T9dIIAGAohU_Vv9F3OjUvfM",
  authDomain: "zense-blogs.firebaseapp.com",
  projectId: "zense-blogs",
  storageBucket: "zense-blogs.firebasestorage.app",
  messagingSenderId: "50221076458",
  appId: "1:50221076458:web:3aaa6bef36fba2966aec93",
  measurementId: "G-DGCBJ54FTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
