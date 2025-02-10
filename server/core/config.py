from pathlib import Path
import os
from dotenv import load_dotenv
import logging

# Nastavení loggeru
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Získání cesty k root adresáři projektu
ROOT_DIR = Path(__file__).parent.parent.parent

# Načtení .env souboru z root adresáře
env_path = ROOT_DIR / ".env"
if env_path.exists():
    logger.info(f"Loading .env from {env_path}")
    load_dotenv(env_path)
else:
    logger.warning(f".env file not found at {env_path}")


class Config:
    # Přidáme MongoDB konfiguraci
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "songie_db")

    # Server konfigurace
    SERVER_HOST = os.getenv("SERVER_HOST", "127.0.0.1")
    SERVER_PORT = int(os.getenv("SERVER_PORT", "8000"))

    # OAuth konfigurace
    GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("CLIENT_SECRET")

    # Session konfigurace
    SESSION_SECRET = os.getenv("SESSION_SECRET", "your-super-secret-key")
    SESSION_LIFETIME = 24 * 60 * 60  # 24 hodin v sekundách

    # Frontend URL
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

    def validate(self):
        required_vars = {
            "GOOGLE_CLIENT_ID": self.GOOGLE_CLIENT_ID,
            "GOOGLE_CLIENT_SECRET": self.GOOGLE_CLIENT_SECRET,
        }

        missing_vars = [var for var, value in required_vars.items() if not value]

        if missing_vars:
            raise ValueError(
                f"Missing required environment variables: {', '.join(missing_vars)}"
            )

    # Detekce dev prostředí podle URL
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    IS_DEV = "localhost" in FRONTEND_URL

# Vytvoření instance konfigurace
config = Config()

# Validace při importu
try:
    config.validate()
except ValueError as e:
    logger.error(str(e))
    if os.getenv("ENV") == "production":
        raise

# Export konfigurace
__all__ = ["config"]
