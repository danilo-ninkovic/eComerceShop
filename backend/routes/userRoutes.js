import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js' //za validaciju(decoded) token-a prilikom  getUserProfile

//('/') je /api/users
router.route('/').post(registerUser)
router.post('/login', authUser) //ovo ide u server.js kao i ostali routeri
//prvo validacija tokena pa user profile
router
  .route('/profile') // ovo je /api/users/profile
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
