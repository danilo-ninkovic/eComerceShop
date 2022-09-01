import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      //ako je user i admin
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // da bilježi datum kreiranja ili promjene
  }
)

//dodavanje metode matchPassword unutar userScheme za provjeru podudaranja passworda koji je unesen(enteredPassword)
//sa onim criptovanim u bazi this.password
//ova metoda se može pozvati bilo gdje (u userController.js je pozvana i enteredPassword tamo je password iz req.body-a)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//dodavanje metode za encript password-a automatski ovde u UserSchemi
/**prije nego ga sačuva-"save"
 * unesni pasword će encriptovati
 * //uneseni "string password će biti hashovan 10-tostrukim saltom "
 * ali to će biti učinjeno samo ako je password poslat,
 * tj ako User nije modifikovan,   npr ako se updejtuje User (modifikuje) onda neće dirati password
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //ako password nije modifikovan
    next() //pređi na slijedeće
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
