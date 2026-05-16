(function() {
    // Eğer daha önce oran tanımlanmadıysa 100 olarak başlasın
    if (window.guncelFontOrani === undefined) {
        window.guncelFontOrani = 100;
    }

    // Dinamik font stilleri için tek bir style kutusu oluşturup head'e ekliyoruz
    let fontStilKutusu = document.getElementById('dinamik-font-stili');
    if (!fontStilKutusu) {
        fontStilKutusu = document.createElement('style');
        fontStilKutusu.id = 'dinamik-font-stili';
        document.head.appendChild(fontStilKutusu);
    }

    function fontuUygula(oran) {
        // Kitabın orijinal taban boyutu olan 1.3rem baz alınarak ölçekleme yapılır
        fontStilKutusu.innerHTML = `
            details { font-size: calc(1.3rem * ${oran / 100}) !important; }
            .arabi { font-size: calc(1.8rem * ${oran / 100}) !important; }
            
            /* Başlıklar, Lahikalar ve Sayfa Numaraları Kesinlikle Orijinal Boyutunda Çakılı Kalır */
            details summary, 
            details summary .lahika, 
            details .sayfa { 
                font-size: 1.3rem !important; 
            }
        `;
    }

    // Butonların tıklama fonksiyonları (5'er 5'er - Üst Sınır %130)
    const artiBtn = document.getElementById('fontArtiBtn');
    if (artiBtn) {
        artiBtn.onclick = function() {
            if (window.guncelFontOrani < 130) { 
                window.guncelFontOrani += 5; // İlk tıkta doğrudan %105 yapar, küçülme yaşanmaz
                fontuUygula(window.guncelFontOrani);
            }
        };
    }

    const eksiBtn = document.getElementById('fontEksiBtn');
    if (eksiBtn) {
        eksiBtn.onclick = function() {
            if (window.guncelFontOrani > 100) { 
                window.guncelFontOrani -= 5; 
                fontuUygula(window.guncelFontOrani);
            }
        };
    }
})();
