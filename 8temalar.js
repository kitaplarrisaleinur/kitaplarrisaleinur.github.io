// ====================================================================
// 8temalar.js - 6 FARKLI KALICI RENK MODU DÖNGÜSÜ VE KUSURSUZ SIFIRLAMA
// ====================================================================

// Sayfa ilk yüklendiğinde hafızada kayıtlı bir mod var mı diye bakar (Varsayılan 0: Gündüz)
let aktifModIndeksi = parseInt(localStorage.getItem('nurKulliyatTemaModu')) || 0;

function tumStilleriTemizle() {
    const tumElemanlar = document.querySelectorAll('body, .arabi, .arabi3, details, .elifler, .sayfa, summary, .ana-baslik, .lahika, details > summary');
    tumElemanlar.forEach(el => { el.style.backgroundColor = ""; el.style.color = ""; });
    
    const geceButonu = document.getElementById('geceBtn');
    if (geceButonu) {
        geceButonu.innerHTML = "🌙 Gece Modu";
        geceButonu.style.background = "#34495e";
        geceButonu.style.color = "#ffffff";
    }
}

function moduUygula(modNo) {
    tumStilleriTemizle();
    localStorage.setItem('nurKulliyatTemaModu', modNo); // Seçilen modu hafızaya kaydeder

    const tumMetinler = document.querySelectorAll('body, .arabi, .arabi3, details, .elifler, .sayfa');
    const tumBasliklar = document.querySelectorAll('summary, .ana-baslik, .lahika, details > summary');
    const btn = document.getElementById('geceBtn');

    if (modNo === 1) {
        tumMetinler.forEach(el => { el.style.backgroundColor = "#18181b"; el.style.color = "#f4f4f5"; });
        tumBasliklar.forEach(el => { el.style.backgroundColor = "#303f9f"; el.style.color = "#ffffff"; });
        if(btn) { btn.innerHTML = "📜 Sepya Modu"; btn.style.background = "#f1c40f"; btn.style.color = "#000000"; }
    } 
    else if (modNo === 2) {
        tumMetinler.forEach(el => { el.style.backgroundColor = "#f4ecd8"; el.style.color = "#5b4636"; });
        tumBasliklar.forEach(el => { el.style.backgroundColor = "#8b5a2b"; el.style.color = "#ffffff"; });
        if(btn) { btn.innerHTML = "🍃 Mint Modu"; btn.style.background = "#e67e22"; btn.style.color = "#ffffff"; }
    } 
    else if (modNo === 3) {
        tumMetinler.forEach(el => { el.style.backgroundColor = "#e8f5e9"; el.style.color = "#1b5e20"; });
        tumBasliklar.forEach(el => { el.style.backgroundColor = "#2e7d32"; el.style.color = "#ffffff"; });
        if(btn) { btn.innerHTML = "🌌 Gece Mavisi"; btn.style.background = "#2ecc71"; btn.style.color = "#ffffff"; }
    } 
    else if (modNo === 4) {
        tumMetinler.forEach(el => { el.style.backgroundColor = "#0f172a"; el.style.color = "#f1f5f9"; });
        tumBasliklar.forEach(el => { el.style.backgroundColor = "#1e3a8a"; el.style.color = "#ffffff"; });
        if(btn) { btn.innerHTML = "🌸 Gül Kurusu"; btn.style.background = "#3498db"; btn.style.color = "#ffffff"; }
    } 
    else if (modNo === 5) {
        tumMetinler.forEach(el => { el.style.backgroundColor = "#fdf2f8"; el.style.color = "#831843"; });
        tumBasliklar.forEach(el => { el.style.backgroundColor = "#9d174d"; el.style.color = "#ffffff"; });
        if(btn) { btn.innerHTML = "☀️ Gündüz Modu"; btn.style.background = "#9b59b6"; btn.style.color = "#ffffff"; }
    } 
    else {
        aktifModIndeksi = 0;
        localStorage.setItem('nurKulliyatTemaModu', 0);
        if(btn) { btn.innerHTML = "🌙 Gece Modu"; btn.style.background = "#34495e"; btn.style.color = "#ffffff"; }
    }
}

// Sayfa ilk yüklendiğinde hafızada kalan modu otomatik çalıştırır
moduUygula(aktifModIndeksi);

document.getElementById('geceBtn').onclick = function() {
    aktifModIndeksi = (aktifModIndeksi + 1) % 6; 
    moduUygula(aktifModIndeksi);
};

document.getElementById('sifirlaBtn').addEventListener('click', function() {
    aktifModIndeksi = 0;
    setTimeout(tumStilleriTemizle, 50);
});
