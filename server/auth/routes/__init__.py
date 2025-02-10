from fastapi import APIRouter
from .google import router as google_router
from .common import router as common_router
from .local import router as local_router

router = APIRouter()
router.include_router(google_router, prefix="/auth/google")
router.include_router(common_router, prefix="/auth")
router.include_router(local_router, prefix="/auth")