from fastapi import APIRouter, Request
from auth.utils import require_auth, get_current_user, clear_session, update_session_activity

import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/me")
@require_auth
async def get_user_info(request: Request):
    """Získá informace o přihlášeném uživateli"""
    logger.info(f"ME endpoint called. Session content: {dict(request.session)}")
    update_session_activity(request)
    return get_current_user(request)

@router.post("/logout")
@require_auth
async def logout(request: Request):
    """Odhlásí uživatele"""
    try:
        user_email = request.session.get('user', {}).get('email', 'unknown')
        clear_session(request)
        logger.info(f"User {user_email} successfully logged out")
        return {
            "status": "success",
            "message": "Successfully logged out"
        }
    except Exception as e:
        logger.error(f"Error during logout: {str(e)}")
        return {
            "status": "error",
            "message": "Error during logout"
        }