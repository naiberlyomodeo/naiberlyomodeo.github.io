// =============================================================
// Firebase Configuration — PLACEHOLDER
// =============================================================
// Replace these values with your real Firebase project config.
// To get these:
//   1. Go to https://console.firebase.google.com
//   2. Create a project (or use an existing one)
//   3. Go to Project Settings > General > Your apps > Web app
//   4. Copy the firebaseConfig object
//
// Then enable:
//   - Authentication > Email/Password
//   - Firestore Database
//
// These keys are safe to commit — Firebase security comes from
// Firestore Rules, not from hiding these keys.
// =============================================================

const FIREBASE_CONFIG = {
  apiKey: "PLACEHOLDER",
  authDomain: "PLACEHOLDER.firebaseapp.com",
  projectId: "PLACEHOLDER",
  storageBucket: "PLACEHOLDER.appspot.com",
  messagingSenderId: "000000000000",
  appId: "0:000000000000:web:000000000000",
};

// When PLACEHOLDER is detected, the app runs in demo mode using localStorage.
const DEMO_MODE = FIREBASE_CONFIG.apiKey === "PLACEHOLDER";
