import express from 'express'
const router = express.Router()
import {
  getProducts, //poziva [] svih produkata
  getProductById, //poziva  produkt {}  po id-u
} from '../controllers/productControllerr.js'

//-------SVE FUNKCIONALNOSTI vezano za DB , su u "productController.js"--------

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
