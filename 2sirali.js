function siraliFihristArama(arananTam) {
    let kelimeler = arananTam.split(/\s+/).filter(k => k.length >= 2);
    let kitapDetaylari = {}; 
    let genelKelimeToplamlari = {};
    
    kelimeler.forEach(k => genelKelimeToplamlari[k] = 0);
    
    for (let anahtar in fihrist) {
        let kucukAnahtar = anahtar.toLocaleLowerCase('tr-TR');
        kelimeler.forEach(kelime => {
            if (kucukAnahtar.startsWith(kelime)) {
                for (let kitap in fihrist[anahtar]) {
                    if (!kitapDetaylari[kitap]) kitapDetaylari[kitap] = {};
                    if (!kitapDetaylari[kitap][kelime]) kitapDetaylari[kitap][kelime] = 0;
                    let adet = fihrist[anahtar][kitap];
                    kitapDetaylari[kitap][kelime] += adet;
                    genelKelimeToplamlari[kelime] += adet;
                }
            }
        });
    }
    
    kitapListesi.forEach((kitap, index) => {
        let ad = kitapGercekAdlari[index];
        let detayYazisi = ""; 
        let kitapToplami = 0;
        
        if (kitapDetaylari[kitap]) {
            for (let kelime in kitapDetaylari[kitap]) {
                let sayi = kitapDetaylari[kitap][kelime];
                detayYazisi += `${kelime}: ${sayi} | `;
                kitapToplami += sayi;
            }
            detayYazisi = detayYazisi.slice(0, -3);
        } else { 
            detayYazisi = "Sonuç yok"; 
        }
        
        document.getElementById('sonucDökümü').innerHTML += `
            <div class="satir" style="opacity: ${kitapToplami === 0 ? '0.5' : '1'}" onclick="window.location.href='${kitap}?ara=${encodeURIComponent(arananTam)}'">
                <div>
                    <div style="font-weight:bold">${ad}</div>
                    <div class="detay-yazi">${detayYazisi}</div>
                </div>
                <span class="sayi">${kitapToplami}</span>
            </div>`;
    });
    
    let gYazi = ""; 
    for (let k in genelKelimeToplamlari) { 
        gYazi += `${k} (${genelKelimeToplamlari[k]}) `; 
    }
    document.getElementById('bilgi').innerText = gYazi || "Sonuç yok";
}
