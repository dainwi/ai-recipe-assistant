import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { title, ingredients, instructions } = await request.json();

  try {
    const result = await pool.query(
      'INSERT INTO recipes (recipe_title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
      [title, ingredients, instructions]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to insert recipe' }, { status: 500 });
  }
}
