window.addEventListener('load', function() {
    const kitapListesi = [
        "sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html",
        "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html",
        "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html",
        "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html",
        "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html",
        "genclik.html", "muhakemat.html", "nurunilkkapisi.html"
    ];

    const kitapGercekAdlari = [
        "Sözler", "Mektubat 1", "Mektubat 2", "Lem'alar", "Şualar 1", "Şualar 2", 
        "Sıracın Nur", "Zülfikar", "Asayı Musa", "Tılsımlar", "İşaratül İcaz", 
        "Mesnevi Nuriye", "ST Gaybi", "Barla", "Kastamonu", "Emirdağ 1", 
        "Emirdağ 2", "Emirdağ 3", "Emirdağ 4", "Hanımlar Rehberi", 
        "Gençlik Rehberi", "Muhakemat", "Nurun İlk Kapısı"
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const aranan = urlParams.get('ara');
    const sonGit = urlParams.get('son');
    let suankiDosya = window.location.pathname.split("/").pop();
    
    let indexNumarasi = kitapListesi.indexOf(suankiDosya);
    let kitapAdi = indexNumarasi !== -1 ? kitapGercekAdlari[indexNumarasi] : "Külliyat";

    // --- KAPAT BUTONU ---
    if (!aranan) {
        const tekKapat = document.createElement('button');
        tekKapat.innerHTML = "✕";
        tekKapat.style = `position:fixed; top:20px; right:40px; width:42px; height:42px; border-radius:50%; border:none; background:#d93025; color:#fff; font-weight:bold; font-size:20px; cursor:pointer; z-index:999999; box-shadow:0 4px 10px rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center;`;
        document.body.appendChild(tekKapat);
        tekKapat.onclick = () => { window.location.href = 'index.html'; };
    }

    if (aranan) {
        const panel = document.createElement('div');
        panel.id = "aramaPaneli";
        panel.style = `position:fixed; top:12px; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #d1d1d1; border-radius:15px; padding:10px 20px; z-index:999999; font-family:sans-serif; box-shadow:0 8px 30px rgba(0,0,0,0.12); display:flex; align-items:center; gap:20px; min-width:350px; justify-content:space-between;`;
        
        panel.innerHTML = `
            <div style="display:flex; flex-direction:column; min-width:130px;">
                <span style="font-size:13px; font-weight:bold; color:#222;">${kitapAdi}</span>
                <span id="sayac" style="font-weight:600; font-size:13px; color:#d93025; margin-top:2px;">${aranan} ...</span>
            </div>
            <div style="display:flex; gap:12px; align-items:center;">
                <button id="geriBtn" style="width:45px; height:45px; border-radius:50%; border:1px solid #e0e0e0; background:white; font-size:18px; cursor:pointer;">▲</button>
                <button id="ileriBtn" style="width:45px; height:45px; border-radius:50%; border:1px solid #e0e0e0; background:white; font-size:18px; cursor:pointer;">▼</button>
                <button id="kapatBtn" style="width:32px; height:32px; border:none; background:none; color:#d93025; cursor:pointer; font-weight:bold; font-size:22px; display:flex; align-items:center; justify-content:center;">✕</button>
            </div>`;
        
        document.body.appendChild(panel);
        document.getElementById('kapatBtn').onclick = () => { window.location.href = 'ara.html'; };

        // TÜRKÇE KARAKTER DUYARLI ARAMA
        const regex = new RegExp("(" + aranan.replace(/İ/g, "(İ|i)").replace(/i/g, "(İ|i)").replace(/I/g, "(I|ı)").replace(/ı/g, "(I|ı)") + ")", "gi");
        
        function boya(node) {
            if (node.id === "aramaPaneli" || (node.parentNode && node.parentNode.id === "aramaPaneli")) return;
            if (node.nodeType === 3) {
                if (node.data.match(regex)) {
                    const span = document.createElement('span');
                    span.innerHTML = node.data.replace(regex, '<mark class="isaretli" style="background-color:#ffe066; color:#000; border-radius:2px; padding:0 2px;">$1</mark>');
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeType === 1 && node.childNodes && !/(script|style|mark)/i.test(node.tagName)) {
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

        document.getElementById('ileriBtn').onclick = () => {
            if (sira + 1 < bulunanlar.length) git(sira + 1);
            else {
                let index = kitapListesi.indexOf(suankiDosya);
                if (index !== -1 && index + 1 < kitapListesi.length) 
                    window.location.href = kitapListesi[index + 1] + "?ara=" + encodeURIComponent(aranan);
            }
        };
        document.getElementById('geriBtn').onclick = () => {
            if (sira - 1 >= 0) git(sira - 1);
            else {
                let index = kitapListesi.indexOf(suankiDosya);
                if (index !== -1 && index - 1 >= 0) 
                    window.location.href = kitapListesi[index - 1] + "?ara=" + encodeURIComponent(aranan) + "&son=1";
            }
        };
    }
});
