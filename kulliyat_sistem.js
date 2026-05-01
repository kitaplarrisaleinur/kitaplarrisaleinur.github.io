window.addEventListener('load', function() {
    const kitapListesi = ["sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html", "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html", "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html", "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html", "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html", "genclik.html", "muhakemat.html", "nurunilkkapisi.html"];
    const kitapGercekAdlari = ["Sözler", "Mektubat 1", "Mektubat 2", "Lem'alar", "Şualar 1", "Şualar 2", "Sıracın Nur", "Zülfikar", "Asayı Musa", "Tılsımlar", "İşaratül İcaz", "Mesnevi Nuriye", "ST Gaybi", "Barla", "Kastamonu", "Emirdağ 1", "Emirdağ 2", "Emirdağ 3", "Emirdağ 4", "Hanımlar Rehberi", "Gençlik Rehberi", "Muhakemat", "Nurun İlk Kapısı"];
    const urlParams = new URLSearchParams(window.location.search);
    const aranan = urlParams.get('ara') || "";
    const sonGit = urlParams.get('son');
    let suankiDosya = window.location.pathname.split("/").pop();
    let indexNumarasi = kitapListesi.indexOf(suankiDosya);
    let kitapAdi = indexNumarasi !== -1 ? kitapGercekAdlari[indexNumarasi] : "Külliyat";
    const kelimeDizisi = aranan.trim().split(/\s+/).filter(k => k.length >= 2);

    // Sağ üstteki ana kırmızı kapatma butonu
    function kirmiziButonEkle() {
        if (!document.getElementById('tekKapat')) {
            const tekKapat = document.createElement('button');
            tekKapat.id = "tekKapat";
            tekKapat.innerHTML = "✕";
            // top: 145px yaparak ve translateY(50%) ekleyerek butonu panelin altına indirdik
            tekKapat.style = `position:fixed; top:145px; right:30px; width:45px; height:45px; border-radius:50%; border:none; background:#d93025; color:#fff; font-weight:bold; font-size:20px; cursor:pointer; z-index:999999; box-shadow:0 4px 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; transform: translateY(50%);`;
            document.body.appendChild(tekKapat);
            tekKapat.onclick = () => { window.location.href = 'index.html'; };
        }
    }

    if (!aranan) kirmiziButonEkle();

    if (aranan) {
        const panel = document.createElement('div');
        panel.id = "aramaPaneli";
        panel.style = `position:fixed; top:12px; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #d1d1d1; border-radius:15px; padding:10px 20px; z-index:999999; font-family:sans-serif; box-shadow:0 8px 30px rgba(0,0,0,0.12); display:flex; align-items:center; gap:20px; min-width:350px; justify-content:space-between;`;
        panel.innerHTML = `<div style="display:flex; flex-direction:column; min-width:130px;"><span style="font-size:13px; font-weight:bold; color:#222;">${kitapAdi}</span><span id="sayac" style="font-weight:600; font-size:13px; color:#d93025; margin-top:2px;">${aranan} ...</span></div><div style="display:flex; gap:12px; align-items:center;"><button id="geriBtn" style="width:45px; height:45px; border-radius:50%; border:1px solid #e0e0e0; background:white; font-size:18px; cursor:pointer;">▲</button><button id="ileriBtn" style="width:45px; height:45px; border-radius:50%; border:1px solid #e0e0e0; background:white; font-size:18px; cursor:pointer;">▼</button><button id="kapatBtn" style="width:32px; height:32px; border:none; background:none; color:#d93025; cursor:pointer; font-weight:bold; font-size:22px; display:flex; align-items:center; justify-content:center;">✕</button></div>`;
        document.body.appendChild(panel);
        
        document.getElementById('kapatBtn').onclick = () => { 
            panel.remove(); 
            window.history.replaceState({}, document.title, window.location.pathname); 
            kirmiziButonEkle(); 
        };

        const d_arananlar = kelimeDizisi.map(k => k.replace(/İ/g, "(İ|i)").replace(/i/g, "(İ|i)").replace(/I/g, "(I|ı)").replace(/ı/g, "(I|ı)"));
        const regexStr = "(^|[^a-zA-ZçÇğĞıİöÖşŞüÜ])(" + d_arananlar.join('|') + ")";
        const regex = new RegExp(regexStr, "gi");

        function boya(node) {
            if (node.id === "aramaPaneli" || (node.parentNode && node.parentNode.id === "aramaPaneli")) return;
            if (node.nodeType === 3) { 
                if (node.data.match(regex)) { 
                    const span = document.createElement('span'); 
                    span.innerHTML = node.data.replace(regex, '$1<mark class="isaretli" style="background-color:#ffe066; color:#000; border-radius:2px; padding:0 2px;">$2</mark>'); 
                    node.parentNode.replaceChild(span, node); 
                } 
            }
            else if (node.nodeType === 1 && node.childNodes && !/(script|style|mark)/i.test(node.tagName)) { 
                for (let i = 0; i < node.childNodes.length; i++) boya(node.childNodes[i]); 
            }
        }
        boya(document.body);

        const bulunanlar = document.querySelectorAll('.isaretli');
        let sira = 0;
        const git = (i) => {
            if (i < 0 || i >= bulunanlar.length) return;
            sira = i;
            let hedef = bulunanlar[i];
            let ebeveyn = hedef.closest('details');
            while (ebeveyn) { ebeveyn.open = true; ebeveyn = ebeveyn.parentElement.closest('details'); }
            setTimeout(() => { 
                hedef.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
                bulunanlar.forEach(el => { el.style.backgroundColor = "#ffe066"; }); 
                hedef.style.backgroundColor = "#ff9632"; 
                document.getElementById('sayac').innerText = `${aranan} (${i + 1}/${bulunanlar.length})`; 
            }, 60);
        };

        if (bulunanlar.length > 0) { (sonGit === "1") ? git(bulunanlar.length - 1) : git(0); }
        else { document.getElementById('sayac').innerText = `${aranan} (0)`; }

        function akilliGit(yon) {
            let hedefIdx = indexNumarasi + yon;
            while (hedefIdx >= 0 && hedefIdx < kitapListesi.length) {
                let hKitap = kitapListesi[hedefIdx];
                let varMi = false;
                if (typeof fihrist !== 'undefined') {
                    varMi = kelimeDizisi.some(k => { for (let fK in fihrist) { if (fK.toLocaleLowerCase('tr-TR').startsWith(k.toLocaleLowerCase('tr-TR')) && fihrist[fK][hKitap]) return true; } return false; });
                } else { varMi = true; }
                if (varMi) { window.location.href = hKitap + "?ara=" + encodeURIComponent(aranan) + (yon === -1 ? "&son=1" : ""); return; }
                hedefIdx += yon;
            }
            alert("Sonuç kalmadı abi.");
        }
        document.getElementById('ileriBtn').onclick = () => { if (sira + 1 < bulunanlar.length) git(sira + 1); else akilliGit(1); };
        document.getElementById('geriBtn').onclick = () => { if (sira - 1 >= 0) git(sira - 1); else akilliGit(-1); };
    }
});





