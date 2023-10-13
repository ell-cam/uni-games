import psycopg2

# Replace these with your actual database credentials
DB_NAME = 'your_database_name'
DB_USER = 'your_username'
DB_PASSWORD = 'your_password'
DB_HOST = 'your_database_host'

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST)
