// Paneli Açıp Kapatan Fonksiyon
function panelKontrol(durum) {
    const panel = document.getElementById('orta-kontrol-paneli');
    if (panel) {
        panel.style.display = durum ? 'flex' : 'none';
    }
}

// Bütün Kitapları Açan Fonksiyon
function hepsiniAc() {
    const tumDetails = document.querySelectorAll('details');
    tumDetails.forEach(d => d.open = true);
}

// Bütün Kitapları Kapatan Fonksiyon
function hepsiniKapat() {
    const tumDetails = document.querySelectorAll('details');
    tumDetails.forEach(d => d.open = false);
}
