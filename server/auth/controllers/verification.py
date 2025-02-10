from datetime import datetime, timedelta
from models.user import User
from core.config import config
import logging

logger = logging.getLogger(__name__)

async def create_verification_data():
    """Vytvoří verifikační token a expiraci"""
    return {
        "verification_token": User.generate_verification_token(),  # voláme statickou metodu
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