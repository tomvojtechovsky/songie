# server\db\database.py
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from core.config import config
from models.user import User
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    
    async def connect_to_database(self):
        """Vytvoří připojení k MongoDB a inicializuje Beanie"""
        try:
            self.client = AsyncIOMotorClient(config.MONGODB_URL)
            
            # Inicializace Beanie s naším User modelem
            await init_beanie(
                database=self.client[config.MONGODB_DB_NAME],
                document_models=[User]  # explicitně přidáme User model
            )
            
            logger.info(f"Connected to MongoDB at {config.MONGODB_URL} and initialized Beanie")
            logger.info(f"Using database: {config.MONGODB_DB_NAME}")
            
        except Exception as e:
            logger.error(f"Could not connect to MongoDB: {e}")
            raise e

    def close_database_connection(self):
        """Uzavře připojení k MongoDB"""
        try:
            self.client.close()
            logger.info("MongoDB connection closed.")
        except Exception as e:
            logger.error(f"Could not close MongoDB connection: {e}")
            raise e

# Vytvoříme instanci
db = Database()