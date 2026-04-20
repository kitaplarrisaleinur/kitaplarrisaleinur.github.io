import os
import re
import json
import tkinter as tk
from tkinter import messagebox

# 23 Kitaplık Liste
kitaplar = [
    "sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html",
    "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html",
    "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html",
    "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html",
    "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html",
    "genclik.html", "muhakemat.html", "nurunilkkapisi.html"
]

alfabe = "abcçdefgğhıijklmnoöprsştuüvyz0123456789"

class CanliFihrist:
    def __init__(self, root):
        self.root = root
        self.root.title("CANLI HARF SAYACI")
        self.root.geometry("600x800")
        
        tk.Label(root, text="HARF BAZLI CANLI TAKİP", font=("Arial", 16, "bold")).pack(pady=10)
        
        self.sayaclar = {}
        self.label_kitap = tk.Label(root, text="Kitap: Hazır", font=("Arial", 12), fg="blue")
        self.label_kitap.pack()

        # Harf Tablosu Oluşturma
        frame = tk.Frame(root)
        frame.pack(pady=10)
        
        for i, harf in enumerate(alfabe):
            l_harf = tk.Label(frame, text=f"{harf.upper()}:", font=("Arial", 14, "bold"), width=5, anchor="e")
            l_harf.grid(row=i//3, column=(i%3)*2, padx=5, pady=2)
            
            l_sayi = tk.Label(frame, text="0", font=("Arial", 14), width=10, anchor="w", fg="gray")
            l_sayi.grid(row=i//3, column=(i%3)*2+1, padx=5, pady=2)
            
            self.sayaclar[harf] = {"label": l_harf, "sayi": l_sayi, "count": 0}

        self.btn = tk.Button(root, text="DİZİNİ BAŞLAT", command=self.baslat, bg="green", fg="white", font=("Arial", 14, "bold"), pady=10)
        self.btn.pack(pady=20)

    def baslat(self):
        self.btn.config(state="disabled")
        ana_fihrist = {}
        
        for kitap in kitaplar:
            if os.path.exists(kitap):
                self.label_kitap.config(text=f"Şu an İşlenen: {kitap}")
                self.root.update()
                
                with open(kitap, 'r', encoding='utf-8') as f:
                    icerik = f.read()
                    metin = re.sub(r'<[^>]*>', ' ', icerik).replace('&nbsp;', ' ')
                    metin = metin.replace('İ', 'i').replace('I', 'ı').lower()
                    kelimeler = re.findall(r'[a-zçğışöü0-9]+', metin)
                    
                    for kelime in kelimeler:
                        if len(kelime) < 2: continue
                        
                        ilk_harf = kelime[0]
                        if ilk_harf in self.sayaclar:
                            # Sayaç ve Renk Güncelleme
                            self.sayaclar[ilk_harf]["count"] += 1
                            self.sayaclar[ilk_harf]["sayi"].config(text=str(self.sayaclar[ilk_harf]["count"]), fg="red")
                            # Ekranda hareketi görmek için her 100 kelimede bir arayüzü tazele
                            if self.sayaclar[ilk_harf]["count"] % 100 == 0:
                                self.root.update()

                            if kelime not in ana_fihrist: ana_fihrist[kelime] = {}
                            if kitap not in ana_fihrist[kelime]: ana_fihrist[kelime][kitap] = 0
                            ana_fihrist[kelime][kitap] += 1
        
        # Dosyayı Kaydet
        with open("fihrist.js", "w", encoding="utf-8") as f:
            f.write("const fihrist = ")
            json.dump(ana_fihrist, f, ensure_ascii=False, indent=2)
            f.write(";")
            
        messagebox.showinfo("BİTTİ", "Tüm kitaplar tarandı ve fihrist.js oluşturuldu!")
        self.btn.config(state="normal")

root = tk.Tk()
app = CanliFihrist(root)
root.mainloop()
