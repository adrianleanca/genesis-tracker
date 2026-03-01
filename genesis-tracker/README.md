# Genesis Commitment Tracker

Aplicatie PWA pentru urmarirea angajamentelor, cu autentificare Firebase, VIPAS Analysis, AI Pattern Analysis, recurenta si integrare Google Calendar.

---

## Deploy rapid (15 minute)

### PAS 1 — Instaleaza si testeaza local

```bash
cd genesis-tracker
npm install
npm start
```

### PAS 2 — Urca pe GitHub

```bash
git init
git add .
git commit -m "Genesis Tracker v1.0"
git branch -M main
git remote add origin https://github.com/USERNAME/genesis-tracker.git
git push -u origin main
```

### PAS 3 — Deploy pe Netlify

1. https://app.netlify.com > Add new site > Import from GitHub
2. Selecteaza repo-ul genesis-tracker
3. Build se configureaza automat din netlify.toml
4. Click Deploy site

### PAS 4 — Variabile de mediu (pentru AI)

Netlify > Site settings > Environment variables:
- `ANTHROPIC_API_KEY` = cheia ta de la https://console.anthropic.com

### PAS 5 — Firebase authorized domains

Firebase Console > Authentication > Settings > Authorized domains:
- Adauga domeniul Netlify (ex: random-name-123.netlify.app)

### PAS 6 — Securizeaza Firestore

Firebase Console > Firestore Database > Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Instalare ca aplicatie (PWA)

- Android: Chrome > Menu > Adauga pe ecranul principal
- Windows: Chrome/Edge > iconita install din bara adrese
- iPhone: Safari > Share > Adauga pe ecranul principal