// AÇ/KAPAT Butonlarını ekleyen ve senin sistemine tam uyumlu fonksiyon
function ikizButonlariEkle() {
    if (document.getElementById('btnAcma')) return;

    // AÇMA BUTONU (Büyüteç)
    const btnAc = document.createElement('button');
    btnAc.id = "btnAcma";
    btnAc.innerHTML = '🔍';
    btnAc.style.cssText = `
        position: fixed; top: 220px; right: 30px; 
        width: 45px; height: 45px; border-radius: 50%; border: none;
        background: #27ae60; color: white; cursor: pointer; font-size: 18px;
        z-index: 999999; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    `;
    btnAc.onclick = () => document.querySelectorAll('details').forEach(d => d.open = true);

    // KAPATMA BUTONU (Oklar)
    const btnKapat = document.createElement('button');
    btnKapat.id = "btnKapama";
    btnKapat.innerHTML = '↕';
    btnKapat.style.cssText = `
        position: fixed; top: 275px; right: 30px; 
        width: 45px; height: 45px; border-radius: 50%; border: none;
        background: #34495e; color: white; cursor: pointer; font-size: 20px;
        z-index: 999999; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    `;
    btnKapat.onclick = () => document.querySelectorAll('details').forEach(d => d.open = false);

    document.body.appendChild(btnAc);
    document.body.appendChild(btnKapat);
}

// SAYFA YÜKLENDİĞİNDE ÇALIŞTIR (Burası kritik!)
document.addEventListener("DOMContentLoaded", function() {
    ikizButonlariEkle();
});














// --- HAFIZALI VE MERKEZİ AYAR SİSTEMİ ---
let fontOran = parseFloat(localStorage.getItem('kulliyat_font')) || 1.0;
let geceModuAcik = localStorage.getItem('kulliyat_tema') === 'karanlik';

