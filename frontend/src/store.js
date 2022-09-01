import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' // koristi middleware za redux dew-tool u browser-ui
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers' //funkcionalnosti za product
import { cartReducer } from './reducers/cartReducers' // reducer za "cart"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers' // reducer za "User-e"

// u reducer-u su funkcionalnosti
const reducer = combineReducers({
  //puni se stateom iz reducer-a
  productList: productListReducer, //state = { products: [] }
  productDetails: productDetailsReducer, //  state = { product: { reviews: [] } },
  cart: cartReducer, // state = { cartItems: [] },
  userLogin: userLoginReducer, //state = {}
  userRegister: userRegisterReducer, //state = {}
  userDetails: userDetailsReducer, //state = user {}
  userUpdateProfile: userUpdateProfileReducer, //state = {}
})
// ako u localStoregeu postoji cartItems onda če ga uzeti kao JS objekat a ako ga nema posatavit će []
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

//ako u localStorage-u postoji userInfo objekat
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null //ako nema ništa pošto bi trebao biti objekat

//initial state je početni  state za neki od glob state-ova prilikom početnog loading-a
const initialState = {
  cart: { cartItems: cartItemsFromStorage }, //iz localStorage-a
  userLogin: { userInfo: userInfoFromStorage }, //za userLogin state userInfo je iz localstorage-a
}
//middleware i thunk služe za upotrebu redux dew-tool-a u browser-u
const middleware = [thunk]
const store = createStore(
  reducer, //svi reduceri
  initialState, //početni state pri loudovanju
  composeWithDevTools(applyMiddleware(...middleware)) // ovo je za redux dew-tool
)

export default store
