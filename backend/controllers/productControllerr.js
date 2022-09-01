import asyncHandler from 'express-async-handler' // umjesto try-catch za async funkcije
import Product from '../models/productModel.js'

//Fetch all products - GET /api/products - public acces
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}) //sve u Product kolekciji

  res.json(products)
})

//Fetch single product by id - GET /api/products/:id - public acces
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id) //id iz url-a
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found') // iz middleware/errorMiddleware.js
  }
})

export { getProducts, getProductById }
