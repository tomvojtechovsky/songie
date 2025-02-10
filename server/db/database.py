from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from core.config import config
from models.user import User
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    
    async def connect_to_database(self):
        """Vytvoří připojení k MongoDB"""
        try:
            self.client = AsyncIOMotorClient(config.MONGODB_URL)
            # Ujistíme se, že používáme správný název databáze
            logger.info(f"Using database: {config.MONGODB_DB_NAME}")
            await init_beanie(
                database=self.client[config.MONGODB_DB_NAME],
                document_models=[User]
            )
            logger.info("Connected to MongoDB and initialized Beanie.")
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