/**
 * FloatSpace OAuth 2.0 Handler
 * Manages Google authentication flow
 */

// OAuth configuration from Google Cloud Console
const OAUTH_CONFIG = {
    clientId: '1091988822793-fu7cipbjev8rleo9vevobnupkkjfjfrs.apps.googleusercontent.com',
    redirectUri: 'https://static-assets-sync.github.io/static-assets-sync/current/callback',
    scope: 'email profile',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth'
};

/**
 * Generate random state parameter for CSRF protection
 */
function generateState() {
    return Math.random().toString(36).substring(7);
}

/**
 * Initiate Google OAuth flow
 */
function initGoogleAuth() {
    const state = generateState();
    sessionStorage.setItem('oauth_state', state);
    
    const authUrl = new URL(OAUTH_CONFIG.authEndpoint);
    authUrl.searchParams.append('client_id', OAUTH_CONFIG.clientId);
    authUrl.searchParams.append('redirect_uri', OAUTH_CONFIG.redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', OAUTH_CONFIG.scope);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');
    
    window.location.href = authUrl.toString();
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return sessionStorage.getItem('oauth_token') !== null;
}

/**
 * Get user profile from token
 */
async function getUserProfile() {
    const token = sessionStorage.getItem('oauth_token');
    if (!token) return null;
    
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to get user profile:', error);
        return null;
    }
}

/**
 * Logout user
 */
function logout() {
    sessionStorage.removeItem('oauth_token');
    sessionStorage.removeItem('oauth_code');
    sessionStorage.removeItem('oauth_state');
    window.location.href = '/static-assets-sync/current/index.html';
}

/**
 * Handle OAuth callback (called from callback.html)
 */
function handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('oauth_success');
    
    if (success === 'true') {
        const code = sessionStorage.getItem('oauth_code');
        if (code) {
            // In production, exchange code for token server-side
            // For now, store code and proceed
            console.log('✅ OAuth authentication successful');
            // Redirect to chat interface
            window.location.href = '/static-assets-sync/current/chat.html';
        }
    }
}

// Run callback handler if on callback page
if (window.location.pathname.includes('callback')) {
    handleOAuthCallback();
}
