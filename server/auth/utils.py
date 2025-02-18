from functools import wraps
from fastapi import Request, HTTPException
from datetime import datetime, timezone, timedelta

import logging

logger = logging.getLogger(__name__)

def is_user_logged_in(request: Request) -> bool:
    """
    Kontroluje, zda je uživatel přihlášen.
    """
    logged_in = 'user' in request.session
    logger.info(f"Checking login status. Session exists: {logged_in}")
    logger.info(f"Current session content: {dict(request.session)}")
    return logged_in

def get_current_user(request: Request) -> dict:
    """
    Získá informace o přihlášeném uživateli ze session.
    
    Args:
        request: FastAPI Request objekt
    
    Returns:
        dict: Slovník s informacemi o uživateli
    
    Raises:
        HTTPException: Pokud uživatel není přihlášen
    """
    if not is_user_logged_in(request):
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )
    return request.session['user']

from datetime import datetime, timezone, timedelta

def check_session_expired(request):
    """Kontroluje, zda session nevypršela."""
    if not is_user_logged_in(request):
        return True
        
    # Převedeme string na datetime s časovou zónou
    logged_in_at = datetime.fromisoformat(request.session['user']['logged_in_at'])
    session_lifetime = timedelta(hours=24)
    
    # Explicitně použijeme UTC pro současný čas
    current_time = datetime.now(timezone.utc)
    
    # Pokud logged_in_at nemá timezone info, přidáme UTC
    if logged_in_at.tzinfo is None:
        logged_in_at = logged_in_at.replace(tzinfo=timezone.utc)
    
    return current_time - logged_in_at > session_lifetime

def require_auth(func):
    """
    Dekorátor pro ochranu endpointů - vyžaduje přihlášení.
    
    Použití:
        @router.get("/protected-route")
        @require_auth
        async def protected_endpoint(request: Request):
            return {"message": "Tento endpoint je chráněný"}
    """
    @wraps(func)
    async def wrapper(request: Request, *args, **kwargs):
        if not is_user_logged_in(request):
            logger.warning(f"Unauthorized access attempt to {request.url.path}")
            raise HTTPException(
                status_code=401,
                detail="Authentication required"
            )
            
        if check_session_expired(request):
            logger.info(f"Session expired for user {request.session['user'].get('email')}")
            request.session.clear()
            raise HTTPException(
                status_code=401,
                detail="Session expired"
            )
            
        return await func(request, *args, **kwargs)
    return wrapper

# Pomocné funkce pro práci s user session
def update_session_activity(request: Request):
    """
    Aktualizuje čas poslední aktivity v session.
    
    Args:
        request: FastAPI Request objekt
    """
    if is_user_logged_in(request):
        request.session['user']['last_activity'] = datetime.utcnow().isoformat()

def clear_session(request: Request):
    """
    Bezpečně vyčistí session data.
    
    Args:
        request: FastAPI Request objekt
    """
    try:
        request.session.clear()
        logger.info("Session successfully cleared")
    except Exception as e:
        logger.error(f"Error clearing session: {str(e)}")