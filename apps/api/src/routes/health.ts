import { Hono } from 'hono'
import type { Bindings } from '../types'

export const healthRoutes = new Hono<{ Bindings: Bindings }>()

healthRoutes.get('/', async (c) => {
  const database = await c.env.DB.prepare('SELECT 1 AS ok').first<{ ok: number }>()

  return c.json({
    ok: true,
    service: 'knowledge-app-api',
    database: database?.ok === 1 ? 'connected' : 'unknown',
  })
})
