/**
 * Check if sw are supported and register it
 */

if ('serverWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_pages.js')
            .then(res => console.log('Service worker: Registered'))
            .catch(err => console.log(`Service worker ERROR: ${err}`));
    })
}
