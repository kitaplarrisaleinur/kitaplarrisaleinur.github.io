import os
import tkinter as tk
from tkinter import messagebox

kitaplar = [
    "sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html",
    "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html",
    "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html",
    "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html",
    "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html",
    "genclik.html", "muhakemat.html", "nurunilkkapisi.html"
]

def sayaclari_ekle():
    toplam_eklenen = 0
    for kitap in kitaplar:
        if os.path.exists(kitap):
            # Kitap ismini sayaç için temizle (örn: sozler.html -> rnk-sozler)
            sayac_id = "rnk-" + kitap.replace(".html", "")
            
            # Eklenecek sayaç kodu
            sayac_kodu = f'\n<div style="text-align: center; margin-top: 20px;">\n' \
                         f'    <img src="https://laobi.icu{sayac_id}">\n' \
                         f'</div>\n</body>'

            with open(kitap, 'r', encoding='utf-8') as f:
                icerik = f.read()
            
            # Eğer zaten sayaç eklenmemişse ekle (kopya olmasın diye)
            if "visitor-badge" not in icerik:
                yeni_icerik = icerik.replace("</body>", sayac_kodu)
                with open(kitap, 'w', encoding='utf-8') as f:
                    f.write(yeni_icerik)
                toplam_eklenen += 1
    
    messagebox.showinfo("İşlem Tamam", f"{toplam_eklenen} kitaba özel sayaçlar başarıyla eklendi!")

# Arayüz
root = tk.Tk()
root.title("Külliyat Sayaç Ekleyici")
root.geometry("300x200")

tk.Label(root, text="Tüm kitaplara özel\nziyaretçi sayacı ekle", font=("Arial", 11)).pack(pady=20)

tk.Button(root, text="SAYACI TÜM KİTAPLARA KOY", command=sayaclari_ekle, 
          bg="#4CAF50", fg="white", font=("Arial", 10, "bold"), pady=15).pack()

root.mainloop()
