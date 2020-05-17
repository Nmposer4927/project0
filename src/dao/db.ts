import { Pool } from 'pg';

export const db = new Pool({
    database: 'project0',
    host: process.env.NODE_APP_URL,
    port: 5432,
    user: process.env.NODE_APP_ROLE,
    password: process.env.NODE_APP_PASS
});

