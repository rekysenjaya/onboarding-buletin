# Onboarding Buletin Novel

Proyek ini adalah template **React + Vite** untuk membuat **flow onboarding interaktif** bagi pengguna Buletin Novel.  
Onboarding menyimpan progress di **localStorage**, divalidasi input, dan menggunakan komponen modular.

---

## 🚀 Deploy

Project ini sudah **dideploy di Vercel** dan bisa diakses di sini:

👉 **[https://onboarding-goodbuletin.vercel.app/](https://onboarding-goodbuletin.vercel.app/)**

---

## Flow Onboarding

```mermaid
flowchart TD
    A[Mulai Onboarding] --> B[OnboardingNameScreen]
    B --> C[OnboardingGenderScreen]
    C --> D[OnboardingDateOfBirthScreen]
    D --> E[OnboardingCategoryScreen]
    E --> F[OnboardingGenresScreen]
    F --> G[OnboardingNotifScreen]
    G --> H[OnboardingWhereInfoScreen]
    H --> I[Selesai!]
````

**Deskripsi Screen:**

| Screen                        | Fungsi                                   |
| ----------------------------- | ---------------------------------------- |
| `OnboardingNameScreen`        | Input nama pengguna                      |
| `OnboardingGenderScreen`      | Pilih jenis kelamin                      |
| `OnboardingDateOfBirthScreen` | Input tanggal lahir (validasi Moment.js) |
| `OnboardingCategoryScreen`    | Pilih kategori favorit                   |
| `OnboardingGenresScreen`      | Pilih genre favorit                      |
| `OnboardingNotifScreen`       | Atur preferensi notifikasi               |
| `OnboardingWhereInfoScreen`   | Sumber informasi novel                   |
| **Selesai**                   | Progress tersimpan, onboarding complete  |

---

## Teknologi Utama

* **React 18+**
* **Vite**
* **Framer Motion** (opsional untuk animasi step)
* **Moment.js** (validasi tanggal)
* **TypeScript** (disarankan)
* **TailwindCSS** (opsional)
* **Vercel** (deployment)
* **ESLint**

---

## Struktur Proyek

```
src/
├─ assets/           # Assets
├─ components/       # Komponen UI modular
├─ hooks/            # Custom hooks
├─ pages/            # Screen onboarding
├─ json/             # JSON data
├─ type/             # TypeScript type definitions
├─ App.tsx
└─ main.tsx
```

---

## Instalasi & Menjalankan Proyek

1. Install dependencies:

```bash
npm install
```

2. Jalankan dev server:

```bash
npm run dev
```

3. Build production:

```bash
npm run build
```

---

## Fitur

* Progress onboarding **tersimpan di localStorage**, tidak hilang saat refresh
* Input **tervalidasi** (contoh: tanggal lahir, bulan, tahun)
* Navigasi **prev / next** step
* Komponen modular dan reusable
* Dukungan animasi step dengan **Framer Motion** (opsional)
* Reset onboarding dengan mudah

---

## Lisensi

MIT
