# controllers/google.py
from models.user import User
from datetime import datetime, timezone
from fastapi.responses import RedirectResponse
from core.config import config
from auth.providers import oauth  # přidáme import oauth
import logging

logger = logging.getLogger(__name__)

def set_user_session(request, user):
    """Nastaví user data do session"""
    request.session['user'] = {
        'email': user.email,
        'auth_type': user.auth_type,
        'logged_in_at': datetime.now(timezone.utc).isoformat()
    }

async def update_google_user(user, userinfo):
    """Aktualizuje existujícího uživatele"""
    user.updated_at = datetime.now(timezone.utc).isoformat()
    await user.save()
    logger.info(f"Updated existing user: {user.email}")
    return user

async def create_google_user(userinfo):
    """Vytvoří nového Google uživatele"""
    user = User(
        email=userinfo['email'],
        auth_type="google",
        provider_id=userinfo['sub'],
        is_verified=True
    )
    await user.save()
    logger.info(f"Created new user: {user.email}")
    return user

async def handle_google_callback(request):
    try:
        token = await oauth.google.authorize_access_token(request)
        userinfo = token['userinfo']
        
        user = await find_or_create_google_user(userinfo)
        set_user_session(request, user)
        
        return RedirectResponse(url=config.FRONTEND_URL)
    except Exception as e:
        logger.error(f"Callback error: {str(e)}")
        logger.exception(e)
        return {"error": str(e)}

async def find_or_create_google_user(userinfo):
    user = await User.find_one({"email": userinfo['email']})
    if user:
        return await update_google_user(user, userinfo)
    return await create_google_user(userinfo)