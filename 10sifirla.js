(function() {
    const sifirlaBtn = document.getElementById('sifirlaBtn');
    if (sifirlaBtn) {
        // Dosya yüklendiği an sıfırlama fonksiyonunu doğrudan üzerine alıp tetikler
        sifirlaBtn.onclick = function() {
            // Tüm tarayıcı hafızasını temizler
            localStorage.clear();
            
            // 9fontbuyukluk.js içindeki font hafızasını başlangıç durumuna çeker
            if (window.guncelFontOrani !== undefined) {
                window.guncelFontOrani = 100;
            }

            // Büyütme sisteminin oluşturduğu dinamik stil kutusunu temizler
            const dinamikStil = document.getElementById('dinamik-font-stili');
            if (dinamikStil) {
                dinamikStil.innerHTML = "";
            }

            // Sayfadaki manuel renk ve girdi değişikliklerini sıfırlar
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
            
            const sayfaInput = document.getElementById('sayfaNoInput');
            if (sayfaInput) sayfaInput.value = "";
            
            // Sayfayı ilk temiz haline getirmek için yeniler
            window.location.reload();
        };
        
        // Butona ilk basıldığında dosya iner inmez sıfırlamayı hemen başlatsın
        sifirlaBtn.click();
    }
})();
