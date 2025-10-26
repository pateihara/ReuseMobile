// src/services/firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAAa9v7F-Un2_jw_KdlWUey7FO3dW712JA',
  authDomain: 'reuse-mobile.firebaseapp.com',
  projectId: 'reuse-mobile',
  storageBucket: 'reuse-mobile.firebasestorage.app',
  messagingSenderId: '257764412083',
  appId: '1:257764412083:web:ff73b22158b74cd6837ec6',
  measurementId: 'G-QY9Z20Y4ZG',
};

export const app = initializeApp(firebaseConfig);
