/* --- TEMEL KONTROL FONKSİYONLARI --- */
function hepsiniAc() {
    const tumMenuler = document.querySelectorAll('details');
    tumMenuler.forEach(menu => menu.setAttribute('open', ''));
    // Açılma işlemi bitince barı güncelle
    setTimeout(barGuncelle, 300);
}

function hepsiniKapat() {
    const tumAciklar = document.querySelectorAll('details[open]');
    tumAciklar.forEach(menu => menu.removeAttribute('open'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Kapandıktan sonra barı sıfırla
    setTimeout(barGuncelle, 500);
}
function arama() { 
    alert('CTRL ve F tuşuna basın veya Sağdaki üç noktaya basın orada bul butonunu bulup arama yapabilirsiniz'); 
}



function yardimAc() {
    alert("Arama yapmak için CTRL+F tuşlarına basın. Veya sağ üstteki üç noktayı açın ");
}

/* --- AKILLI RADAR VE HİYERARŞİ SİSTEMİ (PERFORMANS ODAKLI) --- */
function barGuncelle() {
    const sAlan = document.getElementById('bar-sayfa-metni');
    const zAlan = document.getElementById('baslik-zinciri');
    const dolum = document.getElementById('durum-cubugu-doluluk');
    
    if (!sAlan || !zAlan) return;

    // 1. Sayfa İlerleme Çubuğu (% doluluk)
    const toplamYukseklik = document.documentElement.scrollHeight - window.innerHeight;
    const yuzde = (window.scrollY / toplamYukseklik) * 100;
    if (dolum) dolum.style.width = yuzde + "%";

    // 2. RADAR: Panelin hemen altındaki hayali çizgi (70px)
    const radarSiniri = 75; 
    const tumSayfalar = document.querySelectorAll('.sayfa');
    
    let aktifSayfaMetni = "---";

    // Strateji: Yukarıdan aşağıya tara, radar sınırını (barın altını) geçmiş olan EN SON sayfayı bul
    for (let i = 0; i < tumSayfalar.length; i++) {
        const konum = tumSayfalar[i].getBoundingClientRect().top;
        
        // Eğer bu sayfa barın altına girdiyse onu 'şu anki sayfa' kabul et
        if (konum <= radarSiniri + 5) {
            aktifSayfaMetni = tumSayfalar[i].innerText.trim();
        } else {
            // Radar sınırının altında kalan (henüz gelmemiş) ilk sayfayı görünce dur
            break; 
        }
    }
    sAlan.innerText = aktifSayfaMetni;

    // 3. HİYERARŞİ (ZAMİRLER / DETAILS ZİNCİRİ)
    // Radar noktasındaki gerçek elemanı bul ve hiyerarşiyi ondan türet
    const hedef = document.elementFromPoint(window.innerWidth / 2, radarSiniri + 10);
    if (hedef) {
        let d = hedef.closest('details'), zincir = [];
        while (d) {
            const baslik = d.querySelector('summary')?.innerText;
            if (baslik) zincir.unshift(baslik);
            d = d.parentElement.closest('details');
        }
        // Kitap adını (en dış katman) sayfa nosunda olduğu için hiyerarşiden çıkar
        if (zincir.length > 1) zincir.shift();
        
        zAlan.innerHTML = zincir.map(b => `<span class="zincir-parca">${b}</span>`).join('');
    }
}

/* --- OLAY TETİKLEYİCİLERİ --- */

// Kaydırma sırasında kasmayı önlemek için (Throttling)
let kaydirmaZamanlayici;
window.addEventListener('scroll', () => {
    if (!kaydirmaZamanlayici) {
        kaydirmaZamanlayici = setTimeout(() => {
            barGuncelle();
            kaydirmaZamanlayici = null;
        }, 60); // 60ms hızında akıcı takip
    }
}, { passive: true });

// İlk açılışta barı doldur
window.addEventListener('load', barGuncelle);

// Detaylara tıklandığında barı tazele
document.addEventListener('click', () => setTimeout(barGuncelle, 200));

