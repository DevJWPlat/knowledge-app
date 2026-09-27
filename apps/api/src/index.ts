import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { healthRoutes } from './routes/health'
import type { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.route('/api/health', healthRoutes)

app.notFound((c) => c.json({ error: 'Not found' }, 404))

export default app
