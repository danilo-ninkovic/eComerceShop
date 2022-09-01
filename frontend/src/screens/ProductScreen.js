import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' //hooks za dispatch finkcije i dohvatanje state-a
import { listProductDetails } from '../actions/productActions' //funkcija za pojedinačni produkt preko id-a iz productActions.js
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
  //history i match su "default" props
  const [qty, setQty] = useState(1) //za odabir broja produkata na select-listi

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails) //iz store.js
  const { loading, error, product } = productDetails
  useEffect(() => {
    //pri loudovanju
    //dispatch poziva funkciju "listProductDetails(match.params.id)"
    //iz producztActions.js koja preko IPA dobiva pojedinačni "product"
    //koji se preko productDetailsReducer-a šalje u "state" i poziva u komponentu
    //pomoću useSelector-a kao "productDetails"(tu je u stvari product is backend-a)
    dispatch(listProductDetails(match.params.id)) //product ID u URL-u
  }, [match, dispatch])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`) //product ID i qty(broj kom)-opciono zbog ?
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
            {/*fluid da ostane u svom containeru */}
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name} </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong> {product.price} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/*ako je broj produkata na lageru veći od 0 prikazat će novi ListGroup.Item*/}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as='select'
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value)
                          }}
                        >
                          {/*ako je countInStock npr 10 napravit će array [1,2,..10] i za svaki broj <option></option> */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
