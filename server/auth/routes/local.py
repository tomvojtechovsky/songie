from fastapi import APIRouter, Request, HTTPException
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from ..controllers.local import register_new_user, login_user
from ..controllers.verification import verify_email
from ..schemas import RegistrationData, LoginData
from ..schemas import ChangePasswordData
from ..controllers.local import update_password
from ..decorators import require_auth
from models.user import User
from core.config import config
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class ChangePasswordData(BaseModel):
    current_password: str
    new_password: str

@router.post("/register")
async def register(data: RegistrationData):
    try:
        user = await register_new_user(data)
        return {
            "status": "success",
            "message": "Registration successful. Please verify your email.",
            "email": user.email
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(request: Request, login_data: LoginData):  # změna na LoginData
    """Přihlášení pomocí emailu a hesla"""
    try:
        user = await login_user(request, login_data)
        return {"status": "success", "message": "Login successful"}
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    
@router.get("/verify/{token}")
async def verify_email_endpoint(token: str):
    """Verifikace emailu pomocí tokenu"""
    try:
        user = await verify_email(token)
        return {
            "status": "success",
            "message": "Email verified successfully",
            "email": user.email
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/verify-dev/{email}")
async def verify_dev_endpoint(email: str):
    """DEV ONLY: Přímá verifikace emailu"""
    if not config.IS_DEV:
        raise HTTPException(status_code=404)
        
    user = await User.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.is_verified = True
    await user.save()
    
    return {
        "status": "success",
        "message": "Email verified successfully (DEV MODE)",
        "email": user.email
    }

@router.post("/change-password")
@require_auth  # potřebujeme být přihlášení
async def change_password(request: Request, data: ChangePasswordData):
    try:
        await update_password(request.session['user']['email'], data)
        return {
            "status": "success",
            "message": "Password changed successfully"
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))