from fastapi import APIRouter, Request
from auth.providers import oauth
import logging

# Nastavení logování
logger = logging.getLogger(__name__)

# Vytvoření routeru
router = APIRouter()

@router.get("/login/google")
async def google_login(request: Request):
    logger.info("Google login endpoint called")
    try:
        redirect_uri = 'http://localhost:5173/auth/callback'
        logger.info(f"Starting OAuth flow with redirect_uri: {redirect_uri}")
        return await oauth.google.authorize_redirect(request, redirect_uri)
    except Exception as e:
        logger.error(f"OAuth error: {str(e)}")
        return {"error": str(e)}

@router.get("/google/callback")
async def google_auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get('userinfo')
        
        # Uložíme pouze potřebné informace do session
        request.session['user'] = {
            'email': user_info.get('email'),
            'logged_in_at': datetime.utcnow().isoformat()
        }
        
        return {"success": True, "email": user_info.get('email')}
    except Exception as e:
        logger.error(f"Callback error: {str(e)}")
        return {"error": str(e)}

# Můžeme přidat další endpointy pro práci s autentizací
@router.get("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Successfully logged out"}

@router.get("/me")
async def get_user(request: Request):
    user = request.session.get("user")
    if not user:
        return {"message": "Not logged in"}
    return user