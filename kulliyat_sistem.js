window.addEventListener('load', function() {
    const kitapListesi = [
        "sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html",
        "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html",
        "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html",
        "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html",
        "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html",
        "genclik.html", "muhakemat.html", "nurunilkkapisi.html"
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const aranan = urlParams.get('ara');
    const sonGit = urlParams.get('son');
    let suankiDosya = window.location.pathname.split("/").pop();

    // KONTROL PANELİ (Sağ Üst Köşeye Çektik)
    const kontrolKutusu = document.createElement('div');
    kontrolKutusu.style = `position:fixed; top:15px; right:15px; z-index:999999; display:flex; gap:8px; align-items:center; flex-direction: row-reverse;`;

    // KIRMIZI ÇARPI BUTONU (En sağda duracak şekilde ayarlandı)
    let html = `<button id="kapatBtn" style="width:38px; height:38px; border-radius:50%; border:2px solid #d93025; background:rgba(255,255,255,0.95); color:#d93025; font-size:20px; font-weight:bold; cursor:pointer; box-shadow:0 3px 8px rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center;">✕</button>`;

    // Eğer arama yapılmışsa, kırmızı çarpının soluna minik ileri-geri oklarını ekle
    if (aranan) {
        html += `
            <div id="sayac" style="background:rgba(217,48,37,0.9); color:#fff; padding:5px 10px; border-radius:15px; font-size:12px; font-family:sans-serif; font-weight:bold; min-width:45px; text-align:center;">...</div>
            <button id="ileriBtn" style="width:38px; height:38px; border-radius:50%; border:1px solid #ccc; background:#fff; cursor:pointer; font-size:14px;">▼</button>
            <button id="geriBtn" style="width:38px; height:38px; border-radius:50%; border:1px solid #ccc; background:#fff; cursor:pointer; font-size:14px;">▲</button>
        `;
    }

    kontrolKutusu.innerHTML = html;
    document.body.appendChild(kontrolKutusu);

    // Kırmızı çarpıya basınca ana sayfaya uçurur
    document.getElementById('kapatBtn').onclick = () => { window.location.href = 'index.html'; };

    // Arama boyama ve navigasyon mantığı (24 saatlik emeğin kalbi)
    if (aranan) {
        const regex = new RegExp("(" + aranan.replace(/İ/g, "(İ|i)").replace(/i/g, "(İ|i)").replace(/I/g, "(I|ı)").replace(/ı/g, "(I|ı)") + ")", "gi");
        function boya(node) {
            if (node.nodeType === 3) {
                if (node.data.match(regex)) {
                    const span = document.createElement('span');
                    span.innerHTML = node.data.replace(regex, '<mark class="isaretli" style="background:#ffe066;">$1</mark>');
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
                bulunanlar.forEach(el => el.style.background = "#ffe066");
                hedef.style.background = "#ff9632";
                document.getElementById('sayac').innerText = `${i + 1}/${bulunanlar.length}`;
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
