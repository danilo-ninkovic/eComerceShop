import { BrowserRouter as Router, Route } from 'react-router-dom' //za prebacivanje routa (url-a)
import { Container } from 'react-bootstrap'
//Container će sve staviti otprilike na sredinu kao class 'container
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from '../src/screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

//u App.js su header,footer i scrinovi

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/*py-3 pravi paading na top i bootom */}
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          {/*linkuje se  se iz ProductScreen.js na submit*/}
          {/* ? - znači id je optional */}
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
