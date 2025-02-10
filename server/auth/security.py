from passlib.context import CryptContext
import logging

logger = logging.getLogger(__name__)

# Vytvoření password context pro hašování
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Zahašuje heslo pomocí bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Ověří heslo proti hashi"""
    return pwd_context.verify(plain_password, hashed_password)