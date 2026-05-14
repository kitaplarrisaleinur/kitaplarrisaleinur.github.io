async function ardisikBlokArama(girdi) {
    // Kelimeleri parçalara ayırıyoruz ama ekleme yapmıyoruz
    const parcalar = girdi.split(/\s+/).filter(k => k.length >= 2);
    if (parcalar.length < 1) return;

    // Sadece aradaki boşlukları (veya satır başlarını) esnek tutuyoruz
    // Kelimelerin kendisi tam olarak yazdığın gibi kalıyor
    const pattern = parcalar.join("\\s+"); 
    const regex = new RegExp(pattern, "gi");
    let genelToplam = 0;

    let bulunanlarListesi = [];
    let geciciSonuclar = [];

    // TARAMA BÖLÜMÜ
    for (let i = 0; i < kitapListesi.length; i++) {
        let kitap = kitapListesi[i];
        let ad = kitapGercekAdlari[i];
        try {
            const res = await fetch(kitap);
            const html = await res.text();
            const div = document.createElement("div"); 
            div.innerHTML = html;
            
            // Kitabın içindeki metni motor da kitapla aynı şekilde görüyor
            const kucukMetin = div.innerText.toLocaleLowerCase('tr-TR');
            
            let adet = 0;
            let match;
            // Arama başlıyor
            while ((match = regex.exec(kucukMetin)) !== null) {
                adet++;
                if (regex.lastIndex === match.index) regex.lastIndex++;
            }

            if (adet > 0) {
                genelToplam += adet;
                bulunanlarListesi.push(kitap);
                geciciSonuclar.push({ kitap, ad, adet });
            }
        } catch (e) { 
            console.error(kitap + " taranırken bir hata oluştu."); 
        }
    }

    // LİSTELEME VE ÇANTALAMA BÖLÜMÜ
    const canta = bulunanlarListesi.join(',');
    
    geciciSonuclar.forEach((sonuc, index) => {
        document.getElementById('sonucDökümü').innerHTML += `
            <div class="satir" onclick="window.location.href='bul.html?kitap=${sonuc.kitap}&ara=${encodeURIComponent(girdi)}&sira=${index}&liste=${canta}'">
                <div>
                    <div style="font-weight:bold">${sonuc.ad}</div>
                    <div class="detay-yazi">"${girdi}" tam kalıbı bulundu</div>
                </div>
                <span class="sayi">${sonuc.adet}</span>
            </div>`;
    });

    document.getElementById('bilgi').innerText = `Ardışık Tarama Bitti. Toplam: ${genelToplam}`;
}
