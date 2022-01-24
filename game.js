import express from 'express'
const app = express()

app.get('/', (r, e) => e.end('e'))

//app.listen(3000, console.log('Ludicrous Games Running at https://localhost:3000'))

export default function() {app.listen(3000, console.log('Ludicrous Games Running at https://localhost:3000'))}