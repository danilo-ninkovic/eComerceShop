import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constans/userConstans'

//funkcija za logovanje iz LoginScreen.js
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST, //za Loader
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    //autentifikacija usera u backendu da se dobiju njegovi podaci - authUser funkcija --router.post('/login', authUser)
    //data su podaci vraćeni iz backend API-a (routha i controllers-a)
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    //nakon dobijenih podataka
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data, // userInfo -  iz API-a authUser funkcija u backend-u(controllers(userController.js))
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    //userInfo se setuje u localStorage jer će iz njega kroz req.headers ići u backend i u store za initialState
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// logout iz Header.js
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

// register pozvan iz Header.js pa iz RegisterScreen.js
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST, //za Loader
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    //nakon dobijenih podataka
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data, // user -  iz API-a registerUser funkcija u backend-u(controllers(userController.js))
    })
    //dispatchuje odmah i login succes, pošto ćemo usera odmah i logovati kad se registruje
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data, //u oba slučaja šalje isti data iz API-a
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    //userInfo se setuje u localStorage jer će iz njega kroz req.headers ići u backend i u store za initialState
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//get user details za update user-a
export const getUserDetails = (id) => async (dispatch, getState) => {
  //But what we'll do is if we want to get the profile, we'll just pass in profile as the I.D. So then
  //down here, when we make the request, it'll be a profile or it'll be the user ID.
  //So I'm going to say get state here, because remember, we can get our user info from get state, which has the token in it.

  try {
    dispatch({
      type: USER_DETAILS_REQUEST, //za  initialState i Loader
    })

    const {
      userLogin: { userInfo },
    } = getState() //iz userLogina uzimamo userInfo jer to je logovani user

    // u config ubacujemo token od logovanog Usera u Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // i onda GET request u API
    const { data } = await axios.get(
      `/api/users/${id}`, //id je u stvari ono profile u /api/user/profile u userRoutes.js
      //ako pozivamo iz ProfileScreen bit će "profile" umjesto "id"
      config
    )
    //nakon dobijenih podataka
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data, // user -  iz API-a registerUser funkcija u backend-u(controllers(userController.js))
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//update  user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST, //za  initialState i Loader
    })

    const {
      userLogin: { userInfo },
    } = getState() //iz userLogina uzimamo userInfo jer to je logovani user

    // u config ubacujemo token od logovanog Usera u Authorization
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // i onda put request u API
    const { data } = await axios.put('/api/users/profile', user, config)
    //nakon dobijenih podataka
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data, // user -
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
