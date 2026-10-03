import 'dotenv/config'
import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(express.static("public"))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})