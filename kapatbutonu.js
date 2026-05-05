// Kendi stilini ve butonunu otomatik oluşturan bağımsız kapatma komutu
(function() {
    // CSS stilini sayfaya enjekte et (Dışarıdan CSS dosyasına gerek kalmaz)
    const style = document.createElement('style');
    style.innerHTML = `
        .ozel-kapat-btn {
            position: fixed !important;
            top: 145px !important;    /* Senin ölçün */
            right: 45px !important;   /* Senin ölçün */
            width: 50px !important;
            height: 50px !important;
            background-color: #d93025 !important;
            color: white !important;
            border: 3px solid #ffffff !important;
            border-radius: 50% !important;
            font-size: 25px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            z-index: 999999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
            line-height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        .ozel-kapat-btn:active {
            transform: scale(0.9) !important;
            background-color: #b22218 !important;
        }
    `;
    document.head.appendChild(style);

    // Butonu oluştur ve ayarla
    const btn = document.createElement('button');
    btn.innerHTML = '✕';
    btn.className = 'ozel-kapat-btn';
    btn.title = 'Ana Sayfaya Dön';
    
    // Tıklandığında yapılacak işlem
    btn.onclick = function() {
        window.location.href = 'index.html';
    };

    // Sayfa hazır olduğunda butonu ekle
    if (document.body) {
        document.body.appendChild(btn);
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(btn);
        });
    }
})();
