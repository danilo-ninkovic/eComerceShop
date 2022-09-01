import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

/**uzet će token iz req.headers.authorization, izvršiti mu validaciju(decoded) da se može uzeti id iz tokena
 *  i preći dalje "next()" na getUserProfile */
//middleware funkcija
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1] //da uzme token bez onog Bearer ispred
      const decoded = jwt.verify(token, process.env.JWT_SECRET) //token je rasčlanjen da se može uzeti _id
      req.user = await User.findById(decoded.id).select('-password') //user pri HTTP request sada postaje taj User pronadjen preko tokenovog id-a
      next() //da izadje iz middlewarea-to mora
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Nema autorizacije, token ne ipsravan')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('nema autorizacije bez token-a')
  }
})

export { protect }
