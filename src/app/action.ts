// app/actions.ts
"use server";


import { neon, neonConfig } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';

// Configure neonConfig for edge functions if needed
neonConfig.fetchConnectionCache = true;

// Create a connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getData() {
    try {
        // For single queries, you can use neon directly
        const sql = neon(process.env.DATABASE_URL!);
        const data = await sql`SELECT * FROM your_table`; // Replace with your query
        return data;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch data');
    }
}

// Alternative approach using connection pool
export async function getDataWithPool() {
    try {
        const { rows } = await pool.query('SELECT * FROM your_table');
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch data');
    }
}