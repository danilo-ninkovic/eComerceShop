import axios from 'axios' // da preko id-a dobijemo podatke za određeni produkt
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constans/cartConstans'

//id i qty ćemo dobiti iz komponente
export const addToCart = (id, qty) => async (dispatch, getState) => {
  //od redux store methods osim dispatch(action) uzimamo i getState() - da pokupimo nešto(cartItems) iz store state-a
  const { data } = await axios.get(`/api/products/${id}`) //get product iz backend-a da bi njegove podatke ubacili u "cart"

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id, //kao product uzimamo _id od producta
      name: data.name, // .. things for Cart component
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty, //u parametru funkcije doneseno iz componente
    },
  })
  //nakon dispatch-a sačuvamo ga u localstorage(kao cartItems) tako što pomoću getState iz store-state-a uzimamo cartItems[] i ubacujemo u localStorage
  // kao JSON zato što samo tako može ići u localstorage
  // i onda u store.js povlačimo ga iz localStorege i u bacujemo u initilState
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  //ne šaljemo ga u DB već u localStorage
  //u localStorage-u ostaju za stalno dok se ne uklone programski
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM, //za frontend
    payload: id,
  })
  //ponovo re-setujemo localStorage jer je jedan item izbačen a to je baza za "cart" a ne DB
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
