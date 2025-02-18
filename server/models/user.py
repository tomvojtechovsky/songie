# server\models\user.py
from beanie import Document
from datetime import datetime, timezone
from typing import Optional
from pydantic import Field
import secrets

class User(Document):
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    auth_type: str = "local"
    provider_id: Optional[str] = None
    password_hash: Optional[str] = None
    is_verified: bool = False
    verification_token: Optional[str] = None
    verification_token_expires: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    @staticmethod
    def generate_verification_token() -> str:
        """Generuje náhodný verifikační token"""
        return secrets.token_urlsafe(32)

    class Settings:
        name = "users"