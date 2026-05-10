// Yardım Penceresi Fonksiyonları
function yardimAc() { document.getElementById('yardimModal').style.display = "flex"; }
function yardimKapat() { document.getElementById('yardimModal').style.display = "none"; }
window.onclick = function(event) { if (event.target == document.getElementById('yardimModal')) yardimKapat(); }

// Arama Geçmişi Kaydetme
function gecmisKaydet(kelime, mod) {
    let key = "arama_gecmis"; 
    let gecmis = JSON.parse(localStorage.getItem(key) || "[]");
    gecmis = gecmis.filter(k => k !== kelime);
    gecmis.unshift(kelime);
    if (gecmis.length > 8) gecmis.pop();
    localStorage.setItem(key, JSON.stringify(gecmis));
}

// Arama Geçmişini Gösterme
function gecmisGoster() {
    const key = "arama_gecmis";
    const gecmis = JSON.parse(localStorage.getItem(key) || "[]");
    const listeDiv = document.getElementById('gecmisListesi');
    if (gecmis.length === 0) { listeDiv.style.display = "none"; return; }
    listeDiv.innerHTML = "";
    gecmis.forEach(kelime => {
        let item = document.createElement('div');
        item.className = "gecmis-item";
        item.innerHTML = "🕒 " + kelime;
        item.onmousedown = () => { 
            document.getElementById('aramaInput').value = kelime; 
            listeDiv.style.display = "none"; 
        };
        listeDiv.appendChild(item);
    });
    listeDiv.style.display = "block";
}

// Mod Değiştiğinde Temizlik
function modDegisti() { 
    document.getElementById('sonucDökümü').innerHTML = ""; 
    document.getElementById('bilgi').innerText = ""; 
    gecmisGoster(); 
}

// Giriş Kutusundan Çıkınca Geçmişi Kapat
document.getElementById('aramaInput').onblur = () => { 
    setTimeout(() => { document.getElementById('gecmisListesi').style.display = "none"; }, 200); 
};

// ANA ARAMA MOTORU (Yönlendirici)
async function anaAramaMotoru() {
    const girdi = document.getElementById('aramaInput').value.toLocaleLowerCase('tr-TR').trim();
    const seciliMod = document.querySelector('input[name="mod"]:checked').value;
    if (girdi.length < 2) return;
    
    gecmisKaydet(girdi, seciliMod);
    document.getElementById('gecmisListesi').style.display = "none";
    document.getElementById('sonucDökümü').innerHTML = "";
    document.getElementById('bilgi').innerText = "Aranıyor...";

    // Seçilen moda göre ilgili JS dosyasındaki fonksiyonu çağırır
    if (seciliMod === "sirali") {
        siraliFihristArama(girdi);
    } else if (seciliMod === "grup") {
        await grupRadarArama(girdi);
    } else if (seciliMod === "ardisik") {
        await ardisikBlokArama(girdi);
    }
}
