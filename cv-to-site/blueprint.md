# Amaç

Arkadaşınızın elindeki CV’yi tek tıkla modern, hızlı, SEO-dostu bir kişisel websiteye dönüştüren; GitHub Copilot ile üretimi hızlandıran, scalable ve bakım maliyeti düşük bir uygulama kurgulamak.

---

## 1) Ürün Hedefleri & Kapsam

* *Hedef:* CV (PDF/DOCX/JSON) → otomatik şablon + bileşenlerle website (SSR/SSG) üretimi
* *Ziyaretçi ihtiyaçları:* Hakkımda, Deneyim, Projeler, Eğitim, Yetenekler, Sertifikalar, İletişim
* *Özellikler (MVP):*

  * CV içeriğinin JSON/Markdown’a dönüşmesi ve versiyonlanması
  * Tema (light/dark), renk paleti ve tipografi değiştirilebilmesi
  * Çoklu dil (opsiyonel)
  * SEO/OG tag’leri, site haritası
  * Proje ve blog sayfaları (opsiyonel)
  * İletişim formu (SMTP ya da 3. partı servis)
* *Non-Functional:* Lighthouse 90+, WCAG AA, cold start <200ms (edge), build <5dk, basit CI/CD

---

## 2) Mimari Tasarım

*Seçenek A — SSG (Önerilir):* Next.js (App Router) + MDX/JSON içerik. Vercel/Netlify’de edge cache ile global dağıtım.
*Seçenek B — SSR:* Eğer dinamik içerik ve formlar artarsa SSR/ISR karışık kullanılabilir.

*Yüksek Seviye:*

* *Input Katmanı:* CV parser (local script) → resume.json (standart şema)
* *İçerik Katmanı:* /content altında Markdown/MDX veya /data altında JSON
* *Sunum Katmanı:* Next.js + Tailwind + shadcn/ui bileşenleri
* *Dağıtım:* Vercel (Preview + Production), domain bağlama
* *Gözlemleme:* Vercel Analytics / Plausible / GA4

---

## 3) Teknoloji Yığını

* *Frontend:* Next.js (>=14 App Router), React Server Components, ISR
* *Stil:* TailwindCSS, shadcn/ui, lucide-react ikonlar
* *İçerik:* MDX (blog/proje), JSON (CV çekirdeği)
* *Form:* Route Handler (Next.js) + Resend/SendGrid (mail), alternatif Formspree
* *SEO:* next-seo, otomatik sitemap ve robots.txt
* *Analitik:* Plausible (cookie-free) veya GA4
* *Test:* Playwright (E2E), Jest/RTL (bileşen)
* *CI/CD:* GitHub Actions + Vercel otomatik preview

---

## 4) Veri Modeli (resume.json Öneri Şeması)

json
{
  "basics": {
    "name": "Ad Soyad",
    "label": "Data Analyst",
    "email": "ornek@mail.com",
    "phone": "+90...",
    "location": {"city": "İstanbul", "country": "TR"},
    "summary": "1-2 paragraflık özet",
    "profiles": [
      {"network": "GitHub", "username": "kullanici", "url": "https://github.com/kullanici"},
      {"network": "LinkedIn", "url": "https://linkedin.com/in/..."}
    ]
  },
  "skills": [
    {"name": "Python", "level": "advanced", "keywords": ["pandas","sklearn"]}
  ],
  "work": [
    {
      "name": "Şirket",
      "position": "Unvan",
      "startDate": "2023-01",
      "endDate": "2025-08",
      "summary": "Rolün özeti",
      "highlights": ["%20 büyüme", "A/B test"]
    }
  ],
  "education": [
    {"institution": "Üniversite", "area": "Endüstri Müh.", "studyType": "Lisans", "startDate": "2018-09", "endDate": "2022-06"}
  ],
  "projects": [
    {
      "name": "AI Dubbing",
      "description": "WhisperX + Bark…",
      "url": "https://...",
      "keywords": ["RAG","TTS"],
      "highlights": ["Çok dilli", "Docker"]
    }
  ],
  "certificates": [{"name": "Google Data Analytics", "date": "2024-05"}]
}


> Not: JSON Resume standardıyla uyumlu kalmak ileride entegrasyonları kolaylaştırır.

---

## 5) Repo Yapısı


cv-to-site/
├─ app/                # Next.js App Router
│  ├─ (site)/
│  │  ├─ page.tsx     # Ana sayfa (özelleştirilebilir layout)
│  │  ├─ about/
│  │  │  └─ page.tsx
│  │  ├─ projects/
│  │  │  └─ page.tsx
│  │  ├─ contact/
│  │  │  └─ route.ts  # POST handler (mail gönderimi)
│  │  └─ sitemap.ts   # otomatik sitemap
│  └─ api/            # gerekiyorsa ek API
├─ components/
│  ├─ ResumeHeader.tsx
│  ├─ ExperienceList.tsx
│  ├─ ProjectCard.tsx
│  ├─ SkillPills.tsx
│  └─ ThemeToggle.tsx
├─ content/           # MDX blog/proje detayları
├─ data/
│  └─ resume.json     # parser çıktısı / manuel düzen
├─ lib/
│  ├─ resume.ts       # tipler + veri yükleme
│  └─ seo.ts          # dynamic metadata
├─ styles/
│  └─ globals.css
├─ public/
│  ├─ avatar.jpg
│  └─ og.png
├─ scripts/
│  └─ parse_cv.py     # PDF/DOCX → resume.json
├─ tests/             # jest + playwright
├─ next.config.mjs
├─ package.json
└─ README.md