function ayarMerkeziEkle() {
    if(document.getElementById('ayar-grubu')) return;

    const grup = document.createElement('div');
    grup.id = 'ayar-grubu';
    grup.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:1000000; display:flex; flex-direction:column-reverse; gap:10px; align-items:center;";

    const altMenu = document.createElement('div');
    altMenu.id = 'ayar-alt-menu';
    altMenu.style.cssText = "display:none; flex-direction:column; gap:8px; margin-bottom:10px;";

    const btnGece = olusturButon(geceModuAcik ? '☀️' : '🌙', geceModuAcik ? '#f1c40f' : '#34495e', () => {
        geceModuAcik = !geceModuAcik;
        localStorage.setItem('kulliyat_tema', geceModuAcik ? 'karanlik' : 'aydinlik');
        temaUygula(geceModuAcik);
        btnGece.innerHTML = geceModuAcik ? '☀️' : '🌙';
        btnGece.style.background = geceModuAcik ? '#f1c40f' : '#34495e';
    });

    const btnArtir = olusturButon('A+', '#27ae60', () => boyutlandir(1.1));
    const btnAzalt = olusturButon('A-', '#2980b9', () => boyutlandir(0.9));
    
    // --- TAM SIFIRLAMA (CSS HALİNE DÖNÜŞ) ---
    const btnSifirla = olusturButon('↺', '#7f8c8d', () => {
        // 1. Hafızayı temizle
        localStorage.removeItem('kulliyat_font');
        localStorage.removeItem('kulliyat_tema');
        
        // 2. Değişkenleri varsayılana çek
        fontOran = 1.0;
        geceModuAcik = false;

        // 3. Renkleri ve Fontları Temizle (CSS'e bırak)
        temaUygula(false); 
        
        document.querySelectorAll('details, summary, .arabi, .arabi3').forEach(el => {
            el.style.fontSize = ""; // Inline stili sil, CSS devreye girsin
        });

        // 4. Gece modu butonunu fabrika ayarına döndür
        btnGece.innerHTML = '🌙';
        btnGece.style.background = '#34495e';
    });

    const anaButon = olusturButon('⚙️', '#546e7a', () => {
        const acikMi = altMenu.style.display === 'flex';
        altMenu.style.display = acikMi ? 'none' : 'flex';
        anaButon.style.transform = acikMi ? 'rotate(0deg)' : 'rotate(90deg)';
    });
    anaButon.style.transition = "transform 0.3s ease";
    anaButon.style.width = "50px"; anaButon.style.height = "50px";

    altMenu.appendChild(btnGece);
    altMenu.appendChild(btnSifirla);
    altMenu.appendChild(btnAzalt);
    altMenu.appendChild(btnArtir);
    grup.appendChild(anaButon);
    grup.appendChild(altMenu);
    document.body.appendChild(grup);

    // Açılışta hafızadaki ayarları uygula
    if(geceModuAcik) temaUygula(true);
    if(fontOran !== 1.0) boyutlandir(1); 
}

function temaUygula(karanlikMi) {
    if (!karanlikMi) {
        // Stilleri temizle ki orijinal CSS dosyandaki renkler gelsin
        document.body.style.background = "";
        document.body.style.color = "";
        document.querySelectorAll('details, summary, .arabi, .arabi3').forEach(el => {
            el.style.background = "";
            el.style.color = "";
        });
        return;
    }
    // Karanlık mod renkleri
    document.body.style.background = '#1a1a1a';
    document.body.style.color = '#e0e0e0';
    document.querySelectorAll('details, summary, .arabi, .arabi3').forEach(el => {
        el.style.background = '#2d2d2d';
        el.style.color = '#e0e0e0';
    });
}

function boyutlandir(carpan) {
    fontOran *= carpan;
    
    // Sınırlar
    if (fontOran < 0.7) fontOran = 0.7;
    if (fontOran > 2.0) fontOran = 2.0;

    localStorage.setItem('kulliyat_font', fontOran);

    document.querySelectorAll('details, summary, .arabi, .arabi3').forEach(el => {
        // Orijinal boyutu bir kereye mahsus kaydet
        if (!el.dataset.origSize) {
            el.dataset.origSize = window.getComputedStyle(el).fontSize;
        }
        el.style.fontSize = (parseFloat(el.dataset.origSize) * fontOran) + "px";
    });
}

function olusturButon(metin, renk, olay) {
    const b = document.createElement('button');
    b.innerHTML = metin;
    b.style.cssText = `width:45px; height:45px; border-radius:50%; border:none; background:${renk}; color:white; font-weight:bold; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.3); font-size:16px; display:flex; align-items:center; justify-content:center;`;
    b.onclick = olay;
    return b;
}

document.addEventListener("DOMContentLoaded", ayarMerkeziEkle);

