from functools import wraps
from fastapi import HTTPException, Request

def require_auth(func):
    @wraps(func)
    async def wrapper(request: Request, *args, **kwargs):
        if 'user' not in request.session:
            raise HTTPException(status_code=401, detail="Authentication required")
        return await func(request, *args, **kwargs)
    return wrapper