import os
import re

kitaplar = [
    "sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html",
    "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html",
    "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html",
    "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html",
    "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html",
    "genclik.html", "muhakemat.html", "nurunilkkapisi.html"
]

def tertemiz_supur():
    for kitap in kitaplar:
        if os.path.exists(kitap):
            with open(kitap, 'r', encoding='utf-8') as f:
                icerik = f.read()

            # 1. <div style="text-align: center; ..."> ile başlayan her şeyi SİL
            icerik = re.sub(r'<div style="text-align: center; margin-top: 20px;">.*?</div>', '', icerik, flags=re.DOTALL)
            
            # 2. Sayfanın sonundaki tüm </body> ve </html> etiketlerini temizle (Sona biz ekleyeceğiz)
            icerik = icerik.replace("</body>", "").replace("</html>", "").strip()
            
            # 3. Sayfayı standart kapanışla bitir (Tertemiz orijinal hali)
            yeni_icerik = icerik + "\n</body>\n</html>"

            with open(kitap, 'w', encoding='utf-8') as f:
                f.write(yeni_icerik)
    
    print("Bütün o kalabalıklar süpürüldü! 23 kitap da tertemiz oldu abi.")

tertemiz_supur()
