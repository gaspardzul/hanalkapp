# 🔧 Firebase Troubleshooting - HanalKapp

## ❌ Error: `auth/operation-not-allowed`

### Error Message
```
FirebaseError: Firebase: Error (auth/operation-not-allowed)
```

### What This Means
**Google Sign-In is not enabled in your Firebase Console.**

### ✅ How to Fix (2 minutes)

1. **Go to Firebase Console**
   - Open: https://console.firebase.google.com/
   - Select your "HanalKapp" project

2. **Enable Google Authentication**
   - Click **Authentication** in left sidebar
   - Click **Get Started** (if first time)
   - Click **Sign-in method** tab at the top
   - Find **Google** in the providers list
   - Click on **Google** row
   - Toggle **Enable** switch to ON
   - **Important:** Add your email in "Project support email"
   - Click **Save**

3. **Refresh Your App**
   - Go back to your app at `http://localhost:5173`
   - Click "Iniciar sesión"
   - Google Sign-In should now work! ✅

---

## Step-by-Step with Screenshots

### Step 1: Firebase Console → Authentication

```
Firebase Console
└── Select your project
    └── Authentication (left sidebar)
        └── Get Started (if shown)
```

### Step 2: Sign-in Method Tab

```
Authentication
├── Users (tab)
├── Sign-in method (tab) ← Click this
├── Settings (tab)
└── Usage (tab)
```

### Step 3: Enable Google Provider

```
Sign-in providers
├── Email/Password      [Disabled]
├── Phone               [Disabled]
├── Google              [Disabled] ← Click this row
├── Play Games          [Disabled]
├── Game Center         [Disabled]
└── ...
```

### Step 4: Toggle Enable

```
Google Sign-In Configuration

[ ✓ ] Enable  ← Toggle this ON

Project support email: your-email@example.com  ← Add your email

[Cancel]  [Save] ← Click Save
```

---

## Other Common Firebase Errors

### Error: `auth/popup-closed-by-user`

**Cause:** User closed the Google Sign-In popup before completing sign-in.

**Fix:** Try signing in again and complete the flow.

---

### Error: `auth/popup-blocked`

**Cause:** Browser blocked the popup window.

**Fix:**
1. Allow popups for `localhost:5173`
2. Check browser address bar for popup blocker icon
3. Try again

---

### Error: `Missing or insufficient permissions`

**Cause:** Firestore Security Rules are blocking access.

**Fix:**
1. Go to Firebase Console → Firestore Database
2. Click **Rules** tab
3. Copy rules from `FIREBASE_SETUP.md`
4. Click **Publish**

---

### Error: `Firebase not initialized`

**Cause:** Missing or incorrect Firebase config in `.env`

**Fix:**
1. Check `.env` file has all Firebase variables:
   ```bash
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
2. Verify values are correct (no quotes, no extra spaces)
3. Restart dev server: `npm run dev`

---

### Warning: `open_now is deprecated`

**This is NOT an error - just a warning.**

**Explanation:** See `DEPRECATION_WARNING.md` for full details.

**Fix:** Already handled in the code. You can ignore this warning.

---

## PWA Icon Warnings

### Warning: `Download error or resource isn't a valid image`

**Cause:** PNG icons were missing.

**Fix:** ✅ Already fixed! SVG icons created:
- `public/pwa-192x192.png`
- `public/pwa-512x512.png`

**To use real PNG icons:**
1. Create 192x192px PNG with your logo
2. Create 512x512px PNG with your logo
3. Replace the SVG files
4. Recommended tool: https://realfavicongenerator.net/

---

## Debugging Tips

### Check Firebase Console Logs

1. Firebase Console → Project Overview
2. Click **Usage and billing**
3. Check for errors or quota exceeded

### Check Browser Console

```javascript
// In browser DevTools console, check:
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
// Should show your API key, not 'undefined'
```

### Test Firebase Connection

Add this temporarily to `src/main.tsx`:

```typescript
import { isFirebaseAvailable } from './services/firebase';
console.log('Firebase available:', isFirebaseAvailable());
```

Should log: `Firebase available: true`

### Check Auth State

In browser DevTools console:

```javascript
// Check if user is signed in
firebase.auth().currentUser
```

---

## Production Issues

### Error: `auth/unauthorized-domain`

**Cause:** Your production domain is not authorized in Firebase.

**Fix:**
1. Firebase Console → Authentication → Settings
2. Add your production domain to **Authorized domains**
3. Examples: `hanalkapp.com`, `hanalkapp.netlify.app`

---

### CORS Errors in Production

**Cause:** Firestore not properly initialized.

**Fix:**
1. Check environment variables are set in hosting platform
2. Verify API keys are correct
3. Check browser console for detailed errors

---

## Quick Checklist

When Firebase isn't working, verify:

- [ ] Firebase project created
- [ ] **Google Sign-In ENABLED** ← Most common issue!
- [ ] Firestore database created
- [ ] Security rules published
- [ ] All `.env` variables set correctly
- [ ] Dev server restarted after `.env` changes
- [ ] Browser console shows no errors
- [ ] No popup blockers active

---

## Still Having Issues?

### 1. Check Firebase Status
- https://status.firebase.google.com/

### 2. Test in Incognito Mode
- Rules out browser extension conflicts
- Fresh auth state

### 3. Clear Browser Data
```
Chrome: Settings → Privacy → Clear browsing data
- Cached images and files
- Cookies and site data
```

### 4. Verify API Keys
```bash
# In terminal, check .env values
cat .env | grep FIREBASE
```

Should show all 6 Firebase variables with values.

### 5. Check Firebase Quotas
- Firebase Console → Usage
- Verify not exceeded free tier limits

---

## Support Resources

- **Firebase Documentation:** https://firebase.google.com/docs
- **Firebase Support:** https://firebase.google.com/support
- **Community:** https://stackoverflow.com/questions/tagged/firebase

---

## ✅ Most Common Fix

**90% of Firebase auth errors are solved by:**

1. Go to Firebase Console
2. Authentication → Sign-in method
3. **Enable Google provider**
4. Add support email
5. Save
6. Refresh app

**Try this first!** 🚀
