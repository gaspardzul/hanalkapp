// Firebase configuration and services
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { Restaurant } from '@/types/restaurant';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is configured
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value && value !== 'undefined' && !value.toString().includes('your_')
);

// Initialize Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
  }
} else {
  console.warn('⚠️ Firebase not configured. Using localStorage for favorites.');
}

// Export instances
export { app, auth, db };

// Auth state listener type
export type AuthStateCallback = (user: User | null) => void;

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: AuthStateCallback): (() => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<User> => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    console.log('✅ User signed in:', result.user.displayName);
    return result.user;
  } catch (error: any) {
    console.error('❌ Sign in error:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Inicio de sesión cancelado');
    }
    throw new Error('Error al iniciar sesión con Google');
  }
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    await firebaseSignOut(auth);
    console.log('✅ User signed out');
  } catch (error) {
    console.error('❌ Sign out error:', error);
    throw new Error('Error al cerrar sesión');
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth?.currentUser || null;
};

// ==================== FAVORITES ====================

/**
 * Add restaurant to favorites
 */
export const addFavorite = async (
  userId: string,
  restaurant: Restaurant
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const favoriteRef = doc(db, 'users', userId, 'favorites', restaurant.place_id);

    // Build placeData object, filtering out undefined values
    const placeData: any = {
      place_id: restaurant.place_id,
      name: restaurant.name,
      formatted_address: restaurant.formatted_address,
      geometry: restaurant.geometry,
    };

    // Only add optional fields if they're defined
    if (restaurant.rating !== undefined) placeData.rating = restaurant.rating;
    if (restaurant.user_ratings_total !== undefined) placeData.user_ratings_total = restaurant.user_ratings_total;
    if (restaurant.price_level !== undefined) placeData.price_level = restaurant.price_level;

    // Convert photo objects to URLs (photos contain functions that can't be serialized)
    if (restaurant.photos && restaurant.photos.length > 0) {
      try {
        const photo = restaurant.photos[0] as any; // Google Places PlacePhoto object
        // If photo has getUrl method, get the URL string
        if (photo && typeof photo.getUrl === 'function') {
          const photoUrl = photo.getUrl({ maxWidth: 400 });
          placeData.photoUrl = photoUrl; // Save as string URL, not object
        }
      } catch (e) {
        console.warn('Could not extract photo URL:', e);
      }
    }

    if (restaurant.types !== undefined) placeData.types = restaurant.types;
    if (restaurant.vicinity !== undefined) placeData.vicinity = restaurant.vicinity;

    await setDoc(favoriteRef, {
      placeId: restaurant.place_id,
      savedAt: Timestamp.now(),
      placeData
    });
    console.log('✅ Favorite added:', restaurant.name);
  } catch (error) {
    console.error('❌ Error adding favorite:', error);
    throw new Error('Error al guardar favorito');
  }
};

/**
 * Remove restaurant from favorites
 */
export const removeFavorite = async (
  userId: string,
  placeId: string
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const favoriteRef = doc(db, 'users', userId, 'favorites', placeId);
    await deleteDoc(favoriteRef);
    console.log('✅ Favorite removed:', placeId);
  } catch (error) {
    console.error('❌ Error removing favorite:', error);
    throw new Error('Error al eliminar favorito');
  }
};

/**
 * Get all favorites for a user
 */
export const getFavorites = async (userId: string): Promise<Restaurant[]> => {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const q = query(favoritesRef, orderBy('savedAt', 'desc'));
    const snapshot = await getDocs(q);

    const favorites: Restaurant[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.placeData) {
        favorites.push(data.placeData as Restaurant);
      }
    });

    console.log(`✅ Loaded ${favorites.length} favorites`);
    return favorites;
  } catch (error) {
    console.error('❌ Error getting favorites:', error);
    throw new Error('Error al cargar favoritos');
  }
};

/**
 * Check if a restaurant is favorited
 */
export const isFavorite = async (
  userId: string,
  placeId: string
): Promise<boolean> => {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const favoriteRef = doc(db, 'users', userId, 'favorites', placeId);
    const snapshot = await getDoc(favoriteRef);
    return snapshot.exists();
  } catch (error) {
    console.error('❌ Error checking favorite:', error);
    return false;
  }
};

/**
 * Check if Firebase is available
 */
export const isFirebaseAvailable = (): boolean => {
  return isFirebaseConfigured && !!auth && !!db;
};
