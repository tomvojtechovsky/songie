# server\main.py

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from db.database import db
from auth.routes import router as auth_router
import logging
from core.config import config

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up...")
    await db.connect_to_database()  # Inicializace databáze
    try:
        await db.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        raise e

    yield  # Tady běží aplikace

    # Shutdown
    logger.info("Shutting down...")
    db.close_database_connection()

# Vytvoření FastAPI aplikace s lifespan managerem
app = FastAPI(lifespan=lifespan)  # Toto je klíčová změna

# CORS middleware MUSÍ být první!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Session middleware až po CORS
app.add_middleware(
    SessionMiddleware,
    secret_key=config.SESSION_SECRET,
    max_age=config.SESSION_LIFETIME,
    same_site='lax',
    https_only=False
)
# Připojení rout
app.include_router(auth_router)

# Výpis dostupných rout
for route in app.routes:
    logger.info(f"Route: {route.path}")
    
# Test endpoint
@app.get("/test")
def test():
    logger.info("Test endpoint called")
    return {"message": "Test works!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)