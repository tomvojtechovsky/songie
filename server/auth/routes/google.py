from fastapi import APIRouter, Request
from ..controllers.google import handle_google_callback
from auth.providers import oauth
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/login")
async def google_login(request: Request):
    logger.info("Google login endpoint called")
    try:
        redirect_uri = request.url_for('google_auth')
        return await oauth.google.authorize_redirect(request, redirect_uri)
    except Exception as e:
        logger.error(f"OAuth error: {str(e)}")
        return {"error": str(e)}

@router.get("/callback", name="google_auth")
async def google_auth(request: Request):
    return await handle_google_callback(request)