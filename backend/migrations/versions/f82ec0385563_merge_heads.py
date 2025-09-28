"""merge heads

Revision ID: f82ec0385563
Revises: 5a1880226054, 202509271200
Create Date: 2025-09-27 22:35:54.395026

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f82ec0385563'
down_revision: Union[str, Sequence[str], None] = ('5a1880226054', '202509271200')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
