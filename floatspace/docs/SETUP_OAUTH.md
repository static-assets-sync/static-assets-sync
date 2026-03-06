# FloatSpace OAuth Setup — Final Steps

## Status: ✅ Google Cloud Configured

You've successfully configured OAuth in Google Cloud Console:
- ✅ Redirect URI added
- ✅ Privacy Policy linked
- ✅ Terms of Service linked
- ✅ Authorized domains configured

## Final Step: Add Client ID to Code

Now we need to add your **OAuth Client ID** to the FloatSpace code.

### Step 1: Get Your Client ID

1. Go back to [Google Cloud Console](https://console.cloud.google.com)
2. Go to **APIs & Services** → **Credentials**
3. Click **"Web client 1"**
4. Copy the **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)

### Step 2: Update FloatSpace Code

1. Open `/floatspace/current/auth.js`
2. Find this line:
   ```javascript
   clientId: 'YOUR_CLIENT_ID_HERE',
   ```
3. Replace `YOUR_CLIENT_ID_HERE` with your actual Client ID
4. Save the file

### Step 3: Test

1. Visit: `https://static-assets-sync.github.io/static-assets-sync/current/`
2. Click **"Sign in with Google"**
3. You should be redirected to Google login
4. After successful auth, you'll be redirected back to FloatSpace

## Troubleshooting

**Error: "Redirect URI mismatch"**
- Make sure the redirect URI in Google Cloud matches exactly:
  - `https://static-assets-sync.github.io/static-assets-sync/current/callback`

**Error: "Invalid client"**
- Check that Client ID is copied correctly (no spaces, correct format)

**Error: "Access denied"**
- Make sure Privacy Policy & Terms are properly linked
- Check that authorized domains include both `static-assets-sync.github.io` and `github.com`

## Architecture

```
User clicks "Sign in with Google"
    ↓
Redirects to Google OAuth endpoint (auth.js)
    ↓
User authorizes app
    ↓
Google redirects back to callback.html with authorization code
    ↓
callback.html processes code and redirects to chat interface
    ↓
User is now authenticated in FloatSpace
```

## Production Considerations

For production, you should:
1. Exchange authorization code for access token on a backend server
2. Never expose Client ID/Secret in frontend code
3. Use HTTPS everywhere (we do ✅)
4. Implement token refresh for long sessions
5. Add PKCE for extra security

---

**Next:** Get your Client ID and add it to `auth.js`, then test!
