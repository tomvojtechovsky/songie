# Sonie – MusicXML Generator & Player

Songie je aplikace pro generování a přehrávání hudby ve formátu MusicXML. Umožňuje kreativní tvorbu hudebních partitur, jejich úpravu a export v jednom přehledném prostředí.  
Cílem aplikace je usnadnit proces kompozice a poskytovat moderní nástroje pro hudebníky i skladatele.

## Klíčové funkce
- Generování a export do MusicXML.
- Možnost přehrávání vytvořené hudby.
- Editace a úpravy partitur.
- Uživatelsky přívětivé rozhraní pro rychlou práci s notami.

## Technologie
- React / JavaScript (frontend)
- Node.js (backend)
- Tailwind CSS (styly)
- MusicXML jako výstupní formát

## Instalace a spuštění
### **Krok 1: Aktivace virtuálního prostředí a spuštění serveru**
1. Otevři PowerShell a přejdi do složky `server`:

cd path\to\project\songie\server

2 Aktivuj virtuální prostředí:
venv\Scripts\activate

3. Spusť server:
uvicorn main:app --reload

Server poběží na adrese: http://127.0.0.1:8000


cd path\to\project\songie\client
npm run dev
Klient poběží na adrese: http://127.0.0.1:5173

### **Krok 2: Spuštění klienta**
1. Otevři nový PowerShell tab a přejdi do složky client:
2. cd path\to\project\songie\client
3. npm run dev
