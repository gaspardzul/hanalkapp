# 🔥 Firebase Setup Guide - HanalKapp

## Firebase Features Implemented

HanalKapp uses Firebase for:

1. **Authentication** - Google Sign-In
2. **Firestore Database** - User favorites storage
3. **Real-time Sync** - Favorites sync across devices

---

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it "HanalKapp" (or your preferred name)
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Click on **Sign-in method** tab
4. Enable **Google** provider
5. Add your email as authorized domain

### 3. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (we'll add rules next)
4. Select your preferred location (e.g., `us-central1`)
5. Click "Enable"

### 4. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app with nickname "HanalKapp Web"
5. Copy the Firebase configuration object
6. Add to your `.env` file:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 5. Configure Firestore Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data rules
    match /users/{userId} {
      // Users can only read/write their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Favorites subcollection
      match /favorites/{favoriteId} {
        // Users can only read/write their own favorites
        allow read: if request.auth != null && request.auth.uid == userId;
        allow create: if request.auth != null
                      && request.auth.uid == userId
                      && request.resource.data.keys().hasAll(['placeId', 'savedAt', 'placeData']);
        allow update: if request.auth != null && request.auth.uid == userId;
        allow delete: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Click **Publish**

---

## Firestore Data Structure

### Collection: `users/{userId}/favorites/{placeId}`

Each favorite document contains:

```typescript
{
  placeId: string,           // Google Place ID
  savedAt: Timestamp,        // When it was saved
  placeData: {               // Restaurant details
    place_id: string,
    name: string,
    formatted_address: string,
    geometry: {
      location: {
        lat: number,
        lng: number
      }
    },
    rating?: number,
    user_ratings_total?: number,
    price_level?: number,
    photos?: Array<any>,
    types?: string[],
    vicinity?: string
  }
}
```

---

## How It Works

### Authentication Flow

1. User clicks "Iniciar sesión" in Header
2. Google Sign-In popup appears
3. User selects Google account
4. Firebase authenticates user
5. User state updates throughout app
6. User can now save favorites to Firestore

### Favorites Flow

**When user is NOT logged in:**
- Favorites stored in `localStorage`
- No sync across devices
- Data persists only in current browser

**When user IS logged in:**
- Favorites stored in Firestore
- Syncs across all devices
- Data persists in cloud
- Automatic fallback to localStorage if Firebase fails

### Code Implementation

**useAuth Hook** (`src/hooks/useAuth.ts`)
- Manages authentication state
- Provides `login()` and `logout()` functions
- Listens to auth state changes
- Returns current user info

**useFavorites Hook** (`src/hooks/useFavorites.ts`)
- Automatically detects if user is logged in
- Uses Firestore if authenticated
- Falls back to localStorage if not
- Provides: `addFavorite()`, `removeFavorite()`, `isFavorite()`, `toggleFavorite()`

**Firebase Service** (`src/services/firebase.ts`)
- Initializes Firebase
- Handles Google authentication
- Provides Firestore CRUD operations
- Validates Firebase configuration

---

## Testing

### Test Authentication

1. Run app: `npm run dev`
2. Click "Iniciar sesión" in header
3. Sign in with Google
4. Verify user name appears in header
5. Click user avatar → "Cerrar sesión"
6. Verify user is logged out

### Test Favorites Sync

1. Sign in with Google
2. Add a restaurant to favorites ❤️
3. Check Firestore Console → `users/{your_uid}/favorites`
4. Verify document was created
5. Open app in different browser/device
6. Sign in with same Google account
7. Verify favorites appear

### Test localStorage Fallback

1. Sign out (or don't configure Firebase)
2. Add favorites
3. Check browser DevTools → Application → localStorage
4. Verify `hanalkapp_favorites` key exists
5. Refresh page
6. Verify favorites persist

---

## Security Rules Explained

```javascript
// Only authenticated users can access their own data
allow read, write: if request.auth != null && request.auth.uid == userId;
```

✅ **Allows:**
- User A to read/write their own favorites
- User A to create new favorites for themselves

❌ **Blocks:**
- Unauthenticated users
- User A accessing User B's favorites
- Malicious requests

```javascript
// Validate document structure on create
request.resource.data.keys().hasAll(['placeId', 'savedAt', 'placeData'])
```

✅ **Ensures:**
- All required fields are present
- Data structure is valid
- No invalid documents are created

---

## Troubleshooting

### Error: "Firebase Auth not initialized"

**Solution:**
- Check `.env` file has all Firebase keys
- Restart dev server: `npm run dev`
- Clear browser cache

### Error: "Missing or insufficient permissions"

**Solution:**
- Check Firestore Security Rules are published
- Verify user is authenticated
- Check `userId` matches `request.auth.uid`

### Favorites not syncing

**Solution:**
- Check browser console for errors
- Verify Firestore rules allow read/write
- Check user is authenticated (`useAuth().user` should not be null)
- Open Firestore Console and check if documents are being created

### "Popup closed by user" error

**Solution:**
- User closed the Google Sign-In popup
- Try again and complete the sign-in flow

---

## Cost Considerations

### Free Tier (Spark Plan)

Firebase provides generous free quotas:

**Authentication:**
- ✅ Unlimited Google Sign-In

**Firestore:**
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 1 GB storage

**Estimated Usage:**
- 1 user signing in = 1 read
- Adding 1 favorite = 1 write
- Loading favorites = 1 read per favorite
- **You can have ~1000 active users/day for FREE**

### Best Practices

1. **Minimize reads:** Cache favorites in app state
2. **Batch operations:** Load all favorites at once
3. **Only save essential data:** We only store first photo, not all photos
4. **Monitor usage:** Check Firebase Console → Usage tab

---

## Migration from localStorage to Firebase

If you have existing users with localStorage favorites:

1. **Automatic migration** is NOT implemented
2. Users can manually re-add favorites after signing in
3. OR implement a one-time migration:

```typescript
// Add to useAuth.ts after successful login
const migrateLocalStorageToFirebase = async () => {
  const stored = localStorage.getItem('hanalkapp_favorites');
  if (stored && user) {
    const localFavorites = JSON.parse(stored);
    for (const restaurant of localFavorites) {
      await addFavorite(user.uid, restaurant);
    }
    localStorage.removeItem('hanalkapp_favorites');
  }
};
```

---

## Next Steps

### Optional Enhancements

1. **Email/Password Auth**
   - Enable in Firebase Console → Authentication
   - Create signup/login forms

2. **User Profile Page**
   - Display user info
   - Show favorite statistics
   - Settings/preferences

3. **Social Sharing**
   - Share favorite lists
   - Public profiles

4. **Offline Support**
   - Enable Firestore offline persistence
   - Cache favorites for offline viewing

5. **Advanced Features**
   - Collections/Lists of favorites
   - Notes on restaurants
   - Rating history
   - Visited/Want to visit flags

---

## Production Checklist

Before deploying to production:

- [ ] Enable Firebase Security Rules (done above)
- [ ] Add production domain to Firebase Auth authorized domains
- [ ] Set up environment variables in hosting platform
- [ ] Test authentication flow in production
- [ ] Monitor Firebase Console for errors
- [ ] Set up billing alerts (if upgrading from free tier)
- [ ] Review Firestore indexes (Firebase will suggest if needed)

---

## Support

### Firebase Documentation
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)

### Common Issues
- Check [Firebase Status](https://status.firebase.google.com/)
- Review browser console for detailed errors
- Test in incognito mode to rule out extension conflicts

---

## ✅ Summary

Firebase integration complete with:

✅ Google Authentication
✅ Firestore database for favorites
✅ Security rules configured
✅ Automatic sync across devices
✅ localStorage fallback
✅ Error handling
✅ Loading states

**HanalKapp is now a full-featured cloud-connected PWA! 🚀**
