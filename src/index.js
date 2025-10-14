import "./db/conexion.js"
import app from "./app.js"

const PORT = process.env.PUERTO || 3400
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`))
