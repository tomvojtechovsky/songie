from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from auth.routes import router as auth_router
import logging
from core.config import config

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Vytvoření FastAPI aplikace
app = FastAPI()

# Middlewares
app.add_middleware(
    SessionMiddleware,
    secret_key=config.SESSION_SECRET,
    max_age=config.SESSION_LIFETIME,  # session vyprší po 24 hodinách
    same_site='lax',  # ochrana proti CSRF
    https_only=False  # pro development, v produkci True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Připojení rout
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Test endpoint
@app.get("/test")
def test():
    logger.info("Test endpoint called")
    return {"message": "Test works!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)