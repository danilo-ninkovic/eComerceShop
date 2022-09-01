import asyncHandler from 'express-async-handler' // umjesto try-catch za async funkcije
import generateToken from '../utils/generateToken.js' //funkcija za generisanje tokena preko id-a
import User from '../models/userModel.js' // User model

//Auth user & get token - POST /api/users/login - public acces
/** u ovoj funkciji šaljemo email i password u body-u
 * ako u bazi postoji User sa unesenim mailom i ako se password podudara sa onim u bazi
 * u res.json će u payload  poslati navedene podatke kao i generisati "token" za tog User-a
 * taj token ćemo uzeti za pristup protected rout-u GET /api/users/profile
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  //ako postoji user prema "email-u" i ako se podudara password sa onim u bazi
  if (user && (await user.matchPassword(password))) {
    //matchPassword je medhod u userSchemi
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), //generisat će token sa _id-om
    })
  } else {
    res.status(404)
    throw new Error('User nije pronadjen ili ne odgovara password') // iz middleware/errorMiddleware.js
  }
})

//Registracija novog User-a - POST /api/users - public acces
/** URL /api/users
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body //unesni u frontendu

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User već postoji')
  }
  // a ako ne postoji userExist, kreiramo novog Usera, prema unesenim podacima u body-u
  const user = await User.create({
    name,
    email,
    password, //bit će kriptovan u userSchemi pomoću middleware metode
  })
  //ako je sve OK i user kreiran, vratit će u frontend njegove podatke i generisati mu token (password ne vraćamo ali je sačuvan u DB)
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('ne ispravni podaci za User-a')
  }
})

//get User profile - GET /api/users/profile - private acces
/**
 * * u userRoutes prije ove funkcije je pozvana "protect" iz middlewarea
 * u middleware/authMiddleware.js će se izvršiti validacija "token-a" iz headers-a
 * to jest uzet će _id iz tokena da se koristi u ovoj funkciji preko User.findById(req.user._id)
 */
//router.route('/profile').get(protect, getUserProfile) - u userRoutes.js prvo poziva protect pa getUserProfile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //req.user je iz authMiddleware(protect)-- req.user = await User.findById(decoded.id).select('-password')

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User nije pronadjen')
  }
})

//Update User profile - PUT /api/users/profile - private acces
//za promjenu User-a
const updateUserProfile = asyncHandler(async (req, res) => {
  //prvo pronadjemo User-a preko id-a
  //req.user je iz authMiddleware(protect)-- req.user = await User.findById(decoded.id).select('-password')
  const user = await User.findById(req.user._id)
  //ako postoji User njegove parametre mijenjamo sa onim unešenim iz frontend forme
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      //ako je unešen password onda i njega mijenjamo
      user.password = req.body.password //bit će autom kriptovan u User modelu zahv. middleware funkciji
    }
    //taj "user je sačuvan kao udatedUser"
    const udatedUser = await user.save()
    // i u frontend vraća userInfo od updatedUser-a
    res.json({
      _id: udatedUser._id,
      name: udatedUser.name,
      email: udatedUser.email,
      isAdmin: udatedUser.isAdmin,
      token: generateToken(udatedUser._id), //generisat će token sa _id-om
    })
  } else {
    res.status(404)
    throw new Error('User nije pronadjen')
  }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }
