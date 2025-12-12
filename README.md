# Mini Games Platform

Modern, modüler ve ölçeklenebilir bir React tabanlı mini oyun platformu.

## 🎮 Özellikler

- **Çark-ı Felek**: Fizik tabanlı dönen çark oyunu, olasılık sistemi ile ödül kazanma
- **Zaman Saldırısı**: Refleks tabanlı kronometreyi tam 10.00 saniyede durdurma challenge'ı
- **Modüler Mimari**: Yeni oyunlar kolayca eklenebilir
- **Responsive Tasarım**: Tüm cihazlarda sorunsuz çalışır
- **Type-Safe**: TypeScript ile tam tip güvenliği

## 🛠️ Teknoloji Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Query
- **Validation**: Yup
- **Icons**: Lucide React

## 📁 Proje Yapısı

```
mini-games/
├── src/
│   ├── @types/              # Global TypeScript tip tanımlamaları
│   ├── components/          # Paylaşılan komponentler
│   │   ├── layout/         # Layout komponentleri (Sidebar, Navbar)
│   │   ├── ui/             # shadcn/ui komponentleri
│   │   └── common/         # Ortak komponentler
│   ├── games/              # Oyun modülleri
│   │   ├── wheel-of-fortune/
│   │   └── time-attack/
│   ├── lib/                # Utilities ve sabitler
│   │   ├── constants/
│   │   ├── utils/
│   │   └── validations/
│   ├── pages/              # Sayfa komponentleri
│   └── hooks/              # Global custom hooks
└── public/                 # Statik dosyalar
```

## 🚀 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda açın:
```
http://localhost:5173
```

## 📝 Geliştirme Kuralları

Proje `.github/copilot-instructions.md` dosyasında belirtilen kurallara göre geliştirilmiştir:

- ✅ Tüm komponentler kebab-case isimlendirme
- ✅ Her section ayrı component dosyası
- ✅ Global tip tanımlamaları `@types/*.d.ts` formatında
- ✅ Sadece Tailwind CSS kullanımı
- ✅ Props olarak tüm obje geçilmesi
- ✅ Magic string/number yerine sabitler
- ✅ Yup ile form validasyonları
- ✅ React Query ile API çağrıları

## 🎯 Yeni Oyun Ekleme

1. `src/games/[oyun-adi]/` klasörü oluşturun
2. Gerekli komponentleri, hook'ları ve utilities'i ekleyin
3. `src/games/[oyun-adi]/index.tsx` ana oyun komponentini oluşturun
4. `src/@types/[oyun-adi].d.ts` tip tanımlamalarını ekleyin
5. `src/pages/[oyun-adi]-page.tsx` sayfa komponentini oluşturun
6. Routing'e ekleyin

## 🏗️ Build

Production build için:
```bash
npm run build
```

Preview:
```bash
npm run preview
```

## 📄 Lisans

Bu proje özel bir projedir.

---

**Geliştirici Notu**: Tüm komponentler kurallarınıza uygun şekilde, her section ayrı component dosyasında oluşturulmuştur. Projeye yeni özellikler eklerken ARCHITECTURE.md dosyasına bakabilirsiniz.
