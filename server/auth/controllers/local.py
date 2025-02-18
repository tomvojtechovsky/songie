from models.user import User
from ..security import hash_password, verify_password
from .verification import create_verification_data
from core.config import config
import logging
from ..schemas import RegistrationData 
from ..schemas import ChangePasswordData
from datetime import datetime, timedelta
from fastapi import Request

logger = logging.getLogger(__name__)

async def register_new_user(data: RegistrationData):
    """Registrace nového uživatele"""
    # Kontrola, zda email již neexistuje
    if await User.find_one({"email": data.email}):
        raise ValueError("Email already registered")
    
    # Vytvoření verifikačních dat
    verification_data = await create_verification_data()
    
    # Vytvoření nového uživatele
    user = User(
        email=data.email,
        password_hash=hash_password(data.password),
        auth_type="local",
        is_verified=False,
        verification_token=verification_data["verification_token"],
        verification_token_expires=verification_data["verification_token_expires"]
    )
    await user.save()
    
    logger.info(f"New local user registered: {user.email}")
    if config.IS_DEV:
        logger.info(f"DEV MODE - Verification URL: /auth/verify/{user.verification_token}")
    
    return user

async def login_user(request: Request, login_data):
    """Přihlášení uživatele"""
    user = await User.find_one({"email": login_data.email})
    if not user:
        raise ValueError("Invalid email or password")
    
    if not user.password_hash:
        raise ValueError("This account uses social login")
        
    if not verify_password(login_data.password, user.password_hash):
        raise ValueError("Invalid email or password")
        
    if not user.is_verified:
        raise ValueError("Email not verified")

    # Nastavení session
    request.session['user'] = {
        'email': user.email,
        'auth_type': user.auth_type,
        'logged_in_at': datetime.utcnow().isoformat()
    }
    
    return user

async def create_verification_data():
    """Vytvoří verifikační token a expiraci"""
    return {
        "verification_token": User.generate_verification_token(),
        "verification_token_expires": datetime.utcnow() + timedelta(hours=24)
    }

async def verify_email(token: str):
    """Verifikuje email pomocí tokenu"""
    user = await User.find_one({
        "verification_token": token,
        "verification_token_expires": {"$gt": datetime.utcnow()}
    })
    
    if not user:
        raise ValueError("Invalid or expired verification token")
    
    user.is_verified = True
    user.verification_token = None
    user.verification_token_expires = None
    await user.save()
    
    logger.info(f"Email verified for user: {user.email}")
    return user

async def update_password(email: str, data: ChangePasswordData):
    user = await User.find_one({"email": email})
    if not user:
        raise ValueError("User not found")
    
    # Ověření starého hesla
    if not verify_password(data.current_password, user.password_hash):
        raise ValueError("Current password is incorrect")
    
    # Nastavení nového hesla
    user.password_hash = hash_password(data.new_password)
    await user.save()