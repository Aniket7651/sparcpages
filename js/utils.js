
function sparcCheckCookieConsent() {
    const consent = localStorage.getItem('sparc-cookie-consent');
    const popup = document.getElementById('sparc-cookie-popup');
    if (!consent) {
        popup.style.display = 'block';
    }
}

function sparcAcceptAllCookies() {
    localStorage.setItem('sparc-cookie-consent', JSON.stringify({
        analytics: true,
        preferences: true,
        embedded: true
    }));
    document.getElementById('sparc-cookie-popup').style.display = 'none';
}

function sparcRejectNonEssential() {
    // Enable only strictly necessary (no storage needed for them)
    localStorage.setItem('sparc-cookie-consent', JSON.stringify({
        analytics: false,
        preferences: false,
        embedded: false
    }));
    document.getElementById('sparc-cookie-popup').style.display = 'none';
}

// Check on page load
window.addEventListener('load', sparcCheckCookieConsent);