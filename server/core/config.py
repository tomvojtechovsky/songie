from pathlib import Path
import os
from dotenv import load_dotenv
import logging

# Nastavení loggeru
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Získání cesty k root adresáři projektu (o dvě úrovně výš než config.py)
ROOT_DIR = Path(__file__).parent.parent.parent

# Načtení .env souboru z root adresáře
env_path = ROOT_DIR / '.env'
if env_path.exists():
    logger.info(f"Loading .env from {env_path}")
    load_dotenv(env_path)
else:
    logger.warning(f".env file not found at {env_path}")

# Základní konfigurace
ENV = os.getenv("ENV", "development")
DEBUG = ENV == "development"

# Server konfigurace
SERVER_HOST = os.getenv("SERVER_HOST", "127.0.0.1")
SERVER_PORT = int(os.getenv("SERVER_PORT", "8000"))

# Delka session
SESSION_LIFETIME = 24 * 60 * 60  # 24 hodin v sekundách

# OAuth konfigurace
GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("CLIENT_SECRET")

# Frontend URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Session konfigurace
SESSION_SECRET = os.getenv("SESSION_SECRET", "your-super-secret-key")  # v produkci MUSÍ být v .env

# Kontrola povinných proměnných
def validate_config():
    required_vars = {
        "GOOGLE_CLIENT_ID": GOOGLE_CLIENT_ID,
        "GOOGLE_CLIENT_SECRET": GOOGLE_CLIENT_SECRET,
    }
    
    missing_vars = [var for var, value in required_vars.items() if not value]
    
    if missing_vars:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

# Zkontrolujeme konfiguraci při importu
try:
    validate_config()
except ValueError as e:
    logger.error(str(e))
    if ENV == "production":
        raise  # V produkci selže spuštění