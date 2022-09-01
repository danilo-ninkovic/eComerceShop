import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' //svaki put ako nam treba redux globalni state
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message' //alert
import { addToCart, removeFromCart } from '../actions/cartActions' //funkcije za cart

//inbuilt functions JS match, location, history
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id //ako postoji id u URL-u bit će productId
  //location.search je  "?qty=1" u URL-u i ako postoji onda će to qty=1,  pomoću split('=') qty=1 pretvoriti u [qty,1] i uzeti [1] to jest broj komada
  //a ako ne postoji qty će biti 1
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch() //da pozovemo funkciju addToCart iz cartActions.js
  const { cartItems } = useSelector((state) => state.cart) //uzimamo cartItems[] iz state-a (store.js)

  useEffect(() => {
    if (productId) {
      //ako postoji productId
      dispatch(addToCart(productId, qty)) //pokreće addToCart funkciju sa id-om i qty (broj kom) - pozvana iz ProductScreen.js
      //u productScreen.js je odmah i history.push u /cart/${match.params.id}?qty=${qty} ali se renderuje ova  CartScreen i zato imamo taj URL
    }
  }, [dispatch, productId, qty]) //ono što se mijenja

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id)) //poziva funkciju iz cartActions i postavlja id od product-a u nju
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {/*ako nema čekiranih u cartItems[] */}
        {cartItems.length === 0 ? (
          <Message>
            Niste odabrali ni jedan proizvod .... <Link to='/'> Nazad</Link>
          </Message>
        ) : (
          /*a ako ima */
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              /* za svaki proizvod poseban LostGroup.Item, prikazivat će se jedan ispod drugog , podatke kupi iz payload-a u cartActions.js*/
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={
                        (e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        /*ovde se ubacila čeking-lista isto kao u ProductScrenu s tim da se ponovo može pozvati in addToCart(id,qey) preko dispatch-a */
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={
                        () => removeFromCartHandler(item.product) /*id */
                      }
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                {/** ukupan zbir komada selektovanih cartItems - pomoću reduce() funkcije*/}
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ${' '}
              {/** ukupan zbir cijene selektovanih cartItems - pomoću reduce() funkcije. sa dvije decimale*/}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
