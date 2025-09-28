"""create readiness_scores table

Revision ID: 7bec77a64f4b
Revises: f82ec0385563
Create Date: 2025-09-27 22:36:16.967971

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7bec77a64f4b'
down_revision: Union[str, Sequence[str], None] = 'f82ec0385563'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
