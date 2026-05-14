window.addEventListener('load', function() {
    // --- 1. AYARLAR VE LİSTELER ---
    const kitapListesi = ["sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html", "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html", "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html", "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html", "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html", "genclik.html", "muhakemat.html", "nurunilkkapisi.html"];
    const kitapGercekAdlari = ["Sözler", "Mektubat 1", "Mektubat 2", "Lem'alar", "Şualar 1", "Şualar 2", "Sıracın Nur", "Zülfikar", "Asayı Musa", "Tılsımlar", "İşaratül İcaz", "Mesnevi Nuriye", "ST Gaybi", "Barla", "Kastamonu", "Emirdağ 1", "Emirdağ 2", "Emirdağ 3", "Emirdağ 4", "Hanımlar Rehberi", "Gençlik Rehberi", "Muhakemat", "Nurun İlk Kapısı"];
    const urlParams = new URLSearchParams(window.location.search);
    const aranan = urlParams.get('ara') || "";
    const sonGit = urlParams.get('son');
    let suankiDosya = window.location.pathname.split("/").pop();
    let indexNumarasi = kitapListesi.indexOf(suankiDosya);
    let kitapAdi = indexNumarasi !== -1 ? kitapGercekAdlari[indexNumarasi] : "Külliyat";
    const kelimeDizisi = aranan.trim().split(/\s+/).filter(k => k.length >= 2);

    let fontOran = parseFloat(localStorage.getItem('kulliyat_font')) || 1.0;
    let geceModuAcik = localStorage.getItem('kulliyat_tema') === 'karanlik';

    // --- 2. ÜST ARAMA PANELİ (NAVİGASYON) ---
    if (aranan) {
        const panel = document.createElement('div');
        panel.id = "aramaPaneli";
        panel.style = `position:fixed; top:12px; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #d1d1d1; border-radius:15px; padding:10px 20px; z-index:999999; font-family:sans-serif; box-shadow:0 8px 30px rgba(0,0,0,0.12); display:flex; align-items:center; gap:20px; min-width:320px; justify-content:space-between;`;
        panel.innerHTML = `<div style="display:flex; flex-direction:column;"><span style="font-size:11px; font-weight:bold; color:#222;">${kitapAdi}</span><span id="sayac" style="font-weight:600; font-size:13px; color:#d93025;">${aranan} ...</span></div><div style="display:flex; gap:10px;"><button id="geriBtn" style="width:40px; height:40px; border-radius:50%; border:1px solid #e0e0e0; background:white; cursor:pointer;">▲</button><button id="ileriBtn" style="width:40px; height:40px; border-radius:50%; border:1px solid #e0e0e0; background:white; cursor:pointer;">▼</button></div>`;
        document.body.appendChild(panel);

        const d_arananlar = kelimeDizisi.map(k => k.replace(/İ/g, "(İ|i)").replace(/i/g, "(İ|i)").replace(/I/g, "(I|ı)").replace(/ı/g, "(I|ı)"));
        const regex = new RegExp("(^|[^a-zA-ZçÇğĞıİöÖşŞüÜ])(" + d_arananlar.join('|') + ")", "gi");

        function boya(node) {
            if (node.id === "aramaPaneli" || node.id === "ayar-menusu") return;
            if (node.nodeType === 3 && node.data.match(regex)) { 
                const span = document.createElement('span'); 
                span.innerHTML = node.data.replace(regex, '$1<mark class="isaretli" style="background-color:#ffe066; color:#000; border-radius:2px; padding:0 2px;">$2</mark>'); 
                node.parentNode.replaceChild(span, node); 
            } else if (node.nodeType === 1 && node.childNodes && !/(script|style|mark)/i.test(node.tagName)) { 
                for (let i = 0; i < node.childNodes.length; i++) boya(node.childNodes[i]); 
            }
        }
        boya(document.body);

        const bulunanlar = document.querySelectorAll('.isaretli');
        let sira = 0;
        window.git = (i) => {
            if (i < 0 || i >= bulunanlar.length) return;
            sira = i;
            let hedef = bulunanlar[i];
            let ebeveyn = hedef.closest('details');
            while (ebeveyn) { ebeveyn.open = true; ebeveyn = ebeveyn.parentElement.closest('details'); }
            setTimeout(() => { 
                hedef.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
                bulunanlar.forEach(el => el.style.backgroundColor = "#ffe066"); 
                hedef.style.backgroundColor = "#ff9632"; 
                document.getElementById('sayac').innerText = `${aranan} (${i + 1}/${bulunanlar.length})`; 
            }, 60);
        };
        if (bulunanlar.length > 0) sonGit === "1" ? git(bulunanlar.length - 1) : git(0);

        function akilliGit(yon) {
            let idx = indexNumarasi + yon;
            if (idx >= 0 && idx < kitapListesi.length) {
                window.location.href = kitapListesi[idx] + "?ara=" + encodeURIComponent(aranan) + (yon === -1 ? "&son=1" : "");
            } else { alert("Sonuç bitti."); }
        }
        document.getElementById('ileriBtn').onclick = () => sira + 1 < bulunanlar.length ? git(sira + 1) : akilliGit(1);
        document.getElementById('geriBtn').onclick = () => sira - 1 >= 0 ? git(sira - 1) : akilliGit(-1);
    }

    // --- 3. MERKEZİ AYARLAR (DİŞLİ ÇARK - HER ŞEY BURADA) ---
    function ayarMerkeziKur() {
        const menu = document.createElement('div');
        menu.id = "ayar-menusu";
        menu.style.cssText = "position:fixed; bottom:85px; right:25px; display:none; flex-direction:column; gap:10px; z-index:999999; background:white; padding:15px; border-radius:15px; box-shadow:0 8px 25px rgba(0,0,0,0.2); min-width:180px; font-family:sans-serif;";

        menu.innerHTML = `
            <button onclick="window.location.href='index.html'" style="background:#d93025; color:white; border:none; padding:12px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:16px;">✕ KAPAT</button>
            
            <div style="display:flex; gap:5px;">
                <button onclick="document.querySelectorAll('details').forEach(d=>d.open=true)" style="flex:1; background:#27ae60; color:white; border:none; padding:10px; border-radius:8px; cursor:pointer; font-size:12px;">Tümünü Aç</button>
                <button onclick="document.querySelectorAll('details').forEach(d=>d.open=false)" style="flex:1; background:#34495e; color:white; border:none; padding:10px; border-radius:8px; cursor:pointer; font-size:12px;">Daralt</button>
            </div>

            <div style="display:flex; gap:5px;">
                <button onclick="boyutlandir(1.1)" style="flex:1; background:#f5f5f5; border:1px solid #ddd; padding:10px; border-radius:8px; cursor:pointer; font-weight:bold;">A+</button>
                <button onclick="boyutlandir(0.9)" style="flex:1; background:#f5f5f5; border:1px solid #ddd; padding:10px; border-radius:8px; cursor:pointer; font-weight:bold;">A-</button>
            </div>

            <button id="geceBtn" onclick="geceTetikle()" style="background:#34495e; color:white; border:none; padding:10px; border-radius:8px; cursor:pointer;">🌙 Gece Modu</button>
            
            <button onclick="localStorage.clear(); location.reload();" style="background:#7f8c8d; color:white; border:none; padding:8px; border-radius:8px; cursor:pointer; font-size:11px;">↺ Ayarları Sıfırla</button>
        `;

        const disli = document.createElement('button');
        disli.id = "anaDisliBtn";
        disli.innerHTML = "⚙️";
        disli.style.cssText = "position:fixed; bottom:25px; right:25px; width:55px; height:55px; border-radius:50%; border:none; background:#546e7a; color:white; font-size:26px; cursor:pointer; z-index:1000000; box-shadow:0 4px 15px rgba(0,0,0,0.3); transition: 0.3s;";
        
        disli.onclick = () => {
            const acikMi = menu.style.display === "flex";
            menu.style.display = acikMi ? "none" : "flex";
            disli.style.transform = acikMi ? "rotate(0deg)" : "rotate(90deg)";
        };

        document.body.appendChild(menu);
        document.body.appendChild(disli);
    }
    ayarMerkeziKur();

    // --- 4. YARDIMCI FONKSİYONLAR ---
    window.boyutlandir = (carpan) => {
        fontOran *= carpan;
        if (fontOran < 0.7) fontOran = 0.7; if (fontOran > 2.0) fontOran = 2.0;
        localStorage.setItem('kulliyat_font', fontOran);
        document.querySelectorAll('details, summary, .arabi, .arabi3, p, span').forEach(el => {
            if (!el.dataset.origSize) el.dataset.origSize = window.getComputedStyle(el).fontSize;
            el.style.fontSize = (parseFloat(el.dataset.origSize) * fontOran) + "px";
        });
    };

    window.geceTetikle = () => {
        geceModuAcik = !geceModuAcik;
        localStorage.setItem('kulliyat_tema', geceModuAcik ? 'karanlik' : 'aydinlik');
        temaUygula(geceModuAcik);
    };

    window.temaUygula = (karanlik) => {
        document.body.style.background = karanlik ? '#1a1a1a' : '';
        document.body.style.color = karanlik ? '#e0e0e0' : '';
        document.querySelectorAll('details, summary, .arabi, .arabi3').forEach(el => {
            el.style.background = karanlik ? '#2d2d2d' : '';
            el.style.color = karanlik ? '#e0e0e0' : '';
        });
        const btn = document.getElementById('geceBtn');
        if(btn) {
            btn.innerHTML = karanlik ? "☀️ Aydınlık Mod" : "🌙 Gece Modu";
            btn.style.background = karanlik ? "#f1c40f" : "#34495e";
        }
    };

    if(geceModuAcik) temaUygula(true);
    if(fontOran !== 1.0) setTimeout(() => boyutlandir(1), 100);
});

