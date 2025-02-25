// URL parameter handling
export function getPoleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('pole');
}

export function navigateToPole(poleId) {
    window.location.href = `index.html?pole=${poleId}`;
}