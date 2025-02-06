# Songie – MusicXML Generator & Player
Songie je aplikace pro generování a přehrávání hudby ve formátu MusicXML. Umožňuje kreativní tvorbu hudebních partitur, jejich úpravu a export v jednom přehledném prostředí.
Cílem aplikace je usnadnit proces kompozice a poskytovat moderní nástroje pro hudebníky i skladatele.
## Klíčové funkce

Generování a export do MusicXML
Možnost přehrávání vytvořené hudby
Editace a úpravy partitur
Uživatelsky přívětivé rozhraní pro rychlou práci s notami
Přihlašování pomocí Google účtu

## Technologie
### Frontend

React
Tailwind CSS
Vite

### Backend

FastAPI (Python)
OAuth2 pro autentizaci
MusicXML jako výstupní formát

## Struktura projektu
```
songie/
├── .env            # Konfigurační soubor (CLIENT_ID, CLIENT_SECRET, ...)
├── client/         # React aplikace
└── server/         # FastAPI backend
├── auth/       # Autentizační logika
├── core/       # Základní konfigurace
└── main.py     # Hlavní aplikační soubor
```
## Instalace a spuštění
### Příprava

Naklonujte repozitář
Vytvořte soubor .env v root složce s následujícími proměnnými:
```
CLIENT_ID=váš_google_client_id
CLIENT_SECRET=váš_google_client_secret
```

### Backend (FastAPI)

Otevřete PowerShell a přejděte do složky server:
```powershell
cd path\to\project\songie\server
```
Aktivujte virtuální prostředí:
```powershell
venv\Scripts\activate
```
Nainstalujte závislosti:
```powershell
pip install fastapi uvicorn python-dotenv authlib httpx starlette itsdangerous
```
Spusťte server:
```powershell
uvicorn main:app --reload
```
Server běží na: http://127.0.0.1:8000

### Frontend (React)

Otevřete nový PowerShell a přejděte do složky client:
```powershell
cd path\to\project\songie\client
```
Nainstalujte závislosti:
```powershell
npm install
```
Spusťte vývojový server:
```powershell
npm run dev
```
Klient běží na: http://127.0.0.1:5173

## Řešení problémů
### Zamrzlý server
Pokud server nejde vypnout pomocí CTRL+C, použijte:
```powershell
taskkill /IM python.exe /F
```
### Dostupné endpointy

/auth/login/google - přihlášení přes Google
/auth/google/callback - callback po přihlášení
/auth/logout - odhlášení
/auth/me - info o přihlášeném uživateli
/test - testovací endpoint

## Vývoj

V produkci nastavit https_only=True pro SessionMiddleware
Session vyprší po 24 hodinách
Pro vývoj je CORS povoleno pro http://localhost:5173