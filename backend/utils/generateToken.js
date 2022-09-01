import jwt from 'jsonwebtoken'
//funkcija za generisanje token-a za User-a
//bit će pozvana u userController.js pri autentifikaciji usera
//da generiše token za logovanog usera sa _id-om u njemu
//u frontendu taj token će biti sačuvan u localStorage
//zatim će u authMidlleware.js priliko request-a(/api/users/profile) ,biti uzet iz req.headers.authorization  i decoded (izvučen id) pa onda
//req.user = await User.findById(decoded.id).select('-password') //sad se može pronaći user preko tog id-a- a req.user se koristi u getUserProfile
const generateToken = (id) => {
  //token će za generisanje uzeti "id" ,"JWT_SECRET" i  nestati za 30 dana(expiresIn)-treći argument je opciono
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
//potrebno restartovati pošto smo dodati .env varijablu
