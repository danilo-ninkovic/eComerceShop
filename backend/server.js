import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js' //custom error handling za req,res ciklus
import colors from 'colors' // za bojenje obavijesti log-a
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js '
import userRoutes from './routes/userRoutes.js '

dotenv.config() //.env fajl u kom secrets-i u process.env
connectDB() // da poveže sa mongo atlas bazom
const app = express() //definisanje app kao express

app.use(express.json()) //pomoću ovog middleware-a se u app uzimaju podaci iz body-a (kao body-parser)

app.get('/', (req, res) => {
  res.send('API je u funkciji')
})
//svaki url "/api/products" će biti linkovan u productRoutes kao "/"
app.use('/api/products', productRoutes) // app koristi middleware  fajl productRoutes gdje je "/" u stvari "/api/products"
app.use('/api/users', userRoutes)

//error middleware funkcije
app.use(notFound) //ako nam je url nesto sto nije definisano
app.use(errorHandler) //ako tražimo pogrešno

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
)
