from alembic import op
import sqlalchemy as sa

# Revision identifiers
revision = "202509271200"
down_revision = None   # update to last migration id
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        "readiness_scores",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("company_id", sa.Integer, sa.ForeignKey("companies.id"), nullable=False),
        sa.Column("tender_id", sa.Integer, sa.ForeignKey("tenders.id"), nullable=False),
        sa.Column("budget_score", sa.Float, nullable=False),
        sa.Column("compliance_score", sa.Float, nullable=False),
        sa.Column("location_score", sa.Float, nullable=False),
        sa.Column("experience_score", sa.Float, nullable=False),
        sa.Column("capacity_score", sa.Float, nullable=False),
        sa.Column("total_score", sa.Float, nullable=False),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now(), nullable=False),
    )

def downgrade() -> None:
    op.drop_table("readiness_scores")
