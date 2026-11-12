import os
import psycopg

DATABASE_URL = os.environ["DATABASE_URL"]

def test_connection():
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT 1;")
                result = cursor.fetchone()

        print(f"Database connection successful: {result}")

    except psycopg.Error as error:
        print(f"Database connection failed: {error}")
        raise

if __name__ == "__main__":
    test_connection()
