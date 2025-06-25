// app/find-gpu/page.tsx
import GPUComparisonTable from './GPUComparisonTable'
import AnimatedBackground from './AnimatedBackground';
import { Pool } from 'pg'

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
})


// Re-validate this page every 12 hours:
export const revalidate = 43200

export default async function FindGpuPage() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  })

  const client = await pool.connect()
  const { rows: gpus } = await client.query<{
    id: number
    type: string
    provider: string
    region: string
    price: number
    carbonIntensity: number
    efficiency: 'high' | 'medium' | 'low'
  }>(`
    SELECT
      id,
      type,
      provider,
      region,
      price,
      carbon_intensity AS "carbonIntensity",
      efficiency
    FROM gpus
  `)
  client.release()

  return (
    <AnimatedBackground>
      <GPUComparisonTable gpus={gpus} />
    </AnimatedBackground>
  );
}
