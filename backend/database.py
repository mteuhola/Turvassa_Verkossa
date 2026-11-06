import os
from uuid import UUID

import psycopg


def save_feedback(visitor_uuid: UUID, feedback: str) -> None:
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not configured")

    # The context commits on success and rolls back on error.
    with psycopg.connect(database_url, connect_timeout=5) as connection:
        connection.execute("SET LOCAL statement_timeout = '5s'")
        connection.execute(
            "INSERT INTO public.feedback (visitor_uuid, feedback) VALUES (%s, %s)",
            (visitor_uuid, feedback),
        )
