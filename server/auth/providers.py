from authlib.integrations.starlette_client import OAuth
from core.config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
import logging

logger = logging.getLogger(__name__)

# Inicializace OAuth
oauth = OAuth()

# Konfigurace Google poskytovatele
oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

# Později můžeme přidat další poskytovatele, např.:
# oauth.register(
#     name='github',
#     client_id=GITHUB_CLIENT_ID,
#     client_secret=GITHUB_CLIENT_SECRET,
#     ...
# )

# Pomocné funkce pro práci s OAuth (můžeme přidat později)
def get_oauth_provider(provider_name: str):
    """Získá instanci OAuth poskytovatele podle jména"""
    return getattr(oauth, provider_name, None)

def is_valid_provider(provider_name: str) -> bool:
    """Zkontroluje, zda je poskytovatel podporován"""
    return provider_name in oauth._clients