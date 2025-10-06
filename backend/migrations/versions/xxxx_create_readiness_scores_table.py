from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "a1b2c3d4e5f6"
down_revision = "<previous_revision>"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "readiness_scores",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("company_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("tender_id", sa.String(), nullable=True),
        sa.Column("score_percent", sa.Float(), nullable=False),
        sa.Column("breakdown", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("tender_snapshot", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.Column("updated_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    # optional: add index on company_id for faster lookups
    op.create_index("ix_readiness_company_id", "readiness_scores", ["company_id"])


def downgrade():
    op.drop_index("ix_readiness_company_id", table_name="readiness_scores")
    op.drop_table("readiness_scores")