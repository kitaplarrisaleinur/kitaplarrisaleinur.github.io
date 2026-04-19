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

def kelime_degistir():
    aranan = entry_bul.get()
    yeni = entry_degistir.get()
    if not aranan:
        messagebox.showwarning("Hata", "Önce aranan kelimeyi yaz abi!")
        return
    
    toplam = 0
    for kitap in kitaplar:
        if os.path.exists(kitap):
            with open(kitap, 'r', encoding='utf-8') as f:
                icerik = f.read()
            if aranan in icerik:
                adet = icerik.count(aranan)
                yeni_icerik = icerik.replace(aranan, yeni)
                with open(kitap, 'w', encoding='utf-8') as f:
                    f.write(yeni_icerik)
                toplam += adet
    messagebox.showinfo("Değiştir", f"Tamam abi, {toplam} kelime değiştirildi ve kaydedildi.")

def fihrist_js_yenile():
    if os.path.exists("fihrist.js"): 
        os.remove("fihrist.js")
    
    ana_fihrist = {}
    for kitap in kitaplar:
        if os.path.exists(kitap):
            with open(kitap, 'r', encoding='utf-8') as f:
                # HTML temizliği ve kelime ayıklama
                metin = re.sub(r'<[^>]*>', ' ', f.read()).replace('&nbsp;', ' ').lower()
                kelimeler = re.findall(r'[a-zğüşıöç0-9]+', metin)
                for kelime in kelimeler:
                    if len(kelime) < 2: continue
                    if kelime not in ana_fihrist: ana_fihrist[kelime] = {}
                    if kitap not in ana_fihrist[kelime]: ana_fihrist[kelime][kitap] = 0
                    ana_fihrist[kelime][kitap] += 1
                    
    with open("fihrist.js", "w", encoding="utf-8") as f:
        f.write("const fihrist = " + json.dumps(ana_fihrist, ensure_ascii=False) + ";")
    
    messagebox.showinfo("Fihrist", "Fihrist JS dosyası baştan aşağı yenilendi abi!")

# Arayüz
root = tk.Tk()
root.title("Külliyat Tamir Merkezi")
root.geometry("400x400")

tk.Label(root, text="BULUNACAK KELİME:", font=("Arial", 10, "bold")).pack(pady=10)
entry_bul = tk.Entry(root, font=("Arial", 12), width=30)
entry_bul.pack()

tk.Label(root, text="YENİ HALİ (DEĞİŞTİR):", font=("Arial", 10, "bold")).pack(pady=10)
entry_degistir = tk.Entry(root, font=("Arial", 12), width=30)
entry_degistir.pack()

# Butonlar
tk.Button(root, text="DEĞİŞTİR", command=kelime_degistir, bg="orange", fg="black", width=25, font=("Arial", 11, "bold"), pady=10).pack(pady=25)

tk.Label(root, text="------------------------------------------").pack()

tk.Button(root, text="FİHRİST JS YENİLE", command=fihrist_js_yenile, bg="blue", fg="white", width=25, font=("Arial", 11, "bold"), pady=20).pack(pady=20)

root.mainloop()
