import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constans/cartConstans'

//cartItems-a može biti više čekiranih produkata odjednom zato je cartItems:[] -array
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    //moramo vidjeti da li je već dodan produkt koji se dodaje u "cart"
    case CART_ADD_ITEM:
      const item = action.payload // produkt koji se dodaje
      //uza"produkt"će se uzeti _id od produkta koji se čekira u cart
      //ako se pretragom pokaže da u cartItems[] postoji produkt čiji je id(produkt) isti kao u item-a onda je to "existItem"
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        //ako već postoji takav item (existItem) onda će
        return {
          ...state, //vratiti ostatak state-a i
          // u cartItems [] - ako je product(id) isti kao od "existItem-a" vratit će item iz payloada jer smo možda odabrali više ili manje komada nego prethodno
          // i u suprotnom x tj. drugi koji nije isti kao item iz payloada
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      }
      //ako existItem ne postoji onda se const "item" dodaje u cartItems[]
      else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        //vratiti će samo one čiji id nije isti kao payload(id od removed )
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    default:
      return state
  }
}
