import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config() //spajanje sa secrets u .env
connectDB() //spajanje sa mongo atlas bazom

const importData = async () => {
  try {
    //prvo će očistiti bazu da bi unio svježe podatke
    await Order.deleteMany() //briše sve iz kolekcije
    await Product.deleteMany() //briše sve iz kolekcije
    await User.deleteMany() //briše sve iz kolekcije
    //usere iz data/users-js ubacuje u User kolekciju kao createdusers
    const createdUsers = await User.insertMany(users)
    console.log(createdUsers)

    const adminUser = createdUsers[0]._id //prvi element [0] u User kolekciji je user i uzima njegov _id

    //sada svakom productu u products[] dodaje adminUser-a kao user-a
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    //sada te sampleProducts postavlja kao Product - sa dodatim id od User-a
    await Product.insertMany(sampleProducts)

    console.log('Data imported!!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    //prvo će očistiti bazu da bi unio svježe podatke
    await Order.deleteMany() //briše sve iz kolekcije
    await Product.deleteMany() //briše sve iz kolekcije
    await User.deleteMany() //briše sve iz kolekcije

    console.log('Data Destoyed!!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
