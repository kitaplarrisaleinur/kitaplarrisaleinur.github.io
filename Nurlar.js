// Paneli göster/gizle
function toggleControlBox() {
    const panel = document.getElementById('controlBox');
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
}

// Tüm details etiketlerini açan veya kapatan sihirli fonksiyon (Hızlandırılmış Sürüm)
function controlDetails(isOpen) {
    // Sayfadaki tüm <details> etiketlerini bulur
    const allDetails = document.querySelectorAll('details');
    
    // Hızlandırma: İşlemciyi yormamak için 40'ar 40'ar açar/kapatır
    let i = 0;
    function hizliIsle() {
        let son = Math.min(i + 40, allDetails.length);
        for (; i < son; i++) {
            allDetails[i].open = isOpen;
        }
        if (i < allDetails.length) {
            // Telefonun donmaması için çok kısa bir ara verip devam eder
            requestAnimationFrame(hizliIsle);
        }
    }
    hizliIsle();
}
