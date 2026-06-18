# ambarish-khot-portfolio

## Database setup

This app uses a server-side PostgreSQL connection through `DATABASE_URL`.

1. Create a PostgreSQL database.
2. Run `db/schema.sql` on that database once.
3. Add this environment variable in Vercel:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

For a local Postgres database without SSL, add `POSTGRES_SSL=false`.
