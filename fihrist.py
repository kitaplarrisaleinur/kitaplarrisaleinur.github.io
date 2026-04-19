import os
import re
import json
import tkinter as tk
from tkinter import messagebox

# 23 Kitaplık Tam Liste
kitaplar = [
    "sozler.html", "mektubat1.html", "mektubat2.html", "lemalar.html",
    "sualar1.html", "sualar2.html", "siracunnur.html", "zulfikar.html",
    "asayimusa.html", "tilsimlar.html", "isaratulicaz.html", "mesnevinuriye.html",
    "stgaybi.html", "barla.html", "kastamonu.html", "emirdag1.html",
    "emirdag2.html", "emirdag3.html", "emirdag4.html", "hanimlar.html",
    "genclik.html", "muhakemat.html", "nurunilkkapisi.html"
]

def turkce_kucuk_yap(metin):
    """Büyük İ ve I harflerini Türkçe kurallarına göre hatasız küçültür."""
    if not metin: return ""
    # Önce en kritik olan büyük İ ve I harflerini manuel hallediyoruz
    metin = metin.replace('İ', 'i').replace('I', 'ı').replace('Ş', 'ş').replace('Ğ', 'ğ').replace('Ü', 'ü').replace('Ö', 'ö').replace('Ç', 'ç')
    return metin.lower()

def kelime_degistir():
    """Dosyaların içindeki kelimeleri toplu değiştirir."""
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
    messagebox.showinfo("Değiştir", f"İşlem tamam abi, {toplam} kelime yenilendi.")

def fihrist_js_yenile():
    """Tüm kitapları tarayıp i-ı sorunu olmayan ve kasmayan fihrist.js'yi oluşturur."""
    if os.path.exists("fihrist.js"): 
        os.remove("fihrist.js")
    
    ana_fihrist = {}
    
    for kitap in kitaplar:
        if os.path.exists(kitap):
            try:
                with open(kitap, 'r', encoding='utf-8') as f:
                    # 1. HTML etiketlerini ve &nbsp; gibi boşlukları temizle
                    icerik = f.read()
                    metin_temiz = re.sub(r'<[^>]*>', ' ', icerik).replace('&nbsp;', ' ')
                    
                    # 2. Türkçe karakterleri doğru şekilde küçült (İslam -> islam)
                    metin = turkce_kucuk_yap(metin_temiz)
                    
                    # 3. Kelimeleri ayıkla (Türkçe karakterlerin hepsini yakalar)
                    # i, ı, ş, ğ, ü, ö ve rakamları eksiksiz toplar
                    kelimeler = re.findall(r'[a-zçğışöü0-9]+', metin)
                    
                    for kelime in kelimeler:
                        if len(kelime) < 2: continue # Tek harflileri geç
                        if kelime not in ana_fihrist: 
                            ana_fihrist[kelime] = {}
                        if kitap not in ana_fihrist[kelime]: 
                            ana_fihrist[kelime][kitap] = 0
                        ana_fihrist[kelime][kitap] += 1
            except Exception as e:
                print(f"{kitap} okunurken hata oluştu: {e}")

    # 4. Dosyayı kaydet (indent=2 sayesinde VS Code donmaz, alt alta yazar)
    try:
        with open("fihrist.js", "w", encoding="utf-8") as f:
            f.write("const fihrist = ")
            json.dump(ana_fihrist, f, ensure_ascii=False, indent=2)
            f.write(";")
        messagebox.showinfo("Başarılı", "Fihrist.js sıfırdan tertemiz oluşturuldu abi! Bilgisayarın artık donmayacak.")
    except Exception as e:
        messagebox.showerror("Hata", f"Dosya yazma hatası: {str(e)}")

# --- Arayüz Ekranı ---
root = tk.Tk()
root.title("Külliyat Veri İşleme Merkezi")
root.geometry("450x500")

tk.Label(root, text="BULUNACAK / DEĞİŞECEK KELİME:", font=("Arial", 10, "bold")).pack(pady=10)
entry_bul = tk.Entry(root, font=("Arial", 12), width=35)
entry_bul.pack()

tk.Label(root, text="YENİ HALİ (İSTEĞE BAĞLI):", font=("Arial", 10, "bold")).pack(pady=10)
entry_degistir = tk.Entry(root, font=("Arial", 12), width=35)
entry_degistir.pack()

# Kelime Değiştirme Butonu
tk.Button(root, text="KELİMELERİ KİTAPLARDA DEĞİŞTİR", command=kelime_degistir, 
          bg="#ff9800", fg="black", width=35, font=("Arial", 11, "bold"), pady=10).pack(pady=20)

tk.Label(root, text="----------------------------------------------------------").pack()

# Fihrist Oluşturma Butonu
tk.Button(root, text="FİHRİST.JS DOSYASINI SIFIRDAN OLUŞTUR", command=fihrist_js_yenile, 
          bg="#2196f3", fg="white", width=35, font=("Arial", 11, "bold"), pady=20).pack(pady=20)

root.mainloop()