---

## 6) Geliştirme Akışı

1. *CV’yi normalize et:* scripts/parse_cv.py ile PDF/DOCX’ten JSON’a çevir.

   * Python lib’leri: pdfplumber, docx, spacy (isteğe bağlı NER)
   * Kategori/alan eşlemesi: başlık anahtar kelimeleri (Deneyim, Eğitim, Proje…)
2. *Veriyi doğrula:* JSON schema ile zorunlu alan kontrolü (name, summary, work\[] vb.)
3. *Bileşenleri üret:* Next.js bileşenlerini atomic tasarımla kur; Copilot prompt’ları ile hızlan.
4. *Tema/Branding:* Tailwind token’ları (renk, font, spacing) + ThemeToggle ile dark mode.
5. *SEO & Meta:* lib/seo.ts dinamik metadata (title, description, OG)
6. *İletişim formu:* /contact/route.ts POST → Resend/SendGrid
7. *Analytics:* Plausible script, olay (event) takibi (CV indir, e-posta tıklama)
8. *Test:*

   * Jest: ProjectCard, ExperienceList render ve veri tip testleri
   * Playwright: smoke test (ana sayfa, projeler, iletişim formu)
9. *CI/CD:*

   * PR’da lint/test
   * Vercel Preview URL
   * main merge → Production deploy

---

## 7) Copilot Kullanım Stratejisi

*Prompt Kalıpları*

* Bileşen: “Create a TypeScript React component named ExperienceList that receives work: WorkItem[] and renders timeline with company, role, dates, and highlights. Use Tailwind and accessible markup.”
* Tipler: “Infer TypeScript types from resume.json and export WorkItem, ProjectItem, Skill.”
* SEO: “Write a generateMetadata helper for Next.js that builds OG tags from resume basics.”
* Test: “Generate Jest tests for ProjectCard covering empty highlights and external links with rel="noopener".”
* Parse: “Write a Python function that extracts sections from a Turkish CV PDF and maps them to JSON Resume fields.”

*Best Practices*

* Copilot’a *bağlama* verin (açık tipler, TODO yorumları, örnek JSON)
* Kısa, tek görevli promptlar; PR review’da açıklama isteme
* Copilot Chat ile refactor istekleri: “split into smaller components”, “add ARIA roles”

---

## 8) UI/UX İlkeleri

* *Hero*: isim, rol, kısa özet, CTA (CV indir / iletişim)
* *Experience Timeline*: kronolojik, rolde etki metrikleri (%/x kat)
* *Skills*: kategori bazlı (Dil, Framework, Araç), görsel yoğunluk düşük
* *Projects*: kartlar (etiketler, repo/demo linkleri)
* *Contact*: basit form, spam koruması (Honeypot/Turnstile)
* *A11y*: kontrast, odak halkaları, semantic HTML, skip-to-content linki

---

## 9) Güvenlik & Gizlilik

* Form endpoint rate-limit (middleware) ve CSRF koruması
* E-posta/telefonu “mailto”/masking
* Gizlilik politikası sayfası
* 3. parti scriptlerini minimumda tut (CSP başlıkları)

---

## 10) Performans & Ölçüm

* ISR ile projeler/blog için hızlı güncelleme
* Resim optimizasyonu (next/image), font display swap
* Lighthouse hedefleri: Perf 90+, SEO 90+, Best Practices 90+, A11y 90+
* Ölçüm: sayfa görüntüleme, CTA tıklamaları, form submit oranı

---

## 11) Dağıtım & Ortam Değişkenleri

* *Ortam:* RESEND_API_KEY, SITE_URL, ANALYTICS_DOMAIN
* *Vercel:* otomatik preview, custom domain, edge runtime (ops.)
* *Netlify/Pages:* alternatif olarak kolay adaptasyon

---

## 12) Yol Haritası

*MVP (1-2 gün):*

* JSON şema → temel bileşenler → tek dil → tema → SEO → form (Formspree)

*v1.1:*

* Blog/Projects MDX, OG image automation, Plausible

*v1.2:*

* Çoklu dil (i18n), dinamik tema preset’leri, PDF export (server-side)

*v1.3:*

* Git-based CMS (Tina/Contentlayer), formda dosya ekleri

---

## 13) Başlangıç Görevleri (Issue List)

* [ ] JSON Schema tasarla ve örnek resume.json ekle
* [ ] lib/resume.ts tipleri ve loader yaz
* [ ] ExperienceList, ProjectCard, SkillPills, ResumeHeader üret
* [ ] ThemeToggle + temel layout
* [ ] generateMetadata ve sitemap.ts
* [ ] contact/route.ts ve basit e-posta entegrasyonu
* [ ] Playwright smoke test, Jest component testleri
* [ ] Vercel deploy ve domain

---

## 14) Riskler & Alternatifler

* *CV parse hataları:* Başlangıçta manuel resume.json düzenleme seçeneği.
* *Aşırı dinamik ihtiyaç:* ISR/SSR hibrit mimari.
* *Bakım:* İçeriği Git’te tut; CMS’e geçiş opsiyonu açık kalsın.

---

## 15) Başarı Kriterleri

* 1 commit → otomatik preview linki
* 30 dk içinde ilk deploy
* Lighthouse >90 (mobile/desktop)
* JSON güncelle → site 1 dk içinde güncellensin (ISR)

---
