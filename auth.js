const OAUTH_CONFIG = {
    clientId: '1091988822793-fu7cipbjev8rleo9vevobnupkkjfjfrs.apps.googleusercontent.com',
    redirectUri: 'https://static-assets-sync.github.io/callback',
    scope: 'email profile',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth'
};

function generateState() {
    return Math.random().toString(36).substring(7);
}

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

function isAuthenticated() {
    return sessionStorage.getItem('oauth_token') !== null;
}

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

function logout() {
    sessionStorage.removeItem('oauth_token');
    sessionStorage.removeItem('oauth_code');
    sessionStorage.removeItem('oauth_state');
    window.location.href = '/index.html';
}

function handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('oauth_success');
    
    if (success === 'true') {
        const code = sessionStorage.getItem('oauth_code');
        if (code) {
            console.log('✅ OAuth authentication successful');
            window.location.href = '/chat.html';
        }
    }
}

if (window.location.pathname.includes('callback')) {
    handleOAuthCallback();
}
