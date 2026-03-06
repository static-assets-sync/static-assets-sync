# ⚠️ ACTION REQUIRED: Update Redirect URI in Google Cloud

We moved the files to the root directory for GitHub Pages. This means the redirect URI changed.

## Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. Click **"Web client 1"**
4. **REMOVE** the old URI:
   - `https://static-assets-sync.github.io/static-assets-sync/current/callback`
5. **ADD** the new URI:
   - `https://static-assets-sync.github.io/callback`
6. Click **Save**

That's it! Changes take 5 minutes to apply.

---

**Status:** Waiting on you to update Google Cloud Console
