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
    messagebox.showinfo("Değiştir", f"İşlem tamam! {toplam} kelime değiştirildi.")

# Arayüz
root = tk.Tk()
root.title("Külliyat Editörü - Kelime Değiştir")
root.geometry("400x300")

tk.Label(root, text="BULUNACAK KELİME:", font=("Arial", 10, "bold")).pack(pady=10)
entry_bul = tk.Entry(root, font=("Arial", 12), width=30)
entry_bul.pack()

tk.Label(root, text="YENİ KELİME:", font=("Arial", 10, "bold")).pack(pady=10)
entry_degistir = tk.Entry(root, font=("Arial", 12), width=30)
entry_degistir.pack()

tk.Button(root, text="TÜM KİTAPLARDA DEĞİŞTİR", command=kelime_degistir, 
          bg="#ff9800", fg="black", font=("Arial", 11, "bold"), pady=10).pack(pady=20)

root.mainloop()
