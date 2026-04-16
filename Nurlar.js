 // Paneli göster/gizle
        function toggleControlBox() {
            const panel = document.getElementById('controlBox');
            panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
        }

        // Tüm details etiketlerini açan veya kapatan sihirli fonksiyon
        function controlDetails(isOpen) {
            // Sayfadaki tüm <details> etiketlerini bulur
            const allDetails = document.querySelectorAll('details');
            
            allDetails.forEach(detail => {
                detail.open = isOpen; // Hepsini açar (true) veya kapatır (false)
            });
        }

        