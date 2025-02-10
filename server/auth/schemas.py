from pydantic import BaseModel, EmailStr

class RegistrationData(BaseModel):
    email: EmailStr
    password: str

class LoginData(BaseModel):
    email: EmailStr
    password: str


class ChangePasswordData(BaseModel):
    current_password: str
    new_password: str